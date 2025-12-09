const header = document.querySelector('.site-header');
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const revealEls = document.querySelectorAll('.reveal');
const yearEl = document.getElementById('year');
const contactForm = document.getElementById('contactForm');

const closeNav = () => nav.classList.remove('open');

const handleScroll = () => {
  if (window.scrollY > 12) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
};

const smoothScroll = e => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const targetId = link.getAttribute('href').slice(1);
  const target = document.getElementById(targetId);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    closeNav();
  }
};

navToggle?.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.addEventListener('click', e => {
  if (nav.classList.contains('open') && !nav.contains(e.target) && !navToggle.contains(e.target)) {
    closeNav();
  }
});

document.addEventListener('scroll', handleScroll, { passive: true });
document.addEventListener('DOMContentLoaded', handleScroll);

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', smoothScroll);
});

yearEl.textContent = new Date().getFullYear();

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    const company = contactForm.company.value.trim();
    const companyType = contactForm.companyType.value.trim();
    const subject = encodeURIComponent('Inquiry from RKM Enterprises website');
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nCompany Type: ${companyType}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:rkmenterprises09@outlook.com?subject=${subject}&body=${body}`;
  });
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    closeNav();
  }
});

