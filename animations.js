// Animations module

/**
 * Sets up animations throughout the portfolio site
 */
export function setupAnimations() {
  // Setup scroll animations
  setupScrollAnimations();
  
  // Setup hover animations
  setupHoverAnimations();
  
  // Setup typing animation if present
  setupTypingAnimation();
  
  // Listen for scroll events to trigger animations
  window.addEventListener('scroll', handleScrollAnimations);
}

/**
 * Sets up scroll-based animations
 */
function setupScrollAnimations() {
  // Add stagger animation classes to elements
  addStaggerClasses('.project-card', 'stagger-item');
  addStaggerClasses('.skill-item', 'stagger-item');
  addStaggerClasses('.education-item', 'stagger-item');
  addStaggerClasses('.interest-item', 'stagger-item');
}

/**
 * Adds stagger animation classes to selected elements
 * @param {string} selector - CSS selector for the elements
 * @param {string} className - Class name to add
 */
function addStaggerClasses(selector, className) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    el.classList.add(className);
  });
}

/**
 * Sets up hover animations for interactive elements
 */
function setupHoverAnimations() {
  // Add hover effects to project images
  const projectImages = document.querySelectorAll('.project-image img');
  projectImages.forEach(img => {
    img.classList.add('img-hover');
  });
  
  // Add hover effects to interest icons
  const interestIcons = document.querySelectorAll('.interest-item i');
  interestIcons.forEach(icon => {
    icon.classList.add('icon-rotate');
  });
  
  // Add hover scale effect to various elements
  const scaleElements = document.querySelectorAll('.social-links a, .contact-item');
  scaleElements.forEach(el => {
    el.classList.add('hover-scale');
  });
}

/**
 * Sets up typing animation for elements with the 'typing' class
 */
function setupTypingAnimation() {
  const typingElements = document.querySelectorAll('.typing');
  
  if (typingElements.length === 0) return;
  
  typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.style.visibility = 'visible';
    
    let charIndex = 0;
    
    function typeCharacter() {
      if (charIndex < text.length) {
        element.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeCharacter, 100);
      }
    }
    
    // Start typing when element is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(typeCharacter, 500);
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(element);
  });
}

/**
 * Handles scroll-based animations
 */
function handleScrollAnimations() {
  // Animate staggered items when they come into view
  animateStaggeredElements('.stagger-item', 'animated');
  
  // Reveal elements with reveal class
  revealElements('.reveal');
}

/**
 * Animates staggered elements when they come into view
 * @param {string} selector - CSS selector for the elements
 * @param {string} animatedClass - Class to add when animated
 */
function animateStaggeredElements(selector, animatedClass) {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach((element, index) => {
    if (isElementInViewport(element) && !element.classList.contains(animatedClass)) {
      // Add delay based on index for staggered effect
      setTimeout(() => {
        element.classList.add(animatedClass);
      }, index * 100);
    }
  });
}

/**
 * Reveals elements with the reveal class when they come into view
 * @param {string} selector - CSS selector for the elements
 */
function revealElements(selector) {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(element => {
    if (isElementInViewport(element) && !element.classList.contains('revealed')) {
      element.classList.add('revealed');
    }
  });
}

/**
 * Checks if an element is in the viewport
 * @param {HTMLElement} element - The element to check
 * @param {number} offset - Optional offset from the bottom of the viewport
 * @returns {boolean} - Whether the element is in the viewport
 */
function isElementInViewport(element, offset = 100) {
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight + offset || document.documentElement.clientHeight + offset) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Animate specific element
 * @param {HTMLElement} element - The element to animate
 * @param {string} animationClass - The animation class to add
 * @param {number} duration - Animation duration in milliseconds
 */
export function animateElement(element, animationClass, duration = 1000) {
  if (!element) return;
  
  element.classList.add(animationClass);
  
  setTimeout(() => {
    element.classList.remove(animationClass);
  }, duration);
}

/**
 * Animate entrance of a section
 * @param {string} sectionId - The ID of the section to animate
 */
export function animateSection(sectionId) {
  const section = document.getElementById(sectionId);
  
  if (!section) return;
  
  section.classList.add('visible');
  
  // Animate child elements with stagger
  const childElements = section.querySelectorAll('.stagger-item');
  
  childElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('animated');
    }, 100 + index * 100);
  });
}