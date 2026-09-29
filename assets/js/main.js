/**
 * AURELIA — RESTAURANT JAVASCRIPT SYSTEM
 * Strictly Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 01. INITIALIZATION & SETUP
  // --------------------------------------------------------------------------
  initScrollProgress();
  initCustomCursor();
  initStickyHeader();
  initMobileNav();
  initPageTransitions();
  initScrollReveals();
  initMenuTabs();
  initGallerySystem();
  initFormSubmissions();
  initHorizontalScroll();
  initBackToTop();
  initCookieBanner();
  initNewsletter();
  initParallax();
  initSpecialBar();
  initMenuSearch();
  initTeamCards();
});

/* --------------------------------------------------------------------------
   02. SCROLL PROGRESS BAR
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    }
  });
}

/* --------------------------------------------------------------------------
   03. CUSTOM CURSOR & MAGNETIC EFFECT
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  // Custom cursor circle disabled as requested. Default browser cursor enabled.
  // Magnetic Button Effect
  const magneticEls = document.querySelectorAll('[data-magnetic]');
  magneticEls.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate3d(0px, 0px, 0)';
    });
  });

  // 3D Card Interactive Tilt & Glow Tracking
  const tiltCards = document.querySelectorAll('.dish-card, .experience-card, .ingredient-item, .gallery-item');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale(1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* --------------------------------------------------------------------------
   04. STICKY HEADER & THEME ADAPTATION
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const isDarkPage = header.classList.contains('theme-dark');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 50) {
      if (isDarkPage) {
        header.classList.add('scrolled-dark');
      } else {
        header.classList.add('scrolled');
      }
    } else {
      header.classList.remove('scrolled', 'scrolled-dark');
    }
  });
}

/* --------------------------------------------------------------------------
   05. MOBILE NAVIGATION OVERLAY
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggle || !overlay) return;

  function toggleNav() {
    const isOpen = overlay.classList.contains('open');
    if (isOpen) {
      overlay.classList.remove('open');
      toggle.classList.remove('open');
      if (header) header.classList.remove('menu-open');
      document.body.style.overflow = '';
    } else {
      overlay.classList.add('open');
      toggle.classList.add('open');
      if (header) header.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
    }
  }

  toggle.addEventListener('click', toggleNav);

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      overlay.classList.remove('open');
      toggle.classList.remove('open');
      if (header) header.classList.remove('menu-open');
      document.body.style.overflow = '';
    });
  });
}

/* --------------------------------------------------------------------------
   06. PAGE TRANSITIONS
   -------------------------------------------------------------------------- */
function initPageTransitions() {
  const overlay = document.getElementById('page-transition');
  if (!overlay) return;

  // On page load fade out transition smoothly
  setTimeout(() => {
    overlay.classList.remove('active');
  }, 350);

  // Intercept local links
  const links = document.querySelectorAll('a[href]');
  links.forEach((link) => {
    const href = link.getAttribute('href');
    // Check if internal link
    if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('http')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        overlay.classList.add('active');
        setTimeout(() => {
          window.location.href = href;
        }, 350);
      });
    }
  });
}

/* --------------------------------------------------------------------------
   07. INTERSECTION OBSERVER SCROLL REVEALS
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe reveal elements
  document.querySelectorAll('.reveal-on-scroll, .stagger-parent, .image-mask-reveal').forEach((el) => {
    revealObserver.observe(el);
  });
}

/* --------------------------------------------------------------------------
   08. MENU CATEGORY TAB FILTERING
   -------------------------------------------------------------------------- */
function initMenuTabs() {
  const tabBtns = document.querySelectorAll('.menu-tab-btn');
  const sections = document.querySelectorAll('.menu-category-section');

  if (tabBtns.length === 0 || sections.length === 0) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      sections.forEach((sec) => {
        if (sec.id === `category-${category}` || category === 'all') {
          sec.classList.add('active');
        } else {
          sec.classList.remove('active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   09. GALLERY MASONRY FILTERING & LIGHTBOX SYSTEM
   -------------------------------------------------------------------------- */
function initGallerySystem() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox-modal');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        galleryItems.forEach((item) => {
          const itemCat = item.getAttribute('data-category');
          if (filter === 'all' || itemCat === filter) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Lightbox Implementation
  if (!lightbox) return;

  const lbImage = lightbox.querySelector('.lightbox-image');
  const lbCaption = lightbox.querySelector('.lightbox-caption');
  const lbClose = lightbox.querySelector('.lightbox-close');
  const lbPrev = lightbox.querySelector('.lightbox-prev');
  const lbNext = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  const visibleItems = () => Array.from(galleryItems).filter((el) => el.style.display !== 'none');

  function openLightbox(index) {
    const items = visibleItems();
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    currentIndex = index;

    const item = items[currentIndex];
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-item-title');

    if (lbImage) lbImage.src = img.src;
    if (lbCaption) lbCaption.textContent = title ? title.textContent : '';

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const items = visibleItems();
      const index = items.indexOf(item);
      openLightbox(index);
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', () => openLightbox(currentIndex - 1));
  if (lbNext) lbNext.addEventListener('click', () => openLightbox(currentIndex + 1));

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox(currentIndex - 1);
    if (e.key === 'ArrowRight') openLightbox(currentIndex + 1);
  });
}

/* --------------------------------------------------------------------------
   10. FRONTEND FORM SUBMISSIONS (RESERVATIONS & CONTACT)
   -------------------------------------------------------------------------- */
function initFormSubmissions() {
  const resForm = document.getElementById('reservation-form');
  const contactForm = document.getElementById('contact-form');

  if (resForm) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formCard = resForm.closest('.form-card');
      const successOverlay = document.getElementById('reservation-success');

      if (formCard && successOverlay) {
        resForm.style.display = 'none';
        successOverlay.style.display = 'block';
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formCard = contactForm.closest('.form-card');
      const successOverlay = document.getElementById('contact-success');

      if (formCard && successOverlay) {
        contactForm.style.display = 'none';
        successOverlay.style.display = 'block';
      }
    });
  }
}

/* --------------------------------------------------------------------------
   11. HORIZONTAL SCROLL DRAG FOR INGREDIENTS
   -------------------------------------------------------------------------- */
function initHorizontalScroll() {
  const slider = document.querySelector('.ingredient-scroll-wrapper');
  if (!slider) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
}

/* --------------------------------------------------------------------------
   12. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  const waBtn = document.getElementById('whatsapp-float-btn') || document.querySelector('.whatsapp-float');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      if (backToTopBtn) backToTopBtn.classList.add('visible');
      if (waBtn) waBtn.classList.add('shift-up');
    } else {
      if (backToTopBtn) backToTopBtn.classList.remove('visible');
      if (waBtn) waBtn.classList.remove('shift-up');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* --------------------------------------------------------------------------
   13. COOKIE CONSENT GDPR BANNER
   -------------------------------------------------------------------------- */
function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  // Only show if consent not already given
  const cookieConsent = localStorage.getItem('aurelia-cookie-consent');
  if (cookieConsent) return;

  // Delay showing banner slightly after page load
  setTimeout(() => {
    banner.classList.add('show');
  }, 1800);

  const acceptBtn = document.getElementById('cookie-accept');
  const declineBtn = document.getElementById('cookie-decline');

  function dismissBanner(accepted) {
    banner.classList.remove('show');
    localStorage.setItem('aurelia-cookie-consent', accepted ? 'accepted' : 'declined');
    // After transition, remove from layout flow
    banner.addEventListener('transitionend', () => {
      banner.style.display = 'none';
    }, { once: true });
  }

  if (acceptBtn) acceptBtn.addEventListener('click', () => dismissBanner(true));
  if (declineBtn) declineBtn.addEventListener('click', () => dismissBanner(false));
}

/* --------------------------------------------------------------------------
   14. NEWSLETTER POPUP
   -------------------------------------------------------------------------- */
function initNewsletter() {
  const overlay = document.getElementById('newsletter-overlay');
  if (!overlay) return;

  // Don't show if already dismissed or subscribed
  const nlStatus = localStorage.getItem('aurelia-newsletter');
  if (nlStatus) return;

  const closeBtn     = document.getElementById('newsletter-close');
  const skipBtn      = document.getElementById('newsletter-skip');
  const form         = document.getElementById('newsletter-form');
  const formSection  = document.getElementById('newsletter-form-section');
  const successPanel = document.getElementById('newsletter-success');

  function openPopup() {
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closePopup(save) {
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    if (save) localStorage.setItem('aurelia-newsletter', 'dismissed');
  }

  // Show after 8 seconds of inactivity
  const popupTimer = setTimeout(openPopup, 8000);

  // Also show on exit-intent (desktop only)
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0) {
      clearTimeout(popupTimer);
      openPopup();
    }
  }, { once: true });

  // Close button
  if (closeBtn) closeBtn.addEventListener('click', () => closePopup(true));
  // Skip link
  if (skipBtn) skipBtn.addEventListener('click', () => closePopup(true));
  // Click outside
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePopup(true);
  });
  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('show')) closePopup(true);
  });

  // Form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      if (!emailInput || !emailInput.validity.valid) {
        emailInput.style.borderBottom = '2px solid #e74c3c';
        emailInput.focus();
        return;
      }
      // Show success state
      if (formSection) formSection.style.display = 'none';
      if (successPanel) successPanel.classList.add('show');
      localStorage.setItem('aurelia-newsletter', 'subscribed');
      // Auto-close after 3.5s
      setTimeout(() => closePopup(false), 3500);
    });
  }
}

/* --------------------------------------------------------------------------
   15. PARALLAX SCROLLING EFFECT
   -------------------------------------------------------------------------- */
function initParallax() {
  const parallaxEls = document.querySelectorAll('.hero-video-bg, .hero-video-fallback, .hero-bg, [data-parallax]');
  if (parallaxEls.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  function applyParallax() {
    const scrollY = window.scrollY;
    parallaxEls.forEach((el) => {
      const section = el.closest('section') || el.parentElement;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewH) return;

      const speed = parseFloat(el.getAttribute('data-parallax-speed') || '0.25');
      const offset = rect.top;
      const relPos = offset * speed * -1;
      const clamped = Math.max(-80, Math.min(80, relPos));
      el.style.transform = `translate3d(0, ${clamped}px, 0) scale(1.15)`;
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        applyParallax();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  applyParallax();
}

/* --------------------------------------------------------------------------
   16. TODAY'S SPECIAL ANNOUNCEMENT BAR
   -------------------------------------------------------------------------- */
function initSpecialBar() {
  const bar = document.getElementById('special-bar');
  if (!bar) return;

  const lastDismissed = localStorage.getItem('aurelia-special-bar-dismissed');
  const today = new Date().toDateString();
  if (lastDismissed === today) return;

  setTimeout(() => {
    bar.classList.add('show');
    document.body.classList.add('special-bar-active');
  }, 1200);

  const closeBtn = document.getElementById('special-bar-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      bar.classList.remove('show');
      document.body.classList.remove('special-bar-active');
      localStorage.setItem('aurelia-special-bar-dismissed', today);
    });
  }
}

/* --------------------------------------------------------------------------
   17. MENU SEARCH & LIVE FILTER
   -------------------------------------------------------------------------- */
function initMenuSearch() {
  const searchInput = document.getElementById('menu-search-input');
  const clearBtn    = document.getElementById('menu-search-clear');
  const countEl     = document.getElementById('menu-search-count');
  const noResults   = document.getElementById('menu-no-results');
  if (!searchInput) return;

  const allCards    = Array.from(document.querySelectorAll('.dish-card'));
  const allSections = Array.from(document.querySelectorAll('.menu-category-section'));

  function getSearchableText(card) {
    return [
      card.querySelector('.dish-title')?.textContent,
      card.querySelector('.dish-description')?.textContent,
      card.querySelector('.dish-ingredients')?.textContent,
      card.querySelector('.dish-price-badge')?.textContent,
      card.querySelector('.dish-badge')?.textContent,
    ].filter(Boolean).join(' ').toLowerCase();
  }

  function performSearch(query) {
    const q = query.trim().toLowerCase();
    if (clearBtn) clearBtn.classList.toggle('show', q.length > 0);

    if (q === '') {
      allCards.forEach(c => c.classList.remove('search-hidden'));
      allSections.forEach(s => s.classList.remove('search-empty'));
      if (countEl) countEl.textContent = '';
      if (noResults) noResults.classList.remove('show');
      return;
    }

    let totalVisible = 0;
    allCards.forEach(card => {
      const matches = getSearchableText(card).includes(q);
      card.classList.toggle('search-hidden', !matches);
      if (matches) totalVisible++;
    });

    allSections.forEach(section => {
      const visibleInSection = section.querySelectorAll('.dish-card:not(.search-hidden)').length;
      section.classList.toggle('search-empty', visibleInSection === 0);
      if (visibleInSection > 0) section.classList.add('active');
    });

    if (countEl) {
      countEl.textContent = totalVisible > 0
        ? `${totalVisible} dish${totalVisible !== 1 ? 'es' : ''}`
        : '';
    }

    if (noResults) noResults.classList.toggle('show', totalVisible === 0);
  }

  searchInput.addEventListener('input', () => performSearch(searchInput.value));

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      performSearch('');
      searchInput.focus();
    });
  }

  // Press "/" to focus search bar
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });
}

/* --------------------------------------------------------------------------
   18. TEAM CARDS — TOUCH / MOBILE TAP TO FLIP
   -------------------------------------------------------------------------- */
function initTeamCards() {
  const cards = document.querySelectorAll('.team-card');
  if (cards.length === 0) return;

  // Only apply tap logic on touch devices
  const isTouchDevice = window.matchMedia('(hover: none)').matches;
  if (!isTouchDevice) return;

  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      // Toggle flipped state
      const isFlipped = card.classList.contains('flipped');

      // Unflip all other cards first
      cards.forEach(c => c.classList.remove('flipped'));

      if (!isFlipped) {
        card.classList.add('flipped');
      }
    });
  });

  // Tap outside any card to unflip all
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.team-card')) {
      cards.forEach(c => c.classList.remove('flipped'));
    }
  });
}

