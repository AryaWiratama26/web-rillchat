// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const overlay = document.getElementById('overlay');
const darkToggle = document.getElementById('darkToggle');
const body = document.body;
const screenshotsSlider = document.getElementById('screenshotsSlider');
const sliderDots = document.getElementById('sliderDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Preloader
document.addEventListener('DOMContentLoaded', () => {
  // Show preloader
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.innerHTML = '<div class="loader"></div>';
  document.body.appendChild(preloader);

  // Hide preloader after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hide');
      setTimeout(() => {
        preloader.remove();
        animateElements();
      }, 500);
    }, 800);
  });

  // Initialize event listeners
  initEventListeners();
  
  // Initialize slider
  initSlider();
  
  // Check for dark mode preference
  checkDarkMode();
  
  // Create scroll to top button
  createScrollTopButton();
});

// Initialize Event Listeners
function initEventListeners() {
  // Sidebar Toggle
  menuBtn.addEventListener('click', toggleSidebar);
  closeBtn.addEventListener('click', toggleSidebar);
  overlay.addEventListener('click', toggleSidebar);

  // Dark Mode Toggle
  darkToggle.addEventListener('click', toggleDarkMode);

  // Close sidebar when clicking on a link (mobile)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        toggleSidebar();
      }
    });
  });

  // Resize handler
  window.addEventListener('resize', handleResize);
}

// Toggle Sidebar
function toggleSidebar() {
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
}

// Toggle Dark Mode
function toggleDarkMode() {
  body.classList.toggle('dark-mode');
  const isDarkMode = body.classList.contains('dark-mode');
  
  // Update toggle button icon and text
  const toggleIcon = darkToggle.querySelector('i');
  const toggleText = darkToggle.querySelector('span');
  
  if (isDarkMode) {
    toggleIcon.classList.remove('fa-moon');
    toggleIcon.classList.add('fa-sun');
    toggleText.textContent = 'Light Mode';
    localStorage.setItem('darkMode', 'enabled');
  } else {
    toggleIcon.classList.remove('fa-sun');
    toggleIcon.classList.add('fa-moon');
    toggleText.textContent = 'Dark Mode';
    localStorage.setItem('darkMode', null);
  }
}

// Check Dark Mode Preference
function checkDarkMode() {
  const darkModeSetting = localStorage.getItem('darkMode');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  if (darkModeSetting === 'enabled' || (darkModeSetting === null && prefersDarkScheme.matches)) {
    body.classList.add('dark-mode');
    const toggleIcon = darkToggle.querySelector('i');
    const toggleText = darkToggle.querySelector('span');
    
    toggleIcon.classList.remove('fa-moon');
    toggleIcon.classList.add('fa-sun');
    toggleText.textContent = 'Light Mode';
  }
}

// Initialize Slider
function initSlider() {
  if (!screenshotsSlider) return;
  
  const screenshots = screenshotsSlider.querySelectorAll('.screenshot');
  let currentIndex = 0;
  
  // Create slider dots
  screenshots.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
    });
    sliderDots.appendChild(dot);
  });
  
  // Add event listeners to prev/next buttons
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
    updateSlider();
  });
  
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % screenshots.length;
    updateSlider();
  });
  
  // Initial slider position
  updateSlider();
  
  // Auto scroll for slider
  setInterval(() => {
    currentIndex = (currentIndex + 1) % screenshots.length;
    updateSlider();
  }, 5000);
  
  // Function to update slider position
  function updateSlider() {
    const screenWidth = screenshots[0].offsetWidth + 20; // including gap
    screenshotsSlider.scrollTo({
      left: screenWidth * currentIndex,
      behavior: 'smooth'
    });
    
    // Update active dot
    const dots = sliderDots.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
}

// Handle Resize
function handleResize() {
  if (window.innerWidth >= 768) {
    if (sidebar.classList.contains('active')) {
      toggleSidebar();
    }
  }
}

// Animate Elements
function animateElements() {
  const elements = document.querySelectorAll('.section-header, .feature-card, .tech-card, .about-content, .screenshots-container');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  elements.forEach(element => {
    observer.observe(element);
  });
}

// Create Scroll to Top Button
function createScrollTopButton() {
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-top';
  scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  document.body.appendChild(scrollBtn);
  
  // Show/hide scroll button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });
  
  // Scroll to top when clicked
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}