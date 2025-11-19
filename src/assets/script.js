document.addEventListener('DOMContentLoaded', () => {
          

      // =========================
//  MOBILE MENU ELEMENTS FIX
// =========================

const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const menuIconPath = document.getElementById("menu-path");

// Если чего-то нет — не ломаем страницу
if (mobileMenuButton && mobileMenu && menuIconPath) {
    
    const toggleMobileMenu = (open) => {
        mobileMenu.classList.toggle("translate-y-0", open);
        mobileMenu.classList.toggle("-translate-y-full", !open);

        menuIconPath.setAttribute(
            "d",
            open
            ? "M6 18L18 6M6 6l12 12"   // крестик
            : "M4 6h16M4 12h16m-7 6h7" // бургер
        );

        document.body.style.overflow = open ? "hidden" : "";
    };

    mobileMenuButton.addEventListener("click", () => {
        toggleMobileMenu(!mobileMenu.classList.contains("translate-y-0"));
    });

    // Закрытие при клике по ссылке
    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => toggleMobileMenu(false));
    });

    // Закрытие при клике вне меню
    document.addEventListener("click", (e) => {
        const isOpen = mobileMenu.classList.contains("translate-y-0");
        if (isOpen && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            toggleMobileMenu(false);
        }
    });
}

  });

  document.addEventListener('DOMContentLoaded', () => {
    const contactButton = document.querySelector('#main-header .hidden.md\\:block a.border');
    const scrollThreshold = 100;

    const updateButtonStyle = () => {
      if (window.scrollY > scrollThreshold) {
        contactButton.classList.add('scrolled-button');
      } else {
        contactButton.classList.remove('scrolled-button');
      }
    };

    window.addEventListener('scroll', updateButtonStyle);
  });

  const observerOptions = {
  threshold: 0.2 
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target); 
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

document.querySelectorAll('.fade-in, .slide-in-bottom').forEach(el => {
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
        const slider = document.getElementById('testimonial-slider');
        // Если элемент не найден, выходим
        if (!slider) return; 

        const slides = Array.from(slider.children);
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const dotNav = document.getElementById('dot-navigation');

        let currentIndex = 0;

        // 1. Инициализация точек навигации
        dotNav.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            // Используем новые классы
            dot.className = 'dot w-3 h-3 bg-white/50 rounded-full cursor-pointer hover:bg-energy-purple transition-colors duration-300';
            dot.addEventListener('click', () => goToSlide(i));
            dotNav.appendChild(dot);
        });
        const dots = Array.from(dotNav.children);

        const updateSlider = () => {
    // Ширина родительского элемента (видимая область)
    const containerWidth = slider.parentElement.offsetWidth; 
    
    // Получаем стили первого слайда для точного расчета margin
    const slideStyle = getComputedStyle(slides[0]);
    const slideMarginLeft = parseFloat(slideStyle.marginLeft);
    const slideMarginRight = parseFloat(slideStyle.marginRight);
    
    // Полная ширина одного слайда, на которую нужно сдвигаться
    const slideWidth = slides[0].offsetWidth + slideMarginLeft + slideMarginRight;

    // Базовый сдвиг и поправка для центрирования
    const baseOffset = slideWidth * currentIndex;
    const centeringAdjustment = (containerWidth - slideWidth) / 2;
    const finalTranslateX = baseOffset - centeringAdjustment;
    
    // 1. Применяем transform для сдвига
    slider.style.transform = `translateX(-${finalTranslateX}px)`;

    // 2. Логика АКТИВНОСТИ СЛАЙДОВ (для CSS стилей scale/filter)
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
        slide.classList.toggle('inactive', i !== currentIndex);
    });

    // 3. Обновление классов активности точек
    dots.forEach((dot, i) => {
        dot.classList.toggle('bg-electric-gold', i === currentIndex);
        dot.classList.toggle('bg-white/50', i !== currentIndex);
    });
};

        const goToSlide = (index) => {
            currentIndex = index;
            // Логика зацикливания
            if (currentIndex < 0) currentIndex = slides.length - 1;
            if (currentIndex >= slides.length) currentIndex = 0;
            updateSlider();
        };

        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

        // Инициализация
        updateSlider(); 
        window.addEventListener('resize', updateSlider);

        // Автоматическое переключение
        const autoSlideInterval = 4500; 
        let autoSlide = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, autoSlideInterval);

        // Сброс таймера при взаимодействии
        [prevBtn, nextBtn, ...dots].forEach(el => {
            el.addEventListener('click', () => {
                clearInterval(autoSlide);
                autoSlide = setInterval(() => goToSlide(currentIndex + 1), autoSlideInterval);
            });
        });
    });

    // News Intersection Observer JS (Kept)
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".animate-on-scroll");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
});

 // Lightweight visual "online" ticker (purely cosmetic)
  const onlineSpans = {
    mystic: { base: 3500, jitter: 60 },
    poker:  { base: 8100, jitter: 120 },
    galactic:{ base: 1200, jitter: 40 }
  };
  function tickOnline() {
    Object.entries(onlineSpans).forEach(([key, {base, jitter}]) => {
      const el = document.querySelector(`[data-online="${key}"]`);
      if (!el) return;
      const delta = Math.floor((Math.random() - 0.5) * jitter);
      const value = Math.max(1, base + delta);
      el.textContent = new Intl.NumberFormat('en-CA').format(value) + ' online';
    });
  }
  tickOnline();
  setInterval(tickOnline, 5000);


  document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      item.addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        item.classList.toggle('active');

        if (item.classList.contains('active')) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          icon.classList.add('rotate-45');
        } else {
          answer.style.maxHeight = '0';
          icon.classList.remove('rotate-45');
        }
      });
    });

    // Optional: collapse all on page load (ensure consistent start)
    faqItems.forEach(i => {
      const ans = i.querySelector('.faq-answer');
      if (ans) ans.style.maxHeight = '0';
    });
  });




document.getElementById('footer-year').textContent = new Date().getFullYear();
    const footerForm = document.getElementById('footer-newsletter');
    const footerEmail = document.getElementById('footer-email');
    const footerSuccess = document.getElementById('footer-news-success');

    footerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      footerSuccess.style.opacity = '1';
      footerEmail.value = '';
      setTimeout(() => {
        footerSuccess.style.opacity = '0';
      }, 4000);
    });

    // COOKIE BANNER
// COOKIE BANNER (SAFE REMOVE VERSION)
document.addEventListener("DOMContentLoaded", () => {
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookies-accept");
  const declineBtn = document.getElementById("cookies-decline");

  if (!cookieBanner) return;

  // Показать баннер, если ещё нет выбора
  if (!localStorage.getItem("cookieConsent")) {
      setTimeout(() => {
          cookieBanner.classList.remove("opacity-0", "translate-y-6");
      }, 300);
  } else {
      // Если выбор уже был → полностью удалить из DOM
      cookieBanner.remove();
      return;
  }

  const destroyBanner = () => {
      cookieBanner.style.pointerEvents = "none"; // ← на всякий случай
      cookieBanner.classList.add("opacity-0", "translate-y-6");

      // удалить элемент полностью после анимации
      setTimeout(() => {
          cookieBanner.remove();
      }, 350);
  };

  acceptBtn?.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "accepted");
      destroyBanner();
  });

  declineBtn?.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "declined");
      destroyBanner();
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const ageBanner = document.getElementById("age-banner");
  const ageClose  = document.getElementById("age-close");
  const ageOk     = document.getElementById("age-ok");
  const ageLater  = document.getElementById("age-later");
  const cookieBanner = document.getElementById("cookie-banner");

  /* ===========================
     1. ПРОВЕРКА localStorage
  ============================ */

  // Если уже согласился → не показывать баннер
  if (localStorage.getItem("ageVerified") === "yes") {
      if (ageBanner) ageBanner.remove();
      return;
  }

  // Если отказался → тоже убрать баннер
  if (localStorage.getItem("ageVerified") === "no") {
      if (ageBanner) ageBanner.remove();
      return;
  }

  /* ===========================
     2. ПОКАЗ БАННЕРА
  ============================ */

  setTimeout(() => {
      ageBanner.classList.remove("opacity-0", "translate-y-4");
  }, 500);

  /* ===========================
     3. СМЕЩЕНИЕ НАД COOKIES
  ============================ */

  const adjustAgeBanner = () => {
      if (!cookieBanner) return;

      const cookieVisible =
          window.getComputedStyle(cookieBanner).opacity === "1" &&
          cookieBanner.getBoundingClientRect().height > 20;

      if (cookieVisible) {
          ageBanner.style.bottom = (cookieBanner.offsetHeight + 40) + "px";
      } else {
          ageBanner.style.bottom = "120px";
      }
  };

  let checks = 0;
  const interval = setInterval(() => {
      adjustAgeBanner();
      checks++;
      if (checks > 15) clearInterval(interval);
  }, 150);

  window.addEventListener("resize", adjustAgeBanner);

  /* ===========================
     4. ФУНКЦИИ ЗАКРЫТИЯ
  ============================ */

  const closeAge = () => {
      ageBanner.classList.add("opacity-0", "translate-y-4");
      setTimeout(() => ageBanner.remove(), 400);
  };

  /* ===========================
     5. ОБРАБОТКА КНОПОК
  ============================ */

  if (ageOk) {
      ageOk.addEventListener("click", () => {
          localStorage.setItem("ageVerified", "yes");   // ← ЗАПОМИНАЕМ
          closeAge();
      });
  }

  if (ageClose) {
      ageClose.addEventListener("click", () => {
          localStorage.setItem("ageVerified", "no");    // ← ЗАПОМИНАЕМ
          closeAge();
      });
  }

  if (ageLater) {
      ageLater.addEventListener("click", () => {
          localStorage.setItem("ageVerified", "no");    // ← ЗАПОМИНАЕМ
          window.location.href = "https://google.com";
      });
  }
});


// bg video player
document.addEventListener("DOMContentLoaded", () => {
  const preview = document.getElementById("hero-preview-video");
  const playBtn = document.getElementById("hero-video-play");

  const floating = document.getElementById("floating-video");
  const player = document.getElementById("floating-video-player");

  if (!preview || !playBtn || !floating || !player) return;

  // Открытие плавающего видео
  playBtn.addEventListener("click", () => {
  
    floating.classList.remove("opacity-0", "pointer-events-none", "scale-75");
    floating.classList.add("opacity-100", "scale-100");

    player.currentTime = 0;
    player.play();
  });


  // Функция закрытия
  const closeFloating = () => {
    floating.classList.add("opacity-0", "pointer-events-none", "scale-75");
    floating.classList.remove("opacity-100", "scale-100");
    player.pause();
  };

  // Клик по фону
  document.addEventListener("click", (e) => {
    if (!floating.contains(e.target) && !playBtn.contains(e.target)) {
      closeFloating();
    }
  });

  // ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeFloating();
  });

  // Скролл закрывает
  window.addEventListener("scroll", () => {
    closeFloating();
  });
});

