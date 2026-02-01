// 下载页面初始化
function initDownloadPage() {
    // 为下载卡片添加滚动动画
    const downloadCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, 100);
                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    downloadCards.forEach(card => {
        observer.observe(card);
    });
    
    // 下载页面性能检测
    initDownloadPerformance();
}

// 下载页面性能检测
function initDownloadPerformance() {
    const cores = navigator.hardwareConcurrency || 1;
    const memory = navigator.deviceMemory || 0;
    const isLowEndDevice = cores <= 2 || memory <= 2;
    
    let lastTime = performance.now();
    let frameCount = 0;
    let lowFramesCount = 0;
    
    function detectFPS() {
        const now = performance.now();
        frameCount++;
        
        if (now >= lastTime + 1000) {
            const fps = Math.round((frameCount * 1000) / (now - lastTime));
            
            if (fps < 30) {
                lowFramesCount++;
                if (lowFramesCount >= 3 || isLowEndDevice) {
                    disableDownloadAnimations();
                    return;
                }
            } else {
                lowFramesCount = 0;
            }
            
            frameCount = 0;
            lastTime = now;
        }
        
        requestAnimationFrame(detectFPS);
    }
    
    function disableDownloadAnimations() {
        const style = document.createElement('style');
        style.id = 'low-performance-mode';
        style.textContent = `
            .particle-stars, .light-streams, .geometric-element,
            .feature-card:hover, .download-hero:hover, .back-to-top:hover {
                animation: none !important;
                transition: none !important;
                transform: none !important;
            }
            .particle-stars, .light-streams {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
        console.info('[CFTQ Cloud] 已启用低性能模式，动画效果已关闭。');
    }
    
    requestAnimationFrame(detectFPS);
}

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initDownloadPage();
});
