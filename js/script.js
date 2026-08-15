// ===== SPT SAFARIS — main.js =====

document.addEventListener('DOMContentLoaded', () => {

  // Active nav-link highlighting
  const page = (location.pathname.split('/').pop() || 'index.html').replace('.html','') || 'index';
  document.querySelectorAll('.nav-links > a[data-nav], .nav-links .dropdown > a[data-nav]').forEach(link=>{
    if(link.dataset.nav === page) link.style.color = 'var(--green-700)';
  });

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

  // Sticky nav shadow on scroll + back to top button
  const totop = document.querySelector('.totop');
  window.addEventListener('scroll', () => {
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
