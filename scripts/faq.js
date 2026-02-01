// FAQ页面初始化
function initFAQPage() {
    // 初始化FAQ项目点击事件
    initFAQItems();
    
    // 初始化搜索功能
    initSearch();
    
    // FAQ页面性能检测
    initFAQPerformance();
}

// 初始化FAQ项目点击事件
function initFAQItems() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // 关闭其他打开的FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 切换当前FAQ
            item.classList.toggle('active');
            
            // 添加滚动动画
            if (item.classList.contains('active')) {
                item.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        });
    });
}

// 初始化搜索功能
function initSearch() {
    const searchInput = document.querySelector('.search-container input');
    const faqItems = document.querySelectorAll('.faq-item');
    const noResults = document.querySelector('.no-results');
    const faqCategories = document.querySelectorAll('.faq-category');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        let hasResults = false;
        
        if (searchTerm === '') {
            // 显示所有项目
            faqItems.forEach(item => {
                item.style.display = '';
                item.parentElement.parentElement.style.display = '';
            });
            
            if (noResults) noResults.style.display = 'none';
            return;
        }
        
        // 搜索FAQ
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question span').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = '';
                item.parentElement.parentElement.style.display = '';
                hasResults = true;
                
                // 自动展开匹配的FAQ
                item.classList.add('active');
            } else {
                item.style.display = 'none';
            }
        });
        
        // 隐藏没有匹配项目的分类
        faqCategories.forEach(category => {
            const visibleItems = category.querySelectorAll('.faq-item[style=""]');
            category.style.display = visibleItems.length > 0 ? '' : 'none';
        });
        
        // 显示/隐藏无结果提示
        if (noResults) {
            if (hasResults) {
                noResults.style.display = 'none';
            } else {
                noResults.style.display = 'block';
            }
        }
    });
    
    // 搜索框回车键搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm) {
                // 滚动到第一个匹配结果
                const firstMatch = document.querySelector('.faq-item[style=""]');
                if (firstMatch) {
                    firstMatch.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        }
    });
}

// FAQ页面性能检测
function initFAQPerformance() {
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
                    disableFAQAnimations();
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
    
    function disableFAQAnimations() {
        const style = document.createElement('style');
        style.id = 'low-performance-mode';
        style.textContent = `
            .faq-item:hover, .faq-hero:hover, .back-to-top:hover {
                animation: none !important;
                transition: none !important;
                transform: none !important;
            }
            .faq-answer {
                transition: none !important;
            }
        `;
        document.head.appendChild(style);
        console.info('[CFTQ Cloud] 已启用低性能模式，动画效果已关闭。');
    }
    
    requestAnimationFrame(detectFPS);
}

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initFAQPage();
});
