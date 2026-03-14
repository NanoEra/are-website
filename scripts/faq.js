// FAQ Page Interactions

document.addEventListener('DOMContentLoaded', function() {
  // FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all others
      faqItems.forEach(other => other.classList.remove('active'));
      
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Search functionality
  const searchInput = document.getElementById('faqSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const term = e.target.value.toLowerCase().trim();
      const groups = document.querySelectorAll('.faq-group');
      
      groups.forEach(group => {
        const items = group.querySelectorAll('.faq-item');
        let hasVisible = false;
        
        items.forEach(item => {
          const question = item.querySelector('.faq-question span');
          const answer = item.querySelector('.faq-answer');
          if (!question || !answer) return;
          
          const qText = question.textContent.toLowerCase();
          const aText = answer.textContent.toLowerCase();
          
          if (term === '' || qText.includes(term) || aText.includes(term)) {
            item.style.display = '';
            hasVisible = true;
          } else {
            item.style.display = 'none';
          }
        });
        
        group.style.display = hasVisible ? '' : 'none';
      });
    });
  }
});
