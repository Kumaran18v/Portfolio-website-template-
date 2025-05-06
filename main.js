// Import required modules
import { setupFormValidation } from './form-validation.js';
import { setupAnimations } from './animations.js';
import { setupDarkMode } from './darkmode.js';

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Setup form validation
  setupFormValidation();
  
  // Setup animations
  setupAnimations();
  
  // Setup dark mode toggle
  setupDarkMode();
  
  // Setup mobile menu
  setupMobileMenu();
  
  // Setup active navigation links
  setupNavigation();
  
  // Initialize the page
  initializePage();
});

// Initialize page with animations
function initializePage() {
  // Simulate loading state
  document.body.classList.add('loading');
  
  // Remove loading state after content loads
  window.setTimeout(() => {
    document.body.classList.remove('loading');
    
    // Animate hero section elements
    const heroElements = document.querySelectorAll('.hero-text h1, .hero-text h2, .hero-text p, .cta-buttons, .hero-image');
    heroElements.forEach((el, index) => {
      el.style.animation = `fadeIn 0.6s ease-out ${0.2 + index * 0.1}s forwards`;
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
    });
    
    // Check if we should animate sections in view
    checkSectionsInView();
  }, 300);
}

// Setup mobile menu functionality
function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      
      // Change icon based on menu state
      const icon = mobileMenuBtn.querySelector('i');
      if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Close mobile menu when clicking on a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
      mobileMenu.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

// Handle navigation links active state
function setupNavigation() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Set initial active link based on current scroll position
  setActiveNavLink();
  
  // Update active link on scroll
  window.addEventListener('scroll', () => {
    setActiveNavLink();
    checkSectionsInView();
    headerScrollEffect();
  });
  
  // Handle nav link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(link => link.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Get the target section
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      // Scroll to the section
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for header height
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Set active nav link based on scroll position
function setActiveNavLink() {
  const scrollPosition = window.scrollY;
  
  // Get all sections and their positions
  const sections = document.querySelectorAll('.section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; // Offset to trigger a bit before the section
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      // Remove active class from all nav links
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      
      // Add active class to corresponding nav link
      const correspondingNavLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
      if (correspondingNavLink) {
        correspondingNavLink.classList.add('active');
      }
    }
  });
}

// Check which sections are in view to apply animations
function checkSectionsInView() {
  const sections = document.querySelectorAll('.section');
  
  sections.forEach(section => {
    // Get section position relative to viewport
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Check if section is in view
    if (rect.top <= windowHeight * 0.75) {
      section.classList.add('visible');
      
      // Animate skill bars if this is the about section
      if (section.id === 'about') {
        animateSkillBars();
      }
    }
  });
}

// Animate skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    // Get the width from parent element
    const width = bar.style.width;
    
    // Reset width to animate from 0
    bar.style.width = '0';
    
    // Set a timeout to allow the CSS transition to work
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
}

// Header scroll effect
function headerScrollEffect() {
  const header = document.querySelector('header');
  
  if (window.scrollY > 50) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
}

// Export functions for use in other modules
export { initializePage, checkSectionsInView };