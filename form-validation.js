// Form validation module

/**
 * Sets up form validation for the contact form
 */
export function setupFormValidation() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  
  const formStatus = document.getElementById('form-status');
  
  // Validate each field on input
  nameInput.addEventListener('input', () => validateName(nameInput, nameError));
  emailInput.addEventListener('input', () => validateEmail(emailInput, emailError));
  messageInput.addEventListener('input', () => validateMessage(messageInput, messageError));
  
  // Handle form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName(nameInput, nameError);
    const isEmailValid = validateEmail(emailInput, emailError);
    const isMessageValid = validateMessage(messageInput, messageError);
    
    // If all fields are valid, submit the form
    if (isNameValid && isEmailValid && isMessageValid) {
      // Show loading state
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalBtnText = submitBtn.textContent;
      submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission (in a real app, this would be an API call)
      setTimeout(() => {
        // Show success message
        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        formStatus.className = 'form-status success';
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          formStatus.className = 'form-status';
        }, 5000);
      }, 1500);
    } else {
      // Show error message
      formStatus.textContent = 'Please fix the errors above and try again.';
      formStatus.className = 'form-status error';
      
      // Hide error message after 3 seconds
      setTimeout(() => {
        formStatus.className = 'form-status';
      }, 3000);
    }
  });
}

/**
 * Validates the name field
 * @param {HTMLInputElement} input - The name input element
 * @param {HTMLElement} errorElement - The error message element
 * @returns {boolean} - Whether the name is valid
 */
function validateName(input, errorElement) {
  const value = input.value.trim();
  
  // Clear previous error
  errorElement.textContent = '';
  
  // Check if name is empty
  if (value === '') {
    errorElement.textContent = 'Name is required';
    return false;
  }
  
  // Check if name is too short
  if (value.length < 2) {
    errorElement.textContent = 'Name must be at least 2 characters';
    return false;
  }
  
  // Check if name contains only letters and spaces
  if (!/^[A-Za-z\s]+$/.test(value)) {
    errorElement.textContent = 'Name can only contain letters and spaces';
    return false;
  }
  
  return true;
}

/**
 * Validates the email field
 * @param {HTMLInputElement} input - The email input element
 * @param {HTMLElement} errorElement - The error message element
 * @returns {boolean} - Whether the email is valid
 */
function validateEmail(input, errorElement) {
  const value = input.value.trim();
  
  // Clear previous error
  errorElement.textContent = '';
  
  // Check if email is empty
  if (value === '') {
    errorElement.textContent = 'Email is required';
    return false;
  }
  
  // Check if email format is valid
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if (!emailRegex.test(value)) {
    errorElement.textContent = 'Please enter a valid email address';
    return false;
  }
  
  return true;
}

/**
 * Validates the message field
 * @param {HTMLTextAreaElement} input - The message textarea element
 * @param {HTMLElement} errorElement - The error message element
 * @returns {boolean} - Whether the message is valid
 */
function validateMessage(input, errorElement) {
  const value = input.value.trim();
  
  // Clear previous error
  errorElement.textContent = '';
  
  // Check if message is empty
  if (value === '') {
    errorElement.textContent = 'Message is required';
    return false;
  }
  
  // Check if message is too short
  if (value.length < 10) {
    errorElement.textContent = 'Message must be at least 10 characters';
    return false;
  }
  
  return true;
}

/**
 * Resets form validation errors and messages
 * @param {HTMLFormElement} form - The form to reset
 */
export function resetFormValidation(form) {
  if (!form) return;
  
  const errorElements = form.querySelectorAll('.error-message');
  const formStatus = document.getElementById('form-status');
  
  // Clear all error messages
  errorElements.forEach(element => {
    element.textContent = '';
  });
  
  // Reset form status
  if (formStatus) {
    formStatus.className = 'form-status';
    formStatus.textContent = '';
  }
}