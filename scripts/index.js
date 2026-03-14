// ===== 背景特效 =====
function initGeometricElements() {
  const container = document.getElementById('geometricBackground');
  if (!container) return;
  container.innerHTML = '';
  const isMobile = window.innerWidth < 768;
  const elementCount = isMobile ? 8 : 15;
  
  for (let i = 0; i < elementCount; i++) {
    const element = document.createElement('div');
    element.className = 'geometric-element';
    const types = ['circle', 'square', 'triangle'];
    const type = types[Math.floor(Math.random() * types.length)];
    if (type === 'triangle') { element.classList.add('triangle'); } 
    else if (type === 'square') { element.classList.add('square'); }
    const size = isMobile ? (Math.random() * 80 + 30) : (Math.random() * 150 + 50);
    if (type !== 'triangle') {
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
    } else {
      element.style.borderWidth = `0 ${size/2}px ${size*0.866}px ${size/2}px`;
    }
    element.style.left = `${Math.random() * 100}%`;
    element.style.top = `${Math.random() * 100}%`;
    const duration = Math.random() * 30 + 20;
    element.style.animationDuration = `${duration}s`;
    element.style.animationDelay = `${Math.random() * -30}s`;
    container.appendChild(element);
  }
}

function createStars() {
  const starsContainer = document.querySelector('.particle-stars');
  if (!starsContainer) return;
  starsContainer.innerHTML = '';
  const isMobile = window.innerWidth < 768;
  const starCount = isMobile ? 40 : 80;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const sizes = ['small', 'medium', 'large'];
    star.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 6}s`;
    star.style.animationDuration = `${Math.random() * 4 + 2}s`;
    star.style.opacity = Math.random() * 0.7 + 0.3;
    starsContainer.appendChild(star);
  }
}

function createLightStreams() {
  const container = document.querySelector('.light-streams');
  if (!container) return;
  container.innerHTML = '';
  const streamCount = 3;
  for (let i = 0; i < streamCount; i++) {
    const stream = document.createElement('div');
    stream.className = 'light-stream';
    stream.style.top = `${(i + 1) * (80 / (streamCount + 1))}%`;
    stream.style.animationDelay = `${i * -4}s`;
    stream.style.animationDuration = `${12 + i * 3}s`;
    container.appendChild(stream);
  }
}

let backgroundInitialized = false;
function initBackgroundEffects() {
  if (backgroundInitialized) return;
  createStars();
  initGeometricElements();
  createLightStreams();
  backgroundInitialized = true;
}

// ===== 返回顶部 =====
function initBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  if (!backToTop) return;
  
  function updateBackToTop() {
    if (window.scrollY > 500) { backToTop.classList.add('visible'); } 
    else { backToTop.classList.remove('visible'); }
  }
  
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => { updateBackToTop(); ticking = false; });
      ticking = true;
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== 长文目录 =====
function initTOC() {
  const toc = document.getElementById('tocList');
  const root = document.getElementById('article');
  if (!toc || !root) return;
  const heads = root.querySelectorAll('h2, h3');
  heads.forEach((h, i) => {
    if (!h.id) h.id = 'sec-' + i;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent || ('Section ' + (i + 1));
    li.appendChild(a);
    toc.appendChild(li);
  });
}

// ===== 滚动显隐 =====
function initSectionReveal() {
  const nodes = document.querySelectorAll('.content section, .thumbs figure');
  if (!nodes.length) return;
  nodes.forEach(n => n.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  nodes.forEach(n => io.observe(n));
}

// ===== 图片查看器 =====
function initGallery() {
  const grid = document.getElementById('galleryGrid');
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lbImage');
  const cap = document.getElementById('lbCaption');
  if (!grid || !lb || !img) return;
  const btnClose = lb.querySelector('.lb-close');
  const btnNext = lb.querySelector('.lb-next');
  const btnPrev = lb.querySelector('.lb-prev');
  let items = Array.from(grid.querySelectorAll('figure'));
  if (!items.length) return;
  let index = 0;
  
  function open(i) {
    index = i;
    const fig = items[index];
    const el = fig.querySelector('img');
    img.src = el?.dataset.full || el?.src || '';
    img.alt = el?.alt || '';
    if (cap) cap.textContent = fig.querySelector('figcaption')?.textContent || '';
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
  }
  
  function close() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    img.src = '';
  }
  
  function next() { open((index + 1) % items.length); }
  function prev() { open((index - 1 + items.length) % items.length); }
  
  grid.addEventListener('click', (e) => {
    const fig = e.target.closest('figure');
    if (!fig) return;
    const i = items.indexOf(fig);
    if (i >= 0) open(i);
  });
  
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  btnClose && btnClose.addEventListener('click', close);
  btnNext && btnNext.addEventListener('click', next);
  btnPrev && btnPrev.addEventListener('click', prev);
  
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
}

// ===== Feature Cards 动画 =====
function initFeatureCards() {
  const cards = document.querySelectorAll('.feature-card');
  cards.forEach(card => {
    const delay = card.getAttribute('data-delay') || '0';
    card.style.animationDelay = delay + 's';
    card.classList.add('fade-in');
  });
}

// ===== 主初始化 =====
document.addEventListener('DOMContentLoaded', function() {
  initBackgroundEffects();
  initBackToTop();
  initTOC();
  initSectionReveal();
  initGallery();
  initFeatureCards();
  
  // Nav active state
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // Smooth scroll with offset for fixed header
  const headerOffset = 80;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Scroll down arrow function
  window.scrollToFeatures = function() {
    const target = document.getElementById('features');
    if (target) {
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  // Resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      backgroundInitialized = false;
      initBackgroundEffects();
    }, 300);
  });
});
