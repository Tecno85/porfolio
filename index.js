// ===== ANIMACIONES AL HACER SCROLL =====

document.documentElement.classList.add('js');

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

// Observar elementos que queremos animar
document.addEventListener('DOMContentLoaded', () => {
  const elementsToAnimate = document.querySelectorAll(
    '.project-card, .herramientas, .service-card, .sobre-mi'
  );

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    elementsToAnimate.forEach((el) => {
      el.classList.add('animate-in');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });
});

// ===== EFECTO DE ESCRITURA EN EL TÍTULO =====

function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

window.addEventListener('load', () => {
  if (prefersReducedMotion) {
    return;
  }

  const titleElement = document.querySelector('.nombre h1');
  if (titleElement) {
    const originalText = titleElement.textContent;
    titleElement.setAttribute('aria-label', originalText);
    typeWriter(titleElement, originalText, 80);
  }
});
