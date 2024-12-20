// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  if (navbar) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
      }

      if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
      } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
      }

      lastScroll = currentScroll;
    });
  }

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50
    });
  }

  // Counter animation
  function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  }

  // Start counter animations when they come into view
  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.counter');
          counters.forEach(counter => animateCounter(counter));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  }
});