// animation.js - Advanced animations for SkyPorta

gsap.registerPlugin(ScrollTrigger);

// ========== WELCOME GREETING OVERLAY ==========
(function(){
  // Wait for DOM to be fully loaded
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWelcome);
  } else {
    initWelcome();
  }

  function initWelcome() {
    const overlay = document.getElementById('welcomeOverlay');
    const closeBtn = document.getElementById('welcomeClose');
    const startBtn = document.getElementById('welcomeBtn');

    if(!overlay || !closeBtn || !startBtn) {
      console.warn('Welcome overlay elements not found');
      return;
    }

    // Check if user has already seen the welcome (using sessionStorage for this session only)
    const hasSeenWelcome = sessionStorage.getItem('skyporta_welcome_shown');

    if(!hasSeenWelcome) {
      // Show the overlay on first load
      overlay.classList.remove('hidden');
      sessionStorage.setItem('skyporta_welcome_shown', 'true');
      console.log('Welcome overlay shown');
    } else {
      // Keep it hidden if already shown this session
      overlay.classList.add('hidden');
      console.log('Welcome overlay already shown this session');
    }

    // Only close when user clicks "Let's Get Started" button
    function closeWelcome(e) {
      if(e) {
        e.preventDefault();
        e.stopPropagation();
      }
      overlay.classList.add('hidden');
      // After animation completes, remove from DOM for cleaner memory
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 400);
    }

    startBtn.addEventListener('click', closeWelcome);

    // Disable close button visually
    closeBtn.style.cursor = 'not-allowed';
    closeBtn.style.opacity = '0.4';
    closeBtn.style.pointerEvents = 'none';

    // Prevent closing by clicking outside
    overlay.addEventListener('click', (e) => {
      if(e.target === overlay) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    });

    // Prevent closing with Escape key
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && !overlay.classList.contains('hidden')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    });

    console.log('Welcome overlay initialized');
  }
})();

// ========== HERO SECTION ANIMATIONS ==========

// Hero background slow pan
gsap.to(".hero", {
  backgroundPosition: "50% 100%",
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1.5,
  }
});

// Hero text fade-in cascade
gsap.from(".hero-text h1", {
  y: 60,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
  delay: 0.2
});

gsap.from(".hero-text p", {
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 0.5,
  ease: "power2.out"
});

gsap.from(".hero-text .btn", {
  scale: 0.5,
  opacity: 0,
  duration: 0.8,
  delay: 1,
  ease: "back.out(1.7)"
});

// Hero image entrance
gsap.from(".hero-img-large", {
  x: 50,
  opacity: 0,
  duration: 1.2,
  delay: 0.3,
  ease: "power3.out"
});

// Logo animation
gsap.from(".logo-img-hero", {
  scale: 0,
  opacity: 0,
  duration: 0.8,
  ease: "back.out(2)"
});

// ========== ABOUT SECTION ANIMATIONS ==========

gsap.from(".about h2", {
  scrollTrigger: {
    trigger: ".about h2",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power2.out"
});

gsap.from(".about p", {
  scrollTrigger: {
    trigger: ".about p",
    start: "top 85%",
    toggleActions: "play none none reverse"
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.3,
  ease: "power2.out"
});

// ========== FOOTER ANIMATIONS ==========

gsap.from(".footer-section", {
  scrollTrigger: {
    trigger: ".footer",
    start: "top 90%",
    toggleActions: "play none none reverse"
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: "power2.out"
});

// ========== INTERACTIVE HOVER EFFECTS ==========

// Navigation links hover animation
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('mouseenter', () => {
    gsap.to(link, { y: -3, duration: 0.3, overwrite: 'auto' });
  });
  link.addEventListener('mouseleave', () => {
    gsap.to(link, { y: 0, duration: 0.3, overwrite: 'auto' });
  });
});

// Service card click effect
document.querySelectorAll('.service-card').forEach((card, index) => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { 
      boxShadow: "0 20px 40px rgba(0, 123, 255, 0.3)",
      y: -10,
      duration: 0.3,
      overwrite: 'auto'
    });
    
    // Animate icon on hover
    gsap.to(card.querySelector('.service-icon'), {
      scale: 1.2,
      rotation: 10,
      duration: 0.4,
      overwrite: 'auto'
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { 
      boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
      y: 0,
      duration: 0.3,
      overwrite: 'auto'
    });
    
    // Reset icon
    gsap.to(card.querySelector('.service-icon'), {
      scale: 1,
      rotation: 0,
      duration: 0.4,
      overwrite: 'auto'
    });
  });

  // Click animation
  card.addEventListener('click', () => {
    gsap.to(card, {
      scale: 0.95,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  });
});

// Button hover ripple effect
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, { 
      scale: 1.05,
      duration: 0.3,
      overwrite: 'auto'
    });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { 
      scale: 1,
      duration: 0.3,
      overwrite: 'auto'
    });
  });
});

// ========== SMOOTH SCROLL BEHAVIOR ==========

// Native smooth scroll for anchor links (no GSAP scrollTo issues)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========== PARALLAX AND SCROLL EFFECTS ==========

// Subtle parallax for hero image
gsap.to(".hero-img-large", {
  y: -50,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom center",
    scrub: 2,
    markers: false
  }
});

// Counter animation for stats (if added)
function animateCounter(element, target) {
  gsap.to(element, {
    textContent: target,
    duration: 2,
    ease: "power1.inOut",
    snap: { textContent: 1 },
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });
}

// ========== SCROLL PROGRESS BAR ==========

const scrollBar = document.createElement('div');
scrollBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #007bff, #00d4ff);
  z-index: 999;
  width: 0%;
`;
document.body.appendChild(scrollBar);

gsap.to(scrollBar, {
  width: "100%",
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
      scrollBar.style.width = self.progress * 100 + "%";
    }
  }
});

// ========== MOBILE MENU TOGGLE ==========

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    gsap.to(mobileMenuToggle, {
      rotation: nav.classList.contains('active') ? 90 : 0,
      duration: 0.3
    });
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      gsap.to(mobileMenuToggle, {
        rotation: 0,
        duration: 0.3
      });
    });
  });
}

// ========== RESPONSIVE ANIMATIONS ==========

// Disable certain animations on mobile for performance
const isMobile = window.innerWidth <= 768;

// Performance optimization for mobile
if (isMobile) {
  document.documentElement.style.scrollBehavior = 'smooth';
}

// ========== PAGE LOAD ANIMATION ==========

window.addEventListener('load', () => {
  gsap.from(".header", {
    y: -100,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  });
});

console.log('✈️ SkyPorta animations loaded successfully!');

// ========== PLATFORM DETECTION (adds platform-android / platform-ios / platform-desktop class) ==========
(function(){
  try {
    const ua = navigator.userAgent || navigator.vendor || window.opera || '';
    let platformClass = 'platform-desktop';

    if (/android/i.test(ua)) {
      platformClass = 'platform-android';
    } else if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      // iPadOS desktops can present as MacIntel; maxTouchPoints check helps detect touch iOS devices
      platformClass = 'platform-ios';
    }

    document.documentElement.classList.add(platformClass);

    // Add a desktop class also when viewport is wide (laptop) for convenience
    function updateViewportClass(){
      if(window.innerWidth >= 992) document.documentElement.classList.add('platform-laptop');
      else document.documentElement.classList.remove('platform-laptop');
    }

    window.addEventListener('resize', updateViewportClass);
    updateViewportClass();

  } catch (err) {
    // fail silently — platform detection is progressive enhancement
    console.warn('Platform detection failed', err);
  }
})();

// ========== HERO BACKGROUND SLIDER (crossfade + subtle slide) ==========
(function(){
  const layerA = document.querySelector('.hero-bg-layer.layer1');
  const layerB = document.querySelector('.hero-bg-layer.layer2');
  if(!layerA || !layerB) return;

  // 6-image carousel with smooth thin transitions
  const images = [
    'https://tse3.mm.bing.net/th/id/OIP.YZB_8i2dIS5ojq6tZhr6qQAAAA?cb=ucfimg2ucfimg=1&w=400&h=400&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://tse1.mm.bing.net/th/id/OIP.zjV4dqjyjpq12cZll6pDfQHaE8?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://tse2.mm.bing.net/th/id/OIP.bdewkyhdV_u3CRZFB3nCMQHaE9?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://th.bing.com/th/id/OIP.4e8G1uLC4OZOa4Hnwu2haQHaEk?w=275&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1',
    'https://th.bing.com/th/id/OIP.EAguZn8BdgPHsFYvqfEmWQHaEK?w=282&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1',
    'https://media.istockphoto.com/photos/cargo-airplane-picture-id547048012?k=6&m=547048012&s=612x612&w=0&h=HEht5CNj27F4gPy_eLqKhFguZ_UCQufIecYkMInyX64='
  ];

  let current = 0;
  const layers = [layerA, layerB];
  const heroSection = document.querySelector('.hero');

  // Initialize with first image
  layers[0].style.backgroundImage = `url('${images[0]}')`;
  layers[0].style.opacity = 1;
  layers[1].style.opacity = 0;
  
  // Set initial image index class for font styling
  if (heroSection) {
    heroSection.className = heroSection.className.replace(/image-\d+/g, '');
    // use 1-based image classes to match user preference (image-1..image-6)
    heroSection.classList.add('image-1');
  }

  // Timing: 5 sec per image, 0.8 sec transition (thin fade)
  const DISPLAY_TIME = 5000;
  const TRANSITION_TIME = 800;

  // Helper: set the active thumbnail visual state (expects 1-based index)
  function setActiveThumb(oneBasedIndex) {
    const thumbs = document.querySelectorAll('.hero-thumb');
    thumbs.forEach(t => t.classList.remove('active'));
    const sel = document.querySelector(`.hero-thumb[data-index="${oneBasedIndex}"]`);
    if (sel) sel.classList.add('active');
  }

  // Transition to a specific image index (0-based)
  function transitionTo(nextIndex) {
    // Guard
    if (nextIndex === current) return;

    // Set next image on top layer
    layers[1].style.backgroundImage = `url('${images[nextIndex]}')`;

    // Smooth thin crossfade
    if (window.gsap) {
      gsap.to(layers[0], { opacity: 0, duration: TRANSITION_TIME / 1000, ease: 'sine.inOut' });
      gsap.to(layers[1], { opacity: 1, duration: TRANSITION_TIME / 1000, ease: 'sine.inOut' });
    } else {
      layers[0].style.transition = `opacity ${TRANSITION_TIME / 1000}s ease-in-out`;
      layers[1].style.transition = `opacity ${TRANSITION_TIME / 1000}s ease-in-out`;
      layers[0].style.opacity = 0;
      layers[1].style.opacity = 1;
    }

    // After transition, swap the images and update state
    setTimeout(() => {
      layers[0].style.backgroundImage = `url('${images[nextIndex]}')`;
      layers[0].style.opacity = 1;
      layers[1].style.opacity = 0;
      current = nextIndex;

      // Update image index class for dynamic font styling (1-based)
      if (heroSection) {
        heroSection.className = heroSection.className.replace(/image-\d+/g, '');
        heroSection.classList.add(`image-${nextIndex + 1}`);
      }

      // update active thumbnail
      setActiveThumb(nextIndex + 1);
    }, TRANSITION_TIME);
  }

  // Auto-advance scheduling
  let autoTimer = null;
  function scheduleAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      transitionTo((current + 1) % images.length);
    }, DISPLAY_TIME + TRANSITION_TIME);
  }

  // start auto rotation
  scheduleAuto();

  // Wire up thumbnail interactions
  const thumbs = document.querySelectorAll('.hero-thumb');
  if (thumbs && thumbs.length) {
    thumbs.forEach(t => {
        t.addEventListener('click', (e) => {
          const idx = Math.max(0, parseInt(t.dataset.index || '1', 10) - 1);
          if (isNaN(idx)) return;
          // Manual transition without disabling auto-rotation: transition now and restart auto timer so it continues
          transitionTo(idx);
          // restart auto-rotation cycle so the carousel keeps moving on its own
          if (autoTimer) clearInterval(autoTimer);
          scheduleAuto();
        });

      // keyboard accessibility (Enter / Space triggers click)
      t.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          t.click();
        }
      });
    });
  }

  // Preload all images for smoother carousel
  images.forEach(img => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = img;
    document.head.appendChild(link);
  });
})();