/**  NEED FOR WORK
* section.withScroll>nav.scrollNav>.Nav-Item*2
* section.withScroll>.scrollWrapper
* */

'use strict';

export function scroller() {
  let sections = document.getElementsByClassName('withScroll');
  
  [].forEach.call(sections, (section) =>{
    let nav, navBtns, wrapper, itemsContainer, touchBegin, left, top;
    
    nav = section.getElementsByClassName('scrollNav')[0];
    wrapper = section.getElementsByClassName('scrollWrapper')[0];
  
    if (!nav || !wrapper) { return; }
    
    navBtns = nav.getElementsByClassName('Nav-Item');
    itemsContainer = wrapper.firstElementChild;
  
    itemsContainer.style.transition = 'all .5s ease-out';
  
    // initialisation
    // сделать активными кнопки "назад" и "вперёд"
    navBtns[0].classList.add('Nav-Item--active');
    navBtns[navBtns.length-1].classList.add('Nav-Item--active');
  
    // listeners //
    nav.addEventListener('click', evt=>{
      let navItem = evt.target.closest('.Nav-Item');
      left = parseInt(getComputedStyle(itemsContainer).left);
      top = parseInt(getComputedStyle(itemsContainer).top);
    
      if (navItem && navItem.classList.contains('linkForward')) {
        left -= wrapper.clientWidth / 3;
        top -= wrapper.clientHeight / 2;
      }
    
      if (navItem && navItem.classList.contains('linkBack')) {
        left += wrapper.clientWidth / 3;
        top += wrapper.clientHeight / 2;
      }
  
      setNewPos();
    });
    
    section.addEventListener('touchstart', event=>{
      left = parseInt(getComputedStyle(itemsContainer).left);
      top = parseInt(getComputedStyle(itemsContainer).top);
  
      touchBegin = {X: event.touches[0].clientX, Y: event.touches[0].clientY};
      itemsContainer.style.transition = '';
  
      // сделать активными кнопки "назад" и "вперёд"
      navBtns[0].classList.add('Nav-Item--active');
      navBtns[navBtns.length-1].classList.add('Nav-Item--active');
    });
    
    section.addEventListener('touchmove', event=>{
      let shift = {X: event.touches[0].clientX - touchBegin.X,  Y: event.touches[0].clientY - touchBegin.Y};
      touchBegin.X = event.touches[0].clientX;
      touchBegin.Y = event.touches[0].clientY;
      
      left += shift.X;
      top += shift.Y;
  
      // запрещаем двигать если по этой оси нет скрытого контента
      if (itemsContainer.scrollHeight <= wrapper.clientHeight){
        top = 0;
      }
      if (itemsContainer.scrollWidth <= wrapper.clientWidth){
        left = 0;
      }
      
      itemsContainer.style.left = left + `px`;
      itemsContainer.style.top = top + `px`;
  
      section.addEventListener('touchend', endTouch);
      section.addEventListener('touchcancel', endTouch);
      
      function endTouch(event) {
        event.preventDefault();
        setNewPos();
        section.removeEventListener('touchend', endTouch);
        section.removeEventListener('touchcancel', endTouch);
      }
    });
    
    function setNewPos() {
      itemsContainer.style.transition = 'all .5s ease-out';
  
      // запрещаем перематывать дальше чем хватает карточек
      if (itemsContainer.scrollWidth + left < wrapper.clientWidth){
        left = wrapper.clientWidth - itemsContainer.scrollWidth;
        // сделать неактивным кнопку "вперёд"
        navBtns[navBtns.length-1].classList.remove('Nav-Item--active');
        // сделать активной кнопку "назад"
        navBtns[0].classList.add('Nav-Item--active');
      }
      
      //заперщаем перематывать вправо если дошли до начала карточек
      if (left > 0){
        left = 0;
        // сделать неактивной кнопку "назад"
        navBtns[0].classList.remove('Nav-Item--active');
        // сделат активной кнопку "вперёд"
        navBtns[navBtns.length-1].classList.add('Nav-Item--active');
      }
      
      // запрещаем перематывать вниз
      if (top > 0){
        top = 0;
        // сделать неактивной кнопку "назад"
        navBtns[0].classList.remove('Nav-Item--active');
        // сделат активной кнопку "вперёд"
        navBtns[navBtns.length-1].classList.add('Nav-Item--active');
      }
      
      // запрещаем перематывать вверх
      if (itemsContainer.scrollHeight + top < wrapper.clientHeight){
        top = wrapper.clientHeight - itemsContainer.scrollHeight;
        // сделать неактивным кнопку "вперёд"
        navBtns[navBtns.length-1].classList.remove('Nav-Item--active');
        // сделать активной кнопку "назад"
        navBtns[0].classList.add('Nav-Item--active');
      }
      
      itemsContainer.style.left = left + `px`;
      itemsContainer.style.top = top + 'px';
    }
  });
}