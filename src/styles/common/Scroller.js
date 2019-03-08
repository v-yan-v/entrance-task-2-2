'use strict';

export function scroller(SectionNode) {
  let nav = SectionNode.getElementsByTagName('NAV')[0];
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
      if (itemsContainer.scrollWidth + left < wrapper.clientWidth){ left = wrapper.clientWidth - itemsContainer.scrollWidth; }
      itemsContainer.style.left = left + `px`;
    }
    if (navItem.classList.contains('linkBack')) {
      left += wrapper.clientWidth / 3;
      if (left > 0){ left = 0; }
      
      itemsContainer.style.left = left + `px`;
    }
  });
}