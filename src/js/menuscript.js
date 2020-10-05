'use strict';

(function () {

  function getClass(className) {
    var els = document.getElementsByClassName(className);
    if (els && els[0]) return els[0];
    return null;
  }

  var menuBtn;
  var bg;
  var menu;


  var ORIGINAL_MENU_CLASS;

  var isMenuOpen = false;

  function closeMenu() {
    if (!isMenuOpen) return;
    isMenuOpen = false;
    bg.className = 'bg';
    menu.className = ORIGINAL_MENU_CLASS;
    bodyScrollLock.enableBodyScroll(menu);
  }

  function openMenu() {
    if (isMenuOpen) return;
    isMenuOpen = true;
    bg.className = 'bg visible';
    menu.className = ORIGINAL_MENU_CLASS + ' visible';
    bodyScrollLock.disableBodyScroll(menu);
  }

  function toggleMenu() {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  window.addEventListener('load', function () {
    menuBtn = getClass('menu-btn');
    bg = getClass('bg');
    menu = getClass('homeNav');
    
    if (!menu || !bg || !menuBtn) return;

    ORIGINAL_MENU_CLASS = menu.className;

    bg.addEventListener('click', closeMenu);
    menuBtn.addEventListener('click', toggleMenu);
    window.addEventListener('resize', function () {
      if (isMenuOpen) closeMenu();
    });
  });
})();
