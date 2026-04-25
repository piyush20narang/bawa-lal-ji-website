/* ============================================
   GLOBAL JAVASCRIPT — SHRI BAWA LAL JI WEBSITE
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Navbar Scroll Effect ----------
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---------- Mobile Menu ----------
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---------- Scroll Reveal Animations ----------
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- Active Page Highlighting ----------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ---------- Floating Particles (Hero) ----------
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (5 + Math.random() * 6) + 's';
      particle.style.width = (2 + Math.random() * 4) + 'px';
      particle.style.height = particle.style.width;
      particlesContainer.appendChild(particle);
    }
  }

  // ---------- Lightbox ----------
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    let galleryImages = [];
    let currentImageIndex = 0;

    document.querySelectorAll('.gallery-item').forEach((item, index) => {
      const img = item.querySelector('img');
      galleryImages.push(img.src);
      item.addEventListener('click', () => {
        currentImageIndex = index;
        lightboxImg.src = galleryImages[currentImageIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex];
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex];
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
      if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
    });
  }

  // ---------- Bhajan Accordion ----------
  document.querySelectorAll('.bhajan-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.bhajan-item');
      const lyrics = item.querySelector('.bhajan-lyrics');
      const isOpen = lyrics.classList.contains('open');

      // Close all
      document.querySelectorAll('.bhajan-lyrics').forEach(l => l.classList.remove('open'));
      document.querySelectorAll('.bhajan-toggle').forEach(b => b.textContent = '▼');

      if (!isOpen) {
        lyrics.classList.add('open');
        btn.textContent = '▲';
      }
    });
  });

  // ---------- Copy to Clipboard ----------
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.dataset.copy;
      navigator.clipboard.writeText(textToCopy).then(() => {
        btn.classList.add('copied');
        btn.textContent = '✓';
        showToast('Copied to clipboard!');
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.textContent = '📋';
        }, 2000);
      });
    });
  });

  // ---------- Contact Form Validation ----------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.');
        return;
      }

      if (!isValidEmail(email)) {
        showToast('Please enter a valid email address.');
        return;
      }

      showToast('<img src="images/tilak.jpg" alt="Tilak" class="tilak-icon-inline"> Thank you for your message! We will respond soon.');
      contactForm.reset();
    });
  }

  // ---------- Gallery Filters ----------
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.gallery-item').forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ---------- Story Chapter Nav Highlight ----------
  const chapters = document.querySelectorAll('.chapter');
  const storyNavLinks = document.querySelectorAll('.story-nav-list a');

  if (chapters.length > 0 && storyNavLinks.length > 0) {
    const chapterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          storyNavLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' });

    chapters.forEach(ch => chapterObserver.observe(ch));
  }

  // ---------- Background Music ----------
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');

  if (bgMusic && musicToggle) {
    const musicIcon = musicToggle.querySelector('.icon');
    
    const playMusic = () => {
      bgMusic.play().then(() => {
        musicToggle.classList.add('playing');
        musicIcon.textContent = '🔊';
      }).catch(error => {
        console.log("Autoplay blocked or failed:", error);
      });
    };

    const pauseMusic = () => {
      bgMusic.pause();
      musicToggle.classList.remove('playing');
      musicIcon.textContent = '🔈';
    };

    musicToggle.addEventListener('click', () => {
      if (bgMusic.paused) {
        playMusic();
      } else {
        pauseMusic();
      }
    });

    // 1. Attempt immediate autoplay
    playMusic();

    // 2. Fallback: Handle initial interaction to start audio if blocked
    const startAudioOnInteraction = () => {
      if (bgMusic.paused) {
        playMusic();
      }
      document.removeEventListener('click', startAudioOnInteraction);
      document.removeEventListener('keydown', startAudioOnInteraction);
      document.removeEventListener('touchstart', startAudioOnInteraction);
    };

    document.addEventListener('click', startAudioOnInteraction);
    document.addEventListener('keydown', startAudioOnInteraction);
    document.addEventListener('touchstart', startAudioOnInteraction);
  }
});

// ---------- Helpers ----------
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Language Switcher Logic
document.addEventListener('DOMContentLoaded', () => {
  // Set default language to Hindi, or load from localStorage
  const currentLang = localStorage.getItem('bawa_lal_lang') || 'hi';
  document.documentElement.lang = currentLang;
  
  // Find all language toggles (we might have one in mobile nav and one in desktop nav)
  const langToggles = document.querySelectorAll('.lang-toggle');
  
  const updateToggleUI = (lang) => {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  };

  updateToggleUI(currentLang);

  langToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (e.target.classList.contains('lang-btn')) {
        const newLang = e.target.dataset.lang;
        document.documentElement.lang = newLang;
        localStorage.setItem('bawa_lal_lang', newLang);
        updateToggleUI(newLang);
        
        // update document title dynamically if needed, 
        // but for simplicity the CSS will handle the visibility of content.
      }
    });
  });
});
