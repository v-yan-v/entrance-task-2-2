'use strict';

export function scroller(SectionNode) {
  let nav = SectionNode.getElementsByTagName('NAV')[0];
  let navBtns = nav.getElementsByClassName('Nav-Item');
  let wrapper = SectionNode.getElementsByClassName('ScrollWrapper')[0];
  let itemsContainer = wrapper.firstElementChild;
  console.log(nav);
  console.log(wrapper);
  console.log(itemsContainer);
  console.log('wrapper clientWidth', wrapper.clientWidth);
  console.log('container clientWidth', itemsContainer.clientWidth, 'container scrollWidth', itemsContainer.scrollWidth);
  
  
  
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
}