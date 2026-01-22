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

const scrollElements = document.querySelectorAll(
  '.science, .science-card, .reviews, .reviews-inner, .reviews-main, .review-item, .team-header, .team-member, .faq-header, .faq-item, .cta-section'
);

// Add scroll-reveal class to each element
scrollElements.forEach(el => el.classList.add('scroll-reveal'));

// Intersection Observer to add .active on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

// Observe all elements
scrollElements.forEach(el => observer.observe(el));


const ctx = document.getElementById('muscleRadar').getContext('2d');

new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['', '', '', '', '', ''],
        datasets: [{
            label: 'Program Intensity',
            data: [80, 70, 60, 50, 90, 65],
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderColor: '#fff',
            borderWidth: 2,
            pointBackgroundColor: '#fff',
            pointRadius: 4,
            pointHoverRadius: 6
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: { color: 'rgba(255,255,255,0.2)' },
                grid: { color: 'rgba(255,255,255,0.1)' },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    display: false
                },
                pointLabels: {
                    color: '#aaa',
                    font: {
                        size: 12
                    }
                }
            }
        },
        plugins: {
            legend: { display: false }
        }
    }
});
