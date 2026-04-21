/* ============================================
   KK Hosting — Form Handling
   ============================================ */

function initContactForm(formId = 'contact-form') {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      removeError(field);
      if (!field.value.trim()) {
        showError(field, 'This field is required');
        isValid = false;
      } else if (field.type === 'email' && !isValidEmail(field.value)) {
        showError(field, 'Please enter a valid email address');
        isValid = false;
      }
    });

    if (!isValid) return;

    // Simulate submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      // Show success state
      form.style.display = 'none';
      const successEl = document.getElementById('form-success');
      if (successEl) {
        successEl.classList.add('show');
      }
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });

  // Live validation on blur
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('blur', () => {
      removeError(field);
      if (field.hasAttribute('required') && !field.value.trim()) {
        showError(field, 'This field is required');
      } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        showError(field, 'Please enter a valid email address');
      }
    });

    field.addEventListener('input', () => {
      removeError(field);
    });
  });
}

function initPropertyForm() {
  initContactForm('property-form');
}

function showError(field, message) {
  field.style.borderColor = '#e74c3c';
  const error = document.createElement('span');
  error.className = 'form-error';
  error.textContent = message;
  error.style.cssText = 'color: #e74c3c; font-size: 0.75rem; margin-top: 4px; display: block;';
  field.parentNode.appendChild(error);
}

function removeError(field) {
  field.style.borderColor = '';
  const error = field.parentNode.querySelector('.form-error');
  if (error) error.remove();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
