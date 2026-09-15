// ===== WHATSAPP LINK — actualizar cuando exista el grupo =====
const WHATSAPP_LINK = 'https://chat.whatsapp.com/E4Vi3AJDJFbFQWJ1yOtyE0';
document.querySelectorAll('#whatsappCta, .btn-nav, .sticky-cta').forEach(el => {
  if (el.tagName === 'A') el.href = WHATSAPP_LINK;
});

// ===== NAV SCROLLED STATE =====
const nav = document.getElementById('nav');
const onScrollNav = () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', onScrollNav, { passive: true });
onScrollNav();

// ===== MOBILE MENU =====
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('active');
});
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  io.observe(el);
});

// ===== CARD TILT ON HOVER =====
document.querySelectorAll('.card-frame, .step-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== COUNTDOWN =====
const TARGET_DATE = new Date('2026-10-28T19:00:00+02:00').getTime();
const cdDays = document.getElementById('cdDays');
const cdHours = document.getElementById('cdHours');
const cdMins = document.getElementById('cdMins');
const cdSecs = document.getElementById('cdSecs');

function pad(n) { return String(n).padStart(2, '0'); }

function tickCountdown() {
  const now = Date.now();
  const diff = TARGET_DATE - now;
  if (diff <= 0) {
    [cdDays, cdHours, cdMins, cdSecs].forEach(el => el && (el.textContent = '00'));
    return;
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  if (cdDays) cdDays.textContent = pad(days);
  if (cdHours) cdHours.textContent = pad(hours);
  if (cdMins) cdMins.textContent = pad(mins);
  if (cdSecs) cdSecs.textContent = pad(secs);
}
tickCountdown();
setInterval(tickCountdown, 1000);

// ===== FOTO FALLBACK (mientras no se suban las imagenes reales) =====
document.querySelectorAll('.photo-frame img').forEach(img => {
  img.addEventListener('error', () => { img.style.display = 'none'; }, { once: true });
});

// ===== STICKY MOBILE CTA =====
const stickyCta = document.getElementById('stickyCta');
const hero = document.getElementById('top');
const stickyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    stickyCta?.classList.toggle('visible', !entry.isIntersecting);
  });
}, { threshold: 0 });
if (hero) stickyObserver.observe(hero);

// ===== VOLVER ARRIBA =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('visible', window.scrollY > window.innerHeight);
}, { passive: true });
