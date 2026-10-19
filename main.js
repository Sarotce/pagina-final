'use strict';

(() => {
  const form = document.getElementById('contactForm');
  const fields = document.getElementById('formFields');
  const success = document.getElementById('contactSuccess');
  const nameInput = document.getElementById('nombre');
  const communityInput = document.getElementById('barrio');
  const addressInput = document.getElementById('direccion');
  const phoneInput = document.getElementById('telefono');
  const messageInput = document.getElementById('mensaje');
  const checklistInput = document.getElementById('checklist');
  const whatsappLink = document.getElementById('sendWhatsapp');
  const emailLink = document.getElementById('sendEmail');
  const editButton = document.getElementById('editMessage');
  const currentYear = document.getElementById('currentYear');
  const menu = document.getElementById('menuPrincipal');
  const formInputs = [nameInput, communityInput, addressInput, phoneInput, messageInput];
  const minimumLengths = new Map([[nameInput, 2], [communityInput, 2], [addressInput, 4], [messageInput, 10]]);

  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  const validateInput = (input) => {
    const value = input.value.trim();
    let validationMessage = '';

    if (input === phoneInput) {
      const digits = value.replace(/\D/g, '');
      const permittedCharacters = /^[+\d\s().-]+$/;
      if (!permittedCharacters.test(value) || digits.length < 8 || digits.length > 15) {
        validationMessage = 'Ingresá un teléfono válido con entre 8 y 15 dígitos.';
      }
    } else {
      const minimumLength = minimumLengths.get(input) || 1;
      if (value.length < minimumLength) {
        validationMessage = `Completá este campo con al menos ${minimumLength} caracteres.`;
      }
    }

    input.setCustomValidity(validationMessage);
    const valid = input.checkValidity();
    input.setAttribute('aria-invalid', String(!valid));
    return valid;
  };

  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      if (form.classList.contains('was-validated')) validateInput(input);
      else input.setCustomValidity('');
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const validity = formInputs.map(validateInput);
    form.classList.add('was-validated');

    if (!validity.every(Boolean)) {
      formInputs[validity.findIndex((valid) => !valid)].focus();
      return;
    }

    const lines = [
      'Hola Lurkide, quisiera agendar una reunión.',
      '',
      `Nombre: ${nameInput.value.trim()}`,
      `Barrio / Consorcio: ${communityInput.value.trim()}`,
      `Dirección: ${addressInput.value.trim()}`,
      `Teléfono: ${phoneInput.value.trim()}`,
      '',
      'Mensaje:',
      messageInput.value.trim()
    ];

    if (checklistInput.checked) {
      lines.push('', 'También quiero solicitar el checklist “Qué hacer ante una intimación del AdA”.');
    }

    const message = lines.join('\n');
    const subject = 'Solicitud de reunión — Lurkide';
    whatsappLink.href = `https://wa.me/5491140575190?text=${encodeURIComponent(message)}`;
    emailLink.href = `mailto:info@lurkide.com.ar?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    fields.hidden = true;
    success.hidden = false;
    success.focus({ preventScroll: true });
    success.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
  });

  editButton.addEventListener('click', () => {
    success.hidden = true;
    fields.hidden = false;
    messageInput.focus();
  });

  document.querySelectorAll('[data-service]').forEach((link) => {
    link.addEventListener('click', () => {
      const service = link.getAttribute('data-service');
      if (messageInput.value.trim() === '' || messageInput.dataset.prefilled === messageInput.value) {
        messageInput.value = `Quisiera consultar sobre: ${service}.`;
        messageInput.dataset.prefilled = messageInput.value;
        messageInput.setCustomValidity('');
      }
      if (!success.hidden) {
        success.hidden = true;
        fields.hidden = false;
      }
    });
  });

  document.querySelectorAll('#menuPrincipal a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.bootstrap && menu.classList.contains('show')) {
        window.bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false }).hide();
      }
    });
  });

  if ('IntersectionObserver' in window) {
    const navigationLinks = Array.from(document.querySelectorAll('.navbar-nav .nav-link[href^="#"]'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navigationLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
  }
})();
