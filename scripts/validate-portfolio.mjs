import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(scriptDirectory, '..');
const htmlPath = path.join(rootDirectory, 'index.html');
const maximumFileSize = 500 * 1024;
const excludedDirectories = new Set(['.git', 'node_modules']);

function collectMatches(content, pattern) {
  return Array.from(content.matchAll(pattern), (match) => match[1]);
}

function isExternalReference(reference) {
  return /^https?:\/\//i.test(reference);
}

function isIgnoredReference(reference) {
  return /^(?:#|mailto:|tel:|data:|javascript:)/i.test(reference);
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) {
      continue;
    }

    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFiles(entryPath)));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

async function validateLocalPortfolio(html) {
  const errors = [];
  const references = collectMatches(html, /\b(?:href|src)="([^"]+)"/g);
  const localReferences = new Set(
    references.filter(
      (reference) =>
        !isExternalReference(reference) && !isIgnoredReference(reference)
    )
  );

  for (const reference of localReferences) {
    const cleanReference = reference.split(/[?#]/, 1)[0];
    const targetPath = path.resolve(rootDirectory, cleanReference);
    const isInsideRepository =
      targetPath === rootDirectory ||
      targetPath.startsWith(`${rootDirectory}${path.sep}`);

    if (!isInsideRepository) {
      errors.push(`La ruta sale del repositorio: ${reference}`);
      continue;
    }

    try {
      await stat(targetPath);
    } catch {
      errors.push(`No existe el recurso local: ${reference}`);
    }
  }

  const headingCount = (html.match(/<h1\b/g) || []).length;
  if (headingCount !== 1) {
    errors.push(`Se esperaba un único h1 y se encontraron ${headingCount}.`);
  }

  const ids = collectMatches(html, /\bid="([^"]+)"/g);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  for (const id of duplicateIds) {
    errors.push(`El id está duplicado: ${id}`);
  }

  const externalLinks = html.match(/<a\b[^>]*target="_blank"[^>]*>/g) || [];
  for (const link of externalLinks) {
    const rel = link.match(/\brel="([^"]+)"/)?.[1] || '';
    if (!rel.includes('noopener') || !rel.includes('noreferrer')) {
      errors.push(`Enlace externo sin protección completa: ${link}`);
    }
  }

  const structuredDataBlocks = collectMatches(
    html,
    /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
  );
  for (const block of structuredDataBlocks) {
    try {
      JSON.parse(block);
    } catch (error) {
      errors.push(`JSON-LD inválido: ${error.message}`);
    }
  }

  const files = await listFiles(rootDirectory);
  for (const file of files) {
    const fileStats = await stat(file);
    if (fileStats.size > maximumFileSize) {
      const relativePath = path.relative(rootDirectory, file);
      errors.push(
        `${relativePath} supera 500 KiB (${Math.ceil(fileStats.size / 1024)} KiB).`
      );
    }
  }

  if (errors.length > 0) {
    for (const error of errors) {
      console.error(`ERROR: ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    `Validación local correcta: ${localReferences.size} rutas, ${ids.length} ids y ${files.length} archivos.`
  );
}

async function checkExternalLinks(html) {
  const links = new Set(
    collectMatches(html, /<a\b[^>]*\bhref="(https?:\/\/[^"]+)"[^>]*>/g)
      .map((link) => link.replaceAll('&amp;', '&'))
      .filter((link) => !link.includes('linkedin.com'))
  );

  let warningCount = 0;

  await Promise.all(
    [...links].map(async (link) => {
      try {
        const response = await fetch(link, {
          method: 'HEAD',
          redirect: 'follow',
          signal: AbortSignal.timeout(10_000),
        });

        if (response.ok) {
          return;
        }

        warningCount++;
        console.log(
          `::warning file=index.html::El enlace externo respondió ${response.status}: ${link}`
        );
      } catch (error) {
        warningCount++;
        console.log(
          `::warning file=index.html::No se pudo comprobar ${link}: ${error.message}`
        );
      }
    })
  );

  console.log(
    `Revisión externa completada: ${links.size} enlaces, ${warningCount} advertencias.`
  );
}

async function main() {
  const html = await readFile(htmlPath, 'utf8');

  if (process.argv.includes('--external')) {
    await checkExternalLinks(html);
    return;
  }

  await validateLocalPortfolio(html);
}

await main();
