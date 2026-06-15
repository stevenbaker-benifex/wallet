document.addEventListener('DOMContentLoaded', function() {
  const menu = document.getElementById('primary-nav');
  const toggle = document.getElementById('menuToggle');
  const icon = toggle.querySelector('i');

  // On page load, open any submenu that is .is-active
  document.querySelectorAll('.has-submenu.is-active').forEach(function(item) {
    item.classList.add('is-open');
  });

  toggle.addEventListener('click', function() {
    menu.classList.toggle('collapsed');
    icon.classList.toggle('fa-chevron-left');
    icon.classList.toggle('fa-chevron-right');
  });

  const submenuToggles = document.querySelectorAll('.submenu-toggle');
  
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = this.closest('.has-submenu');
      const submenu = parent.querySelector('.submenu');
      const isOpen = parent.classList.contains('is-open');
      const isActive = parent.classList.contains('is-active');

      // If the item is .is-active and not .is-open, add .is-open
      if (isActive && !isOpen) {
        parent.classList.add('is-open');
        const height = submenu.scrollHeight;
        submenu.style.height = '0';
        submenu.offsetHeight;
        submenu.style.height = height + 'px';
        submenu.addEventListener('transitionend', function handler() {
          submenu.removeEventListener('transitionend', handler);
          submenu.style.height = '';
        });
        return;
      }

      // If already open, close it
      if (isOpen) {
        const height = submenu.scrollHeight;
        submenu.style.height = height + 'px';
        submenu.offsetHeight;
        submenu.style.height = '0';
        submenu.addEventListener('transitionend', function handler() {
          submenu.removeEventListener('transitionend', handler);
          parent.classList.remove('is-open');
          submenu.style.height = '';
        });
      } else {
        // Opening animation
        parent.classList.add('is-open');
        const height = submenu.scrollHeight;
        submenu.style.height = '0';
        submenu.offsetHeight;
        submenu.style.height = height + 'px';
        submenu.addEventListener('transitionend', function handler() {
          submenu.removeEventListener('transitionend', handler);
          submenu.style.height = '';
        });
      }
    });
  });

  // Collapse/Expand logic for elements with data-toggle="collapse"
  document.querySelectorAll('[data-toggle="collapse"]').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSelector = this.getAttribute('data-target');
      if (!targetSelector) return;
      const target = document.querySelector(targetSelector);
      if (!target) return;

      // Toggle 'show' class
      target.classList.toggle('show');

      // Optionally update aria-expanded
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
    });
  });
});