// animation.js - Advanced animations for SkyPorta

gsap.registerPlugin(ScrollTrigger);

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