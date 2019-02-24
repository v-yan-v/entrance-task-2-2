'use strict';

export function toggleMenu(navigation) {
  let menuToggleBtn = navigation.getElementsByClassName('Header-SiteMenu')[0];
  
  menuToggleBtn.addEventListener('click', (evt)=>{
    if (navigation.classList.contains('Header-Navigation--fullscreen')){
      // close menu
      navigation.classList.remove('Header-Navigation--fullscreen');
      document.body.style.overflow = '';
      menuToggleBtn.classList.remove('Header-SiteMenu--fullscreen');
      menuToggleBtn.firstChild.classList.remove('Header-Hamburger--fullscreen');
    }
    else {
      // show menu
      navigation.classList.add('Header-Navigation--fullscreen');
      document.body.style.overflow = 'hidden';
      menuToggleBtn.classList.add('Header-SiteMenu--fullscreen');
      menuToggleBtn.firstChild.classList.add('Header-Hamburger--fullscreen');
    }
  });
  
  let menu = navigation.getElementsByClassName('Nav')[0];
  menu.addEventListener('click', (event)=>{
    
    let items = menu.getElementsByClassName('Nav-Item');
    
    [].forEach.call(items, (el)=>{
      if (el === event.target.closest('.Nav-Item')){
        el.classList.add('Nav-Item--active');
      } else {
        el.classList.remove('Nav-Item--active');
      }
    });
    navigation.classList.remove('Header-Navigation--fullscreen');
    document.body.style.overflow = '';
    menuToggleBtn.classList.remove('Header-SiteMenu--fullscreen');
    menuToggleBtn.firstChild.classList.remove('Header-Hamburger--fullscreen');
  });
}