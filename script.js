const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    faqItems.forEach(i => { if (i !== item) i.classList.remove('open'); });
    item.classList.toggle('open');
  });
});

const ctaButtons = document.querySelectorAll('.cta, .cta-footer, .nav-btn');
const downloadMenu = document.getElementById('download-menu');
function toggleDownloadMenu(btn) {
  const rect = btn.getBoundingClientRect();
  const scrollTop = window.scrollY || window.pageYOffset;
  const scrollLeft = window.scrollX || window.pageXOffset;
  const buttonMiddle = rect.left + scrollLeft + rect.width/2;
  const menuWidth = downloadMenu.offsetWidth;
  const menuLeft = buttonMiddle - menuWidth/2;
  let menuTop = rect.bottom + scrollTop + (btn.classList.contains('nav-btn') ? 30 : 8);
  downloadMenu.style.top = menuTop+'px';
  downloadMenu.style.left = menuLeft+'px';
  downloadMenu.classList.add('show');
}
ctaButtons.forEach(btn => {
  btn.addEventListener('click', e => { e.stopPropagation(); toggleDownloadMenu(btn); });
});
document.addEventListener('click', ()=>{ downloadMenu.classList.remove('show'); });
window.addEventListener('scroll', ()=>{ downloadMenu.classList.remove('show'); });
window.addEventListener('keydown', e=>{ if(e.key==="Escape") downloadMenu.classList.remove('show'); });

const scrollElements = document.querySelectorAll('.science, .science-card, .reviews-main, .review-item, .team-header, .team-member, .faq-header, .faq-item, .cta-section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

scrollElements.forEach(el => el.classList.add('scroll-reveal'));
scrollElements.forEach(el => observer.observe(el));
