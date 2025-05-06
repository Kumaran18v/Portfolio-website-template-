// Dark Mode Module

/**
 * Sets up dark mode functionality
 */
export function setupDarkMode() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  
  if (!themeToggleBtn) return;
  
  // Check for saved theme preference or system preference
  initializeTheme();
  
  // Toggle theme when button is clicked
  themeToggleBtn.addEventListener('click', toggleTheme);
}

/**
 * Initialize theme based on saved preference or system preference
 */
function initializeTheme() {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    enableDarkMode();
  } else if (savedTheme === 'light') {
    enableLightMode();
  } else {
    // No saved preference, check system preference
    checkSystemThemePreference();
  }
}

/**
 * Check system theme preference
 */
function checkSystemThemePreference() {
  // Check if the user prefers dark mode
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    enableDarkMode();
  } else {
    enableLightMode();
  }
  
  // Listen for changes in system theme preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  });
}

/**
 * Toggle between light and dark mode
 */
function toggleTheme() {
  if (document.body.classList.contains('dark-mode')) {
    enableLightMode();
  } else {
    enableDarkMode();
  }
}

/**
 * Enable dark mode
 */
function enableDarkMode() {
  document.body.classList.add('dark-mode');
  updateThemeToggleIcon('dark');
  localStorage.setItem('theme', 'dark');
  
  // Update meta theme-color for mobile devices
  updateMetaThemeColor('#1C1C1E');
}

/**
 * Enable light mode
 */
function enableLightMode() {
  document.body.classList.remove('dark-mode');
  updateThemeToggleIcon('light');
  localStorage.setItem('theme', 'light');
  
  // Update meta theme-color for mobile devices
  updateMetaThemeColor('#FFFFFF');
}

/**
 * Update theme toggle icon based on current theme
 * @param {string} theme - The current theme ('light' or 'dark')
 */
function updateThemeToggleIcon(theme) {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  
  if (!themeToggleBtn) return;
  
  const icon = themeToggleBtn.querySelector('i');
  
  if (!icon) return;
  
  // Remove existing icon classes
  icon.classList.remove('fa-moon', 'fa-sun');
  
  // Add appropriate icon class
  if (theme === 'dark') {
    icon.classList.add('fa-sun');
  } else {
    icon.classList.add('fa-moon');
  }
}

/**
 * Update meta theme-color for mobile devices
 * @param {string} color - The color to set
 */
function updateMetaThemeColor(color) {
  // Check if meta theme-color exists
  let metaThemeColor = document.querySelector('meta[name="theme-color"]');
  
  // Create it if it doesn't exist
  if (!metaThemeColor) {
    metaThemeColor = document.createElement('meta');
    metaThemeColor.name = 'theme-color';
    document.head.appendChild(metaThemeColor);
  }
  
  // Set the color
  metaThemeColor.content = color;
}

/**
 * Check if dark mode is enabled
 * @returns {boolean} - Whether dark mode is enabled
 */
export function isDarkModeEnabled() {
  return document.body.classList.contains('dark-mode');
}

/**
 * Get current theme
 * @returns {string} - The current theme ('light' or 'dark')
 */
export function getCurrentTheme() {
  return document.body.classList.contains('dark-mode') ? 'dark' : 'light';
}