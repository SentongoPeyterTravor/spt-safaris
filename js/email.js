// ===== SPT SAFARIS — email.js =====
// EmailJS contact form handler

// EmailJS configuration
const EMAIL_CONFIG = {
  serviceID: 'service_6nh3yus',
  templateID: 'whid7mq',
  publicKey: '8UWn_cLv8ZLgpPiOT'
};

// Initialize EmailJS
function initEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAIL_CONFIG.publicKey);
    console.log('EmailJS initialized successfully');
    return true;
  }
  console.error('EmailJS SDK not loaded');
  return false;
}

// Show form message
function showFormMessage(form, message, isSuccess = true) {
  const msgElement = form.querySelector('.form-msg');
  if (msgElement) {
    msgElement.textContent = message;
    msgElement.style.color = isSuccess ? '#127a3d' : '#b42318';
  }
}

// Reset button state
function resetButtonState(button, originalText) {
  if (button) {
    button.disabled = false;
    button.innerHTML = originalText;
  }
}

// Handle contact form submission
function handleContactForm(form) {
  const msg = form.querySelector('.form-msg');
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

  // Validate EmailJS availability
  if (!window.emailjs || typeof emailjs.sendForm !== 'function') {
    console.error('EmailJS SDK not loaded or sendForm unavailable', window.emailjs);
    showFormMessage(form, 'Email service is not available. Please try again later.', false);
    resetButtonState(submitBtn, originalBtnText);
    return;
  }

  // Show loading state
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  }

  // Clear previous messages
  if (msg) {
    msg.textContent = '';
    msg.style.color = '#127a3d';
  }

  // Send email
  emailjs.sendForm(EMAIL_CONFIG.serviceID, EMAIL_CONFIG.templateID, form)
    .then((result) => {
      console.log('EmailJS success', result);
      showFormMessage(form, 'Thank you! Your message has been sent successfully.');
      form.reset();
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      showFormMessage(form, 'Sorry, your message could not be sent right now. Please try again later.', false);
    })
    .finally(() => {
      resetButtonState(submitBtn, originalBtnText);
    });
}

// Initialize contact form handler
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleContactForm(this);
    });
    console.log('Contact form handler initialized');
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initEmailJS();
  initContactForm();
});

// Export for manual initialization if needed
window.SPTEmail = {
  initEmailJS,
  handleContactForm,
  initContactForm,
  config: EMAIL_CONFIG
};