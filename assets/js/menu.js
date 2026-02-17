document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (!navToggle || !mainNav) return;

  // initialize
  navToggle.setAttribute('aria-expanded', 'false');
  // Ensure no submenu is open on load
  document.querySelectorAll('.submenu.open').forEach(s => s.classList.remove('open'));
  document.querySelectorAll('.submenu-toggle[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded', 'false'));

  navToggle.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Submenu toggles (for mobile and keyboard users)
  document.querySelectorAll('.submenu-toggle').forEach(btn => {
    const submenu = btn.nextElementSibling;
    if (!submenu) return;
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function (e) {
      const isOpen = submenu.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Close mobile menu when a nav link is clicked
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function () {
      if (window.innerWidth < 768) {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        // close any open submenus
        document.querySelectorAll('.submenu.open').forEach(s => s.classList.remove('open'));
        document.querySelectorAll('.submenu-toggle[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded', 'false'));
      }
    });
  });

  // Close submenus and mobile nav when clicking outside
  document.addEventListener('click', function (e) {
    const isInsideSubmenu = !!e.target.closest('.has-submenu');
    const isInsideNav = !!e.target.closest('#main-nav');
    const isToggle = !!e.target.closest('#nav-toggle');

    // If click is outside any submenu, close open submenus
    if (!isInsideSubmenu) {
      document.querySelectorAll('.submenu.open').forEach(s => s.classList.remove('open'));
      document.querySelectorAll('.submenu-toggle[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded', 'false'));
    }

    // If mobile menu is open and click is outside nav and not on the toggle, close the menu
    if (mainNav.classList.contains('open') && !isInsideNav && !isToggle) {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menus with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      // close any open submenus
      document.querySelectorAll('.submenu.open').forEach(s => s.classList.remove('open'));
      document.querySelectorAll('.submenu-toggle[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded', 'false'));
      // close mobile nav
      if (mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Close mobile menu and submenus when resizing to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.querySelectorAll('.submenu.open').forEach(s => s.classList.remove('open'));
      document.querySelectorAll('.submenu-toggle[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded', 'false'));
    }
  });
});
