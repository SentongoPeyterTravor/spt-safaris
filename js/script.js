// ===== SPT SAFARIS — main.js =====

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.topbar-links span, .foot-contact span, .cinfo-item span').forEach(detail => {
    const value = detail.textContent.trim();
    if(value.includes('@')){
      detail.innerHTML = `<a href="mailto:${value}">${value}</a>`;
    } else if(value.match(/\+256/)){
      const phone = value.match(/\+256\s*700\s*511\s*775|\+256\s*778\s*487\s*475/)?.[0]?.replace(/\s/g, '') || '';
      if(phone) detail.innerHTML = `<a href="tel:${phone}">${value}</a>`;
    }
  });

  // Active nav-link highlighting
  const page = (location.pathname.split('/').pop() || 'index.html').replace('.html','') || 'index';
  const destinationPages = ['bwindi', 'queen-elizabeth', 'masai-mara', 'serengeti', 'murchison-falls', 'rwenzori-mountains', 'lake-mburo', 'volcanoes'];
  const navPage = destinationPages.includes(page) ? 'destinations' : page;
  document.querySelectorAll('.nav-links').forEach(nav => {
    const destinationsLink = nav.querySelector('a[href="destinations.html"]');
    const toursItem = nav.querySelector('.dropdown');
    if(destinationsLink && toursItem) nav.insertBefore(destinationsLink, toursItem);
    nav.querySelectorAll('a[href="community.html"], a[href="gallery.html"], a[href="blog.html"]').forEach(link => link.remove());
  });
  document.querySelectorAll('.nav-links > a[data-nav], .nav-links .dropdown > a[data-nav]').forEach(link=>{
    if(link.dataset.nav === navPage) link.classList.add('active');
  });

  // Add the shared conversion strip to pages that do not already include one.
  if(!document.querySelector('.cta-wrap')){
    const footer = document.querySelector('.footer');
    if(footer){
      const cta = document.createElement('section');
      cta.className = 'cta-wrap footer-cta';
      cta.innerHTML = '<div class="container"><div class="cta-strip"><div><h3>Ready to plan your safari?</h3><p>Talk to our safari consultants and get a free, no-obligation itinerary today.</p></div><a href="contact.html" class="btn" style="background:#fff;color:var(--orange-600);"><i class="fa-solid fa-phone"></i> Get in Touch</a></div></div>';
      footer.before(cta);
    }
  }

  // Mobile nav toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if(hamburger){
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  }
  // mobile dropdown toggle
  document.querySelectorAll('.nav-links .dropdown > a').forEach(link=>{
    link.addEventListener('click', (e)=>{
      if(window.innerWidth <= 780){
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  const heroSlideshow = document.querySelector('.hero-slideshow');
  if(heroSlides.length > 1){
    let activeSlide = 0;
    let heroTimer;
    const showHeroSlide = index => {
      activeSlide = (index + heroSlides.length) % heroSlides.length;
      heroSlides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === activeSlide));
      heroDots.forEach((dot, dotIndex) => {
        const selected = dotIndex === activeSlide;
        dot.classList.toggle('is-active', selected);
        dot.setAttribute('aria-selected', String(selected));
      });
    };
    const restartHeroTimer = () => {
      clearInterval(heroTimer);
      heroTimer = setInterval(() => showHeroSlide(activeSlide + 1), 6000);
    };
    document.querySelector('.hero-prev')?.addEventListener('click', () => { showHeroSlide(activeSlide - 1); restartHeroTimer(); });
    document.querySelector('.hero-next')?.addEventListener('click', () => { showHeroSlide(activeSlide + 1); restartHeroTimer(); });
    heroDots.forEach(dot => dot.addEventListener('click', () => { showHeroSlide(Number(dot.dataset.slideTo)); restartHeroTimer(); }));
    heroSlideshow.addEventListener('mouseenter', () => clearInterval(heroTimer));
    heroSlideshow.addEventListener('mouseleave', restartHeroTimer);
    heroSlideshow.addEventListener('focusin', () => clearInterval(heroTimer));
    heroSlideshow.addEventListener('focusout', restartHeroTimer);
    restartHeroTimer();
  }

  // Shrink the sticky navigation while scrolling down and restore it when scrolling up.
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;
  const updateNavbar = () => {
    const currentScrollY = window.scrollY;
    if(navbar){
      const scrollDelta = currentScrollY - lastScrollY;
      if(currentScrollY < 50){
        navbar.classList.remove('nav-shrunk');
      } else if(scrollDelta > 4){
        navbar.classList.add('nav-shrunk');
      } else if(scrollDelta < -4){
        navbar.classList.remove('nav-shrunk');
      }
    }
    lastScrollY = currentScrollY;
  };

  // Back to top button
  const totop = document.querySelector('.totop');
  window.addEventListener('scroll', () => {
    updateNavbar();
    if(totop){
      if(window.scrollY > 400) totop.classList.add('show');
      else totop.classList.remove('show');
    }
  });
  if(totop){
    totop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
  }

  // Animated counters
  const stats = document.querySelectorAll('.stat h3[data-count]');
  const animateCount = (el) => {
    const target = +el.dataset.count;
    let count = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const tick = () => {
      count += step;
      if(count >= target){ el.textContent = target + (el.dataset.suffix||''); return; }
      el.textContent = count + (el.dataset.suffix||'');
      requestAnimationFrame(tick);
    };
    tick();
  };
  if(stats.length){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, {threshold:.4});
    stats.forEach(s=>obs.observe(s));
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(q=>{
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('active'));
      if(!wasActive) item.classList.add('active');
    });
  });

  // Gallery filter
  const filterBtns = document.querySelectorAll('.gallery-filter button');
  const galleryImgs = document.querySelectorAll('.gallery-grid img');
  filterBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filterBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      galleryImgs.forEach(img=>{
        img.style.display = (cat==='all' || img.dataset.cat===cat) ? 'block' : 'none';
      });
    });
  });

  // Newsletter + contact + booking forms (demo handlers)
  // Note: Contact form is now handled by js/email.js
  document.querySelectorAll('form[data-demo]').forEach(form=>{
    if(form.id === 'contact-form') return;

    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const msg = form.querySelector('.form-msg');
      if(msg){
        msg.textContent = "Thank you! Your request has been received — our safari team will reach out shortly.";
        msg.style.color = "#127a3d";
      } else {
        alert("Thank you! We will get back to you shortly.");
      }
      form.reset();
    });
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in'); revealObs.unobserve(e.target); }
    });
  }, {threshold:.15});
  reveals.forEach(r=>revealObs.observe(r));

  // WhatsApp widget toggle
  const whatsappToggle = document.querySelector('.whatsapp-toggle');
  const whatsappPopup = document.querySelector('.whatsapp-popup');
  const closeChat = document.querySelector('.close-chat');
  
  if(whatsappToggle && whatsappPopup){
    whatsappToggle.addEventListener('click', () => {
      whatsappPopup.classList.toggle('open');
    });
    
    if(closeChat){
      closeChat.addEventListener('click', () => {
        whatsappPopup.classList.remove('open');
      });
    }
    
    // Close popup when clicking outside
    document.addEventListener('click', (e) => {
      if(!e.target.closest('.whatsapp-widget')){
        whatsappPopup.classList.remove('open');
      }
    });
  }

});
