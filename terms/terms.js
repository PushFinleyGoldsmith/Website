/* ================= DOWNLOAD MENU ================= */

const ctaButtons = document.querySelectorAll('.nav-btn');
const downloadMenu = document.getElementById('download-menu');

function toggleDownloadMenu(btn) {
  const rect = btn.getBoundingClientRect();
  const scrollTop = window.scrollY || window.pageYOffset;
  const scrollLeft = window.scrollX || window.pageXOffset;

  const buttonMiddle = rect.left + scrollLeft + rect.width / 2;
  const menuWidth = downloadMenu.offsetWidth;

  downloadMenu.style.top = rect.bottom + scrollTop + 30 + 'px';
  downloadMenu.style.left = buttonMiddle - menuWidth / 2 + 'px';

  downloadMenu.classList.add('show');
}

ctaButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    toggleDownloadMenu(btn);
  });
});

document.addEventListener('click', () => {
  downloadMenu.classList.remove('show');
});

window.addEventListener('scroll', () => {
  downloadMenu.classList.remove('show');
});

window.addEventListener('keydown', e => {
  if (e.key === "Escape") downloadMenu.classList.remove('show');
});

/* ================= SCROLL REVEAL ================= */

const scrollElements = document.querySelectorAll('.scroll-reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

scrollElements.forEach(el => observer.observe(el));
