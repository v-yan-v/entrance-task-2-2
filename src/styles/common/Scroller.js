/**  NEED FOR WORK
* section.withScroll>nav.scrollNav>.Nav-Item*2
* section.withScroll>.scrollWrapper
* */

'use strict';

export function scroller() {
  let sections = document.getElementsByClassName('withScroll');
  
  [].forEach.call(sections, (section) =>{
    let nav, navBtns, wrapper, itemsContainer;
    
    nav = section.getElementsByClassName('scrollNav')[0];
    wrapper = section.getElementsByClassName('scrollWrapper')[0];
  
    if (!nav || !wrapper) { return; }
    
    navBtns = nav.getElementsByClassName('Nav-Item');
    itemsContainer = wrapper.firstElementChild;
    
    nav.addEventListener('click', evt=>{
      let navItem = evt.target.closest('.Nav-Item');
      let left = parseInt(getComputedStyle(itemsContainer).left);
    
      if (navItem.classList.contains('linkForward')) {
        left -= wrapper.clientWidth / 3;
      
        // сделать активными кнопки "назад" и "вперёд"
        navBtns[0].classList.add('Nav-Item--active');
        navBtns[navBtns.length-1].classList.add('Nav-Item--active');
      
        // запрещаем перематывать дальше чем хватает карточек
        if (itemsContainer.scrollWidth + left < wrapper.clientWidth){
          left = wrapper.clientWidth - itemsContainer.scrollWidth;
          // сделать неактивным кнопку "вперёд"
          navBtns[navBtns.length-1].classList.remove('Nav-Item--active');
        }
      
        itemsContainer.style.left = left + `px`;
      }
    
    
      if (navItem.classList.contains('linkBack')) {
        left += wrapper.clientWidth / 3;
      
        // сделать активными кнопки "назад" и "вперёд"
        navBtns[0].classList.add('Nav-Item--active');
        navBtns[navBtns.length-1].classList.add('Nav-Item--active');
      
        //заперщаем перематывать вправо если дошли до начала карточек
        if (left > 0){
          left = 0;
          // сделать неактивной кнопку "назад"
          navBtns[0].classList.remove('Nav-Item--active');
        }
      
        itemsContainer.style.left = left + `px`;
      }
    });
  });
}