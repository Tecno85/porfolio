// ===== ANIMACIONES AL HACER SCROLL =====

document.documentElement.classList.add('js');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

// Observar elementos que queremos animar
document.addEventListener('DOMContentLoaded', () => {
  const elementsToAnimate = document.querySelectorAll(
    '.project-card, .herramientas, .sobre-mi'
  );

  if (!('IntersectionObserver' in window)) {
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
  const titleElement = document.querySelector('.nombre h1');
  if (titleElement) {
    const originalText = titleElement.textContent;
    typeWriter(titleElement, originalText, 80);
  }
});

// ===== EFECTO PARALLAX SUTIL EN HEADER =====

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const header = document.querySelector('header');

  if (header) {
    const offset = Math.min(scrolled * 0.12, 45);
    const opacity = Math.max(1 - scrolled * 0.0015, 0.75);

    header.style.transform = `translateY(${offset}px)`;
    header.style.opacity = opacity;
  }
});

// ===== SMOOTH SCROLL PARA NAVEGACIÓN =====

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});
