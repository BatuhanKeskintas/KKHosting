/* ============================================
   KK Hosting — Scroll Animations
   ============================================ */

function initAnimations() {
  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  
  if (reveals.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// Counter animation for stats
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-count'));
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  const isDecimal = target % 1 !== 0;
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    const display = isDecimal ? current.toFixed(1) : Math.floor(current);
    el.textContent = prefix + display + suffix;
  }, duration / steps);
}

// Image gallery with lightbox-like navigation for listing cards
function initGalleries() {
  document.querySelectorAll('.property-card__image').forEach(card => {
    const images = card.querySelectorAll('img');
    if (images.length <= 1) return;
    
    let currentIndex = 0;
    images.forEach((img, i) => {
      if (i > 0) img.style.display = 'none';
    });

    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn')) return;
      currentIndex = (currentIndex + 1) % images.length;
      images.forEach((img, i) => {
        img.style.display = i === currentIndex ? 'block' : 'none';
      });
    });
  });
}

// Smooth parallax for hero images
function initParallax() {
  const heroImg = document.querySelector('.hero__bg img');
  if (!heroImg) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroImg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
  });
}

// Initialize all
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initCounters();
  initGalleries();
  initParallax();
});
