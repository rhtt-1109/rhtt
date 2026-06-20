/**
 * RHTT Homepage Interactive Scripts (Refined)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initHeaderScroll();
  initMobileMenu();
  initTestimonialSlider();
  initSalarySimulator();
  initScrollReveal();
});

/**
 * 1. Header Scroll Effect
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Run once initially in case page is refreshed scrolled down
  handleScroll();
}

/**
 * 2. Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  
  if (!menuToggle || !mobileNav) return;
  
  const mobileNavLinks = mobileNav.querySelectorAll('a');

  const toggleMenu = () => {
    menuToggle.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  };

  menuToggle.addEventListener('click', toggleMenu);

  // Close menu when clicking links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });
}

/**
 * 3. Testimonial Slider / Carousel
 */
function initTestimonialSlider() {
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (!track || !prevBtn || !nextBtn) return;

  const slides = Array.from(track.children);
  let currentIndex = 0;

  const updateSlider = () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  };

  nextBtn.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop back
    }
    updateSlider();
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - 1; // Loop to end
    }
    updateSlider();
  });

  // Re-align on window resize
  window.addEventListener('resize', updateSlider);
}

/**
 * 4. Salary Simulator (Tokai Region Focus)
 */
function initSalarySimulator() {
  const simRegion = document.getElementById('simRegion');
  const simExperience = document.getElementById('simExperience');
  const simDays = document.getElementById('simDays');
  const simHours = document.getElementById('simHours');
  
  const resWage = document.getElementById('resWage');
  const resMonthly = document.getElementById('resMonthly');

  if (!simRegion || !simExperience || !simDays || !simHours || !resWage || !resMonthly) return;

  const calculateSalary = () => {
    // 1. Get base wage from selected region option attribute (Aichi, Gifu, Mie, Shizuoka)
    const selectedRegionOpt = simRegion.options[simRegion.selectedIndex];
    const baseWage = parseInt(selectedRegionOpt.getAttribute('data-wage')) || 1400;

    // 2. Get bonus from experience
    const selectedExpOpt = simExperience.options[simExperience.selectedIndex];
    const bonus = parseInt(selectedExpOpt.getAttribute('data-bonus')) || 0;

    const hourlyWage = baseWage + bonus;

    // 3. Get time conditions
    const days = parseInt(simDays.value) || 5;
    const hours = parseInt(simHours.value) || 8;

    // 4. Calculate monthly income (monthly estimate = hourly wage * hours/day * days/week * 4 weeks)
    const monthlyIncome = hourlyWage * hours * days * 4;

    // 5. Update UI
    resWage.textContent = hourlyWage.toLocaleString('ja-JP');
    resMonthly.textContent = monthlyIncome.toLocaleString('ja-JP');
  };

  // Add event listeners to all select elements
  [simRegion, simExperience, simDays, simHours].forEach(element => {
    element.addEventListener('change', calculateSalary);
  });

  // Run initial calculation
  calculateSalary();
}

/**
 * 5. Scroll Reveal (Intersection Observer)
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once revealed, no need to track again
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: '0px 0px -50px 0px' // Offset to trigger slightly before coming into view
    });
    
    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('active'));
  }
}
