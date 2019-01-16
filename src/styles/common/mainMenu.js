'use strict';

export function toggleMenu(navigation) {
  // navigation.addEventListener('pointerdown', (evt)=>{
  navigation.addEventListener('click', (evt)=>{
    if (evt.target === navigation){
      navigation.classList.toggle('Header-Navigation--fullscreen');
      
      if (document.body.style.overflow === 'hidden'){
        document.body.style.overflow = '';
      } else {
        document.body.style.overflow = 'hidden';
      }
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
  });
}