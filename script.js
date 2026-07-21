/* =============================================
   REGAL PALACE HOTEL - JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Preloader ---- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      startCounters();
    }, 2200);
  });
  document.body.style.overflow = 'hidden';

  /* ---- Navbar Scroll ---- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link
    updateActiveNav();
  });

  /* ---- Active Nav on Scroll ---- */
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (!link) return;

      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }

  /* ---- Smooth Scroll for all links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Hamburger Menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  window.closeMobile = () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
  };

  /* ---- Hero Slider ---- */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let sliderInterval;

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startSlider() {
    sliderInterval = setInterval(nextSlide, 5000);
  }

  startSlider();

  document.getElementById('nextSlide').addEventListener('click', () => {
    clearInterval(sliderInterval);
    nextSlide();
    startSlider();
  });

  document.getElementById('prevSlide').addEventListener('click', () => {
    clearInterval(sliderInterval);
    prevSlide();
    startSlider();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(sliderInterval);
      goToSlide(i);
      startSlider();
    });
  });

  /* ---- Animated Counters ---- */
  function startCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target.toLocaleString('ar');
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toLocaleString('ar');
        }
      }, 16);
    });
  }

  /* ---- Particle System ---- */
  const particlesContainer = document.getElementById('particles');
  const particleCount = 25;

  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }

  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${Math.random() * 4 + 1}px;
      height: ${Math.random() * 4 + 1}px;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    particlesContainer.appendChild(particle);
  }

  /* ---- Testimonials Slider ---- */
  const track = document.getElementById('testimonialTrack');
  const cards = document.querySelectorAll('.testimonial-card');
  let currentTestimonial = 0;
  let maxSlide = 0;

  function updateTestimonialSlider() {
    const cardWidth = cards[0].offsetWidth + 24;
    maxSlide = Math.max(0, cards.length - 2);

    if (window.innerWidth <= 900) {
      maxSlide = cards.length - 1;
    }

    currentTestimonial = Math.min(currentTestimonial, maxSlide);
    track.style.transform = `translateX(${currentTestimonial * cardWidth}px)`;
  }

  document.getElementById('tNext').addEventListener('click', () => {
    const cardWidth = cards[0].offsetWidth + 24;
    const isMobile = window.innerWidth <= 900;
    maxSlide = isMobile ? cards.length - 1 : Math.max(0, cards.length - 2);

    if (currentTestimonial < maxSlide) {
      currentTestimonial++;
    } else {
      currentTestimonial = 0;
    }
    track.style.transform = `translateX(${currentTestimonial * cardWidth}px)`;
  });

  document.getElementById('tPrev').addEventListener('click', () => {
    const cardWidth = cards[0].offsetWidth + 24;
    const isMobile = window.innerWidth <= 900;
    maxSlide = isMobile ? cards.length - 1 : Math.max(0, cards.length - 2);

    if (currentTestimonial > 0) {
      currentTestimonial--;
    } else {
      currentTestimonial = maxSlide;
    }
    track.style.transform = `translateX(${currentTestimonial * cardWidth}px)`;
  });

  // Auto testimonial
  setInterval(() => {
    const cardWidth = cards[0].offsetWidth + 24;
    const isMobile = window.innerWidth <= 900;
    maxSlide = isMobile ? cards.length - 1 : Math.max(0, cards.length - 2);
    currentTestimonial = currentTestimonial < maxSlide ? currentTestimonial + 1 : 0;
    track.style.transform = `translateX(${currentTestimonial * cardWidth}px)`;
  }, 4000);

  window.addEventListener('resize', updateTestimonialSlider);

  /* ---- Scroll Reveal Animation ---- */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(
    '.room-card, .amenity-card, .offer-card, .dining-card, .gallery-item, .feat-item, .contact-item, .testimonial-card'
  );

  animateElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;
    observer.observe(el);
  });

  /* ---- Booking Form ---- */
  const bookingForm = document.getElementById('bookingForm');
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;

    if (!checkin || !checkout) {
      shakeElement(bookingForm);
      return;
    }

    if (new Date(checkout) <= new Date(checkin)) {
      alert('يجب أن يكون تاريخ المغادرة بعد تاريخ الوصول');
      return;
    }

    showModal();
  });

  /* ---- Contact Form ---- */
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showModal();
    contactForm.reset();
  });

  /* ---- Newsletter Form ---- */
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('button');
    btn.textContent = '✓';
    btn.style.background = '#2ecc71';
    setTimeout(() => {
      btn.textContent = '✦';
      btn.style.background = '';
      newsletterForm.reset();
    }, 3000);
  });

  /* ---- Modal ---- */
  function showModal() {
    document.getElementById('successModal').classList.add('active');
  }

  window.closeModal = () => {
    document.getElementById('successModal').classList.remove('active');
  };

  document.getElementById('successModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('successModal')) {
      closeModal();
    }
  });

  /* ---- Shake Animation ---- */
  function shakeElement(el) {
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = 'shake 0.4s ease';
    setTimeout(() => { el.style.animation = ''; }, 400);
  }

  // Add shake keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
  `;
  document.head.appendChild(style);

  /* ---- Back to Top ---- */
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Gallery Lightbox Effect ---- */
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-caption');

      const lightbox = document.createElement('div');
      lightbox.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.95);
        z-index: 3000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        cursor: pointer;
        animation: fadeIn 0.3s ease;
      `;

      const lightboxImg = document.createElement('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxImg.style.cssText = `
        max-width: 90vw;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 12px;
        box-shadow: 0 20px 80px rgba(0,0,0,0.8);
      `;

      const lightboxCaption = document.createElement('p');
      lightboxCaption.textContent = caption ? caption.textContent : img.alt;
      lightboxCaption.style.cssText = `
        margin-top: 16px;
        color: #c9a84c;
        font-size: 16px;
        font-family: 'Playfair Display', serif;
        letter-spacing: 1px;
      `;

      const closeBtn = document.createElement('button');
      closeBtn.textContent = '✕';
      closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(201,168,76,0.2);
        border: 1px solid rgba(201,168,76,0.4);
        color: #c9a84c;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.3s;
      `;

      lightbox.appendChild(closeBtn);
      lightbox.appendChild(lightboxImg);
      lightbox.appendChild(lightboxCaption);
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';

      const closeLightbox = () => {
        lightbox.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
          document.body.removeChild(lightbox);
          document.body.style.overflow = '';
        }, 300);
      };

      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });

      closeBtn.addEventListener('click', closeLightbox);

      // Add fade animations
      const fadeStyle = document.createElement('style');
      fadeStyle.textContent = `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
      `;
      document.head.appendChild(fadeStyle);
    });
  });

  /* ---- Date Defaults ---- */
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 3);

  const formatDate = (d) => d.toISOString().split('T')[0];

  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');

  if (checkinInput) {
    checkinInput.min = formatDate(today);
    checkinInput.value = formatDate(tomorrow);
  }

  if (checkoutInput) {
    checkoutInput.min = formatDate(tomorrow);
    checkoutInput.value = formatDate(dayAfter);
  }

  /* ---- Parallax on Hero ---- */
  const heroContent = document.querySelector('.hero-content');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
      heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 1.5;
    }
  });

  /* ---- Cursor Glow Effect ---- */
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid rgba(201,168,76,0.6);
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease, width 0.3s, height 0.3s, opacity 0.3s;
    mix-blend-mode: difference;
  `;

  const cursorDot = document.createElement('div');
  cursorDot.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--gold, #c9a84c);
    transform: translate(-50%, -50%);
  `;

  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .room-card, .amenity-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.borderColor = 'rgba(201,168,76,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.borderColor = 'rgba(201,168,76,0.6)';
    });
  });

  /* ---- Language Switching ---- */
  const langBtns = document.querySelectorAll('.lang-btn');
  const htmlTag = document.documentElement;
  
  function setLanguage(lang) {
    htmlTag.setAttribute('lang', lang);
    htmlTag.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    htmlTag.setAttribute('data-lang', lang);
    
    // Update active class on buttons
    langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang-btn') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Translate texts
    const elementsToTranslate = document.querySelectorAll('[data-ar][data-en]');
    elementsToTranslate.forEach(el => {
      if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
         el.placeholder = el.getAttribute(`data-${lang}`);
      } else if (el.tagName.toLowerCase() === 'title') {
         document.title = el.getAttribute(`data-${lang}`);
      } else {
         el.innerHTML = el.getAttribute(`data-${lang}`);
      }
    });
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang-btn');
      setLanguage(lang);
    });
  });

  console.log('%c🏨 REGAL PALACE HOTEL', 'color:#c9a84c; font-size:20px; font-weight:bold;');
  console.log('%cWebsite loaded successfully ✦', 'color:#c9a84c; font-size:14px;');
});
