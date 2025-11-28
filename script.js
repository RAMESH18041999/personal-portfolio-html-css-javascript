// Smooth scroll + typing headline + reveal on scroll + active link + demo form guard
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll
  const navLinks = document.querySelectorAll("nav ul li a[href^='#']");
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Typing headline
  const roles = ['B.Sc Graduate', 'Software Developer', 'Problem Solver', 'Tech Enthusiast'];
  let roleIndex = 0, charIndex = 0;
  const h2 = document.querySelector('header h2');
  function typeRole() {
    if (!h2) return;
    if (charIndex < roles[roleIndex].length) {
      h2.textContent = roles[roleIndex].substring(0, charIndex + 1);
      charIndex++;
      setTimeout(typeRole, 120);
    } else {
      setTimeout(eraseRole, 1400);
    }
  }
  function eraseRole() {
    if (!h2) return;
    if (charIndex > 0) {
      h2.textContent = roles[roleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(eraseRole, 90);
    } else {
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 400);
    }
  }
  typeRole();

  // Reveal on scroll
  const sections = document.querySelectorAll('section, header#home');
  function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top < triggerBottom) sec.classList.add('visible');
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // Active link highlight
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        if (entry.isIntersecting && id) {
          document.querySelectorAll('nav a').forEach((a) => {
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
  );
  sections.forEach((s) => observer.observe(s));

  // Prevent demo form submit
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thanks! Your message has been captured for demo purposes.');
    });
  }
});

// IMPORTANT: Developer test panel REMOVED completely.
