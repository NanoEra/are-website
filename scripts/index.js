// 初始化几何动态图形
function initGeometricElements() {
    const container = document.getElementById('geometricBackground');
    if (!container) return;
    
    // 清空现有元素
    container.innerHTML = '';
    
    // 根据屏幕大小决定元素数量
    const isMobile = window.innerWidth < 768;
    const elementCount = isMobile ? 8 : 15; // 增加元素数量
    
    for (let i = 0; i < elementCount; i++) {
        const element = document.createElement('div');
        element.className = 'geometric-element';
        
        // 随机形状
        const types = ['circle', 'square', 'triangle'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        if (type === 'triangle') {
            element.classList.add('triangle');
        } else if (type === 'square') {
            element.classList.add('square');
        }
        
        // 随机尺寸
        const size = isMobile ? (Math.random() * 80 + 30) : (Math.random() * 150 + 50);
        
        if (type !== 'triangle') {
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
        } else {
            element.style.borderWidth = `0 ${size/2}px ${size*0.866}px ${size/2}px`;
        }
        
        // 随机位置
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        
        // 随机动画
        const duration = Math.random() * 30 + 20;
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${Math.random() * -30}s`;
        
        // 随机颜色和透明度 - 增强光晕
        const alpha = Math.random() * 0.25 + 0.1;
        const hue = 240 + Math.random() * 30; // 蓝紫色系
        const saturation = 70 + Math.random() * 30;
        
        if (type !== 'triangle') {
            element.style.borderColor = `hsla(${hue}, ${saturation}%, 65%, ${alpha})`;
            element.style.background = `radial-gradient(circle at center, hsla(${hue}, ${saturation}%, 70%, ${alpha*0.7}) 0%, transparent 70%)`;
            element.style.boxShadow = `0 0 40px hsla(${hue}, ${saturation}%, 65%, ${alpha*0.5})`;
        } else {
            element.style.borderBottomColor = `hsla(${hue}, ${saturation}%, 65%, ${alpha})`;
        }
        
        container.appendChild(element);
    }
}

// 生成星空粒子
function createStars() {
    const starsContainer = document.querySelector('.particle-stars');
    if (!starsContainer) return;
    
    // 清空现有星星
    starsContainer.innerHTML = '';
    
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 40 : 120; // 增加星星数量
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // 随机大小
        const sizes = ['small', 'medium', 'large'];
        const sizeClass = sizes[Math.floor(Math.random() * sizes.length)];
        star.classList.add(sizeClass);
        
        // 随机位置
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // 随机动画延迟和持续时间
        star.style.animationDelay = `${Math.random() * 6}s`;
        star.style.animationDuration = `${Math.random() * 4 + 2}s`;
        
        // 随机透明度
        star.style.opacity = Math.random() * 0.7 + 0.3;
        
        // 随机颜色（主要是蓝紫色系）
        const hue = 240 + Math.random() * 40;
        star.style.backgroundColor = `hsla(${hue}, 80%, 90%, ${star.style.opacity})`;
        star.style.boxShadow = `0 0 8px hsla(${hue}, 100%, 70%, 0.8)`;
        
        starsContainer.appendChild(star);
    }
}

// 创建流光线
function createLightStreams() {
    const container = document.querySelector('.light-streams');
    if (!container) return;
    
    // 清空现有流光线
    container.innerHTML = '';
    
    const streamCount = 4; // 增加流光线数量
    
    for (let i = 0; i < streamCount; i++) {
        const stream = document.createElement('div');
        stream.className = 'light-stream';
        const topPosition = (i + 1) * (80 / (streamCount + 1));
        stream.style.top = `${topPosition}%`;
        stream.style.animationDelay = `${i * -4}s`;
        stream.style.animationDuration = `${12 + i * 3}s`;
        
        // 不同的颜色渐变
        const hue = 240 + Math.random() * 40;
        stream.style.background = `linear-gradient(
            90deg, 
            transparent, 
            hsla(${hue}, 80%, 70%, 0.6), 
            hsla(${hue + 20}, 90%, 75%, 0.9), 
            hsla(${hue}, 80%, 70%, 0.6), 
            transparent
        )`;
        
        container.appendChild(stream);
    }
}

// 初始化背景效果 - 只调用一次
let backgroundInitialized = false;
function initBackgroundEffects() {
    if (backgroundInitialized) return;
    
    createStars();
    initGeometricElements();
    createLightStreams();
    
    backgroundInitialized = true;
}

// 卡片滚动动画
function initScrollAnimations() {
    const cards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const delay = card.getAttribute('data-delay') || '0';
                
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, parseFloat(delay) * 1000);
                
                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// 返回顶部功能
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) return;
    
    function updateBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    // 使用节流函数优化滚动性能
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateBackToTop();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 鼠标悬停效果 - 使用事件委托优化性能
function initHoverEffects() {
    document.addEventListener('mouseover', function(e) {
        const card = e.target.closest('.feature-card, .hero, .footer-links');
        if (card) {
            card.style.transform = 'translateY(-5px)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        const card = e.target.closest('.feature-card, .hero, .footer-links');
        if (card && card.classList.contains('animate-in')) {
            card.style.transform = 'translateY(0)';
        }
    });
}

// 窗口大小变化时重新生成背景元素
let resizeTimeout;
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // 重置初始化标志，允许重新生成
        backgroundInitialized = false;
        initBackgroundEffects();
    }, 300);
}

// 优化的性能检测 - 避免频繁检测导致重载
function initPerformanceDetection() {
    // 只在非移动设备上检测性能
    if (window.innerWidth < 768) {
        enableLowPerformanceMode();
        return;
    }
    
    const cores = navigator.hardwareConcurrency || 1;
    const memory = navigator.deviceMemory || 0;
    
    // 根据设备性能决定是否启用低性能模式
    if (cores <= 2 || memory <= 2) {
        enableLowPerformanceMode();
        return;
    }
    
    // 简化性能检测，减少频率
    let lastCheck = performance.now();
    const checkInterval = 5000; // 每5秒检测一次
    
    function checkPerformance() {
        const now = performance.now();
        
        if (now - lastCheck >= checkInterval) {
            // 简单的性能检测：测量一帧的时间
            requestAnimationFrame(() => {
                const start = performance.now();
                requestAnimationFrame(() => {
                    const frameTime = performance.now() - start;
                    
                    if (frameTime > 50) { // 如果一帧超过50ms，认为是低性能
                        enableLowPerformanceMode();
                    }
                });
            });
            
            lastCheck = now;
        }
        
        // 每30秒检测一次
        setTimeout(checkPerformance, 30000);
    }
    
    checkPerformance();
}

function enableLowPerformanceMode() {
    if (document.getElementById('low-performance-mode')) return;
    
    const style = document.createElement('style');
    style.id = 'low-performance-mode';
    style.textContent = `
        .geometric-element, .star, .light-stream {
            animation: none !important;
            opacity: 0.3 !important;
        }
        .feature-card, .hero, .footer-links {
            transition: transform 0.2s ease !important;
        }
        .glass-glow-background {
            backdrop-filter: blur(8px) saturate(140%) !important;
            animation: none !important;
        }
        .data-grid-background {
            animation: none !important;
        }
    `;
    document.head.appendChild(style);
}

// 添加鼠标跟随光效
function initMouseFollowEffect() {
    document.addEventListener('mousemove', function(e) {
        const cards = document.querySelectorAll('.feature-card, .hero, .footer-links');
        cards.forEach(card => {
            if (card.matches(':hover')) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            }
        });
    });
    
    // 添加动态光泽效果的CSS
    const style = document.createElement('style');
    style.textContent = `
        .feature-card::after,
        .hero::after,
        .footer-links::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(
                800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
                rgba(255, 255, 255, 0.15),
                transparent 50%
            );
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: 1;
            border-radius: inherit;
        }
        
        .feature-card:hover::after,
        .hero:hover::after,
        .footer-links:hover::after {
            opacity: 0.6;
        }
    `;
    document.head.appendChild(style);
}

// 移动设备下拉菜单交互
function initMobileDropdown() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth < 768) {
                e.preventDefault();
                e.stopPropagation();
                
                // 关闭其他打开的下拉菜单
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // 切换当前下拉菜单
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // 点击页面其他区域关闭下拉菜单
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 768) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
    
    // 窗口大小变化时重置下拉菜单状态
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// 主初始化函数
document.addEventListener('DOMContentLoaded', function() {
    // 初始化背景特效（只一次）
    initBackgroundEffects();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化返回顶部按钮
    initBackToTop();
    
    // 初始化悬停效果
    initHoverEffects();
    
    // 初始化鼠标跟随效果
    initMouseFollowEffect();
    
    // 初始化性能检测
    initPerformanceDetection();
    
    // 初始化移动设备下拉菜单
    initMobileDropdown();
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);
    
    // 导航栏当前页面高亮
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href').split('/').pop();
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 预加载重要资源
    const preloadImages = [
        'build_together.png',
        '/favicon.ico'
    ];
    
    preloadImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});
