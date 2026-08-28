document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const topbar = document.querySelector('.topbar');
  const updateBar = () => {
    topbar.style.boxShadow = window.scrollY > 12 ? '0 8px 30px rgba(23,59,43,.06)' : 'none';
  };
  updateBar();
  window.addEventListener('scroll', updateBar, { passive: true });
});