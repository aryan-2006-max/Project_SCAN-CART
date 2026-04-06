/* ======================================================
   SELF CHECKOUT — JavaScript interactions
   ====================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== MOBILE MENU TOGGLE =====
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  mobileClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ===== TAB SWITCHING =====
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      // Remove active from all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      // Set active
      btn.classList.add('active');
      document.getElementById(`panel-${target}`).classList.add('active');
    });
  });

  // ===== STAR RATING =====
  const stars = document.querySelectorAll('.star');
  let currentRating = 0;

  stars.forEach(star => {
    star.addEventListener('click', () => {
      currentRating = parseInt(star.dataset.value);
      updateStars();
    });

    star.addEventListener('mouseenter', () => {
      highlightStars(parseInt(star.dataset.value));
    });
  });

  document.getElementById('star-rating').addEventListener('mouseleave', () => {
    updateStars();
  });

  function highlightStars(n) {
    stars.forEach(star => {
      star.classList.toggle('active', parseInt(star.dataset.value) <= n);
    });
  }

  function updateStars() {
    stars.forEach(star => {
      star.classList.toggle('active', parseInt(star.dataset.value) <= currentRating);
    });
  }

  // ===== FEEDBACK FORM =====
  const feedbackForm = document.getElementById('feedback-form');
  const feedbackSuccess = document.getElementById('feedback-success');

  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate submission
    feedbackForm.style.display = 'none';
    feedbackSuccess.style.display = 'block';
    feedbackSuccess.style.animation = 'fadeIn 0.5s ease';
  });

  // ===== SCROLL ANIMATIONS (Intersection Observer) =====
  const animateElements = document.querySelectorAll('[data-animate]');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Apply animation delay if set inline
        const delay = entry.target.style.animationDelay;
        if (delay) {
          entry.target.style.transitionDelay = delay;
        }
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(el => observer.observe(el));

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
      navbar.style.background = 'rgba(0, 0, 0, 0.96)';
      navbar.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.4)';
    } else {
      navbar.style.background = 'rgba(0, 0, 0, 0.92)';
      navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
    }

    lastScroll = currentScroll;
  });

  // ===== SMOOTH HOVER PARALLAX on HERO =====
  const hero = document.querySelector('.hero');
  const orbitContainer = document.querySelector('.orbit-container');

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    orbitContainer.style.transform = `translate(calc(-50% + ${x * 20}px), calc(-50% + ${y * 20}px))`;
  });

  hero.addEventListener('mouseleave', () => {
    orbitContainer.style.transform = 'translate(-50%, -50%)';
    orbitContainer.style.transition = 'transform 0.5s ease';
    setTimeout(() => {
      orbitContainer.style.transition = '';
    }, 500);
  });

  // ===== COUNTER ANIMATION for stats (optional future use) =====
  function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }

  // ===== KEYBOARD ACCESSIBILITY =====
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

});
