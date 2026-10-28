/* Contact form validation and request handling. No HTML is built from input. */
(() => {
  const { select, selectAll } = window.Portfolio;
  const REQUEST_TIMEOUT_MS = 12000;

  /** Return a useful message for the first broken constraint. */
  function validationMessage(field) {
    const value = field.value.trim();

    if (!value) return 'This field is required.';
    if (field.type === 'email' && field.validity.typeMismatch) {
      return 'Enter a valid email address.';
    }
    if (field.minLength > 0 && value.length < field.minLength) {
      return `Use at least ${field.minLength} characters.`;
    }
    if (field.maxLength > 0 && value.length > field.maxLength) {
      return `Use no more than ${field.maxLength} characters.`;
    }

    return '';
  }

  function validateField(field) {
    const message = validationMessage(field);
    field.setAttribute('aria-invalid', String(Boolean(message)));
    document.getElementById(`${field.id}-error`).textContent = message;
    return !message;
  }

  function failureMessage(error) {
    if (error.message === 'rate-limit') {
      return 'Too many requests. Please try later or use the direct email link.';
    }
    if (error.name === 'AbortError') {
      return 'The request timed out. Your message is still here; please try again or email me directly.';
    }
    return 'The message could not be sent. Your message is still here; please try again or email kefasetikufrancis@gmail.com.';
  }

  window.Portfolio.initContactForm = function initContactForm() {
    const form = select('#contactForm');
    if (!form) return; // Resume and case-study pages do not contain a form.

    const fields = selectAll('[required]', form);
    const note = select('#formNote', form);
    const submitButton = select('#submitBtn', form);
    let pending = false;

    function setSubmitting(isSubmitting) {
      pending = isSubmitting;
      submitButton.disabled = isSubmitting;
      submitButton.textContent = isSubmitting ? 'Sending…' : 'Send message ↗';
    }

    function validateForm() {
      const validity = fields.map(validateField);
      const firstInvalid = validity.indexOf(false);
      if (firstInvalid === -1) return true;

      note.textContent = 'Please correct the highlighted fields before sending.';
      fields[firstInvalid].focus();
      return false;
    }

    async function sendMessage() {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      setSubmitting(true);
      note.textContent = 'Sending your message…';

      try {
        const payload = Object.fromEntries(fields.map((field) => [field.name, field.value.trim()]));
        const response = await fetch(form.dataset.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
          credentials: 'omit',
        });

        if (!response.ok) {
          throw new Error(response.status === 429 ? 'rate-limit' : 'server');
        }

        note.textContent = 'Your message was accepted. Thank you for getting in touch.';
        form.reset();
        fields.forEach((field) => field.removeAttribute('aria-invalid'));
      } catch (error) {
        // Preserve entered text so the visitor can retry or use direct email.
        note.textContent = failureMessage(error);
      } finally {
        clearTimeout(timeout);
        setSubmitting(false);
      }
    }

    fields.forEach((field) => {
      field.addEventListener('blur', () => validateField(field));
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (pending || !validateForm()) return;

      // This browser-side honeypot supplements server-side spam controls.
      if (form.elements.website.value) {
        note.textContent = 'Please use the direct email link to get in touch.';
        return;
      }

      await sendMessage();
    });
  };
})();
