// ===========================
// SANJAY DHAMELIYA - PORTFOLIO
// ===========================

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Theme Toggle ----
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const themeIconMobile = document.getElementById('themeIconMobile');

const moonSVG = `<path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>`;
const sunSVG = `<path d="M12 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1zm0 15a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm9-9a1 1 0 110 2h-1a1 1 0 110-2h1zM4 12a1 1 0 110 2H3a1 1 0 110-2h1zm14.243-5.757a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM7.879 17.536a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zm9.9 1.414a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM6.464 6.464a1 1 0 01-1.414 0l-.707-.707A1 1 0 015.757 4.343l.707.707a1 1 0 010 1.414zM12 7a5 5 0 110 10A5 5 0 0112 7z"/>`;

function applyTheme(isLight) {
  if (isLight) {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }
  if (themeIcon) themeIcon.innerHTML = isLight ? moonSVG : sunSVG;
  if (themeIconMobile) themeIconMobile.innerHTML = isLight ? moonSVG : sunSVG;
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    applyTheme(isLight);
  });
}
if (themeToggleMobile) {
  themeToggleMobile.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    applyTheme(isLight);
  });
}







// ---- Mobile hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ---- Typed text effect ----
const roles = [
  'Senior Laravel Developer',
  'Full Stack PHP Developer',
  'SaaS Platform Builder',
  'REST API Specialist',
  'Scalable Web App Developer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length + 1) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 300;
  }

  setTimeout(type, delay);
}

type();

// ---- Reveal on scroll animation ----
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay based on sibling index
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((el, index) => {
        if (el === entry.target) delay = index * 80;
      });
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => observer.observe(el));

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = '#6c63ff';
    }
  });
});

// ---- Contact form ----
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const name = document.getElementById('name').value;

  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = `✅ Sent! Thanks ${name}`;
    btn.style.background = '#34d399';
    document.getElementById('contactForm').reset();

    setTimeout(() => {
      btn.textContent = 'Send Message 🚀';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1500);
}

// ---- Smooth hero stats counter ----
function animateCounter(el, target) {
  let count = 0;
  const step = target / 60;
  const interval = setInterval(() => {
    count += step;
    if (count >= target) {
      el.textContent = target + '+';
      clearInterval(interval);
    } else {
      el.textContent = Math.floor(count) + '+';
    }
  }, 20);
}

// Trigger counters when hero is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        const val = parseInt(el.textContent);
        if (!isNaN(val)) animateCounter(el, val);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

console.log('🚀 Portfolio of Sanjay Dhameliya Loaded!');
