// ========================================
// FUTURISTIC INSTITUTION TRACKER - JS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // AUTO-HIDE FLASH MESSAGES
  // ==========================================
  setTimeout(function() {
    const messages = document.querySelectorAll('[data-message]');
    messages.forEach(msg => {
      msg.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        msg.remove();
      }, 300);
    });
  }, 4000);
  
  // ==========================================
  // ANIMATED PROGRESS RING
  // ==========================================
  const progressRings = document.querySelectorAll('.progress-ring-circle');
  progressRings.forEach(ring => {
    const offset = ring.style.strokeDashoffset;
    ring.style.strokeDashoffset = '339.292';
    setTimeout(() => {
      ring.style.strokeDashoffset = offset;
    }, 100);
  });
  
  // ==========================================
  // ANIMATED SCORE BAR
  // ==========================================
  const scoreFills = document.querySelectorAll('.score-fill');
  scoreFills.forEach(fill => {
    const width = fill.style.width;
    fill.style.width = '0';
    setTimeout(() => {
      fill.style.width = width;
    }, 100);
  });
  
  // ==========================================
  // TABLE ROW CLICK EFFECT
  // ==========================================
  const tableRows = document.querySelectorAll('.table-row');
  tableRows.forEach(row => {
    row.addEventListener('click', function(e) {
      if (e.target.tagName !== 'A') {
        const link = this.querySelector('a');
        if (link) {
          link.click();
        }
      }
    });
  });
  
  // ==========================================
  // FORM VALIDATION EFFECTS
  // ==========================================
  const formInputs = document.querySelectorAll('.form-input');
  formInputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.value.trim() !== '') {
        this.style.borderColor = 'var(--success)';
      } else if (this.hasAttribute('required')) {
        this.style.borderColor = 'var(--danger)';
      }
    });
    
    input.addEventListener('focus', function() {
      this.style.borderColor = 'var(--primary)';
    });
  });
  
  // ==========================================
  // BUTTON RIPPLE EFFECT
  // ==========================================
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.6)';
      ripple.style.width = ripple.style.height = '100px';
      ripple.style.left = e.offsetX - 50 + 'px';
      ripple.style.top = e.offsetY - 50 + 'px';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'ripple 0.6s ease-out';
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // ==========================================
  // PARALLAX EFFECT ON SPHERES
  // ==========================================
  document.addEventListener('mousemove', function(e) {
    const spheres = document.querySelectorAll('.sphere');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    spheres.forEach((sphere, index) => {
      const speed = (index + 1) * 20;
      const x = mouseX * speed;
      const y = mouseY * speed;
      sphere.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
  
  // ==========================================
  // SMOOTH SCROLL
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // ==========================================
  // NUMBER COUNTER ANIMATION
  // ==========================================
  const animateNumbers = () => {
    const numbers = document.querySelectorAll('.score-number, .progress-text');
    numbers.forEach(num => {
      const target = parseInt(num.textContent);
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          num.textContent = target;
          clearInterval(timer);
        } else {
          num.textContent = Math.floor(current);
        }
      }, 20);
    });
  };
  
  // Trigger on page load
  if (document.querySelector('.score-number') || document.querySelector('.progress-text')) {
    setTimeout(animateNumbers, 200);
  }
  
});

// ==========================================
// CSS ANIMATION FOR SLIDEOUT
// ==========================================
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOut {
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  @keyframes ripple {
    to {
      transform: scale(3);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ==========================================
// CONSOLE EASTER EGG
// ==========================================
console.log('%c🚀 INSTITUTION TRACKER', 'color: #00f0ff; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px rgba(0,240,255,0.5);');
console.log('%cWelcome to the future of education management!', 'color: #8b9dc3; font-size: 14px;');