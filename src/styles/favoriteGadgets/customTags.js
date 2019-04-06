'use strict';

export function customTags() {
  let selects = [].slice.call(document.getElementsByClassName('customTags'));
  let divs = [];
  
  selects.forEach( select => {
    select.addEventListener('change', event => {
      filterItems(event);
    });
  });
  
  // check width
  let mediaQ = window.matchMedia("(min-width: 1001px)");
  if (mediaQ.matches) {
    createDivsFromSelects();
    replaceSelectsByDivs();
  }
  
  // react if width change
  mediaQ.addListener((mediaEvent) => { // react to media queries events
    if (mediaEvent.matches) {
      if (divs.length === 0) {
        createDivsFromSelects();
      }
      replaceSelectsByDivs();
    }
    else {
      replaceDivsBySelects();
    }
  });
  
  function createDivsFromSelects() {
    // for all selects we found: replace selects by divs
    selects.forEach((select) => {
      let tags = document.createElement('DIV');
      let options = [].slice.call(select.getElementsByTagName('OPTION'));
      
      // copy attributes from select to div
      [].forEach.call(select.attributes, (attr) => {
        tags.setAttribute(attr.name, attr.value);
      });
      
      options.forEach( (option) => {
        let tag = document.createElement("DIV");
        // copy attributes from option to tag
        [].forEach.call(option.attributes, (attr) => {
          tag.setAttribute(attr.name, attr.value);
          tag.value = option.getAttribute('value');
        });
        
        // copy all content
        tag.innerHTML = option.innerHTML;
        
        tags.appendChild(tag);
      });
  
      // set tag active and filter items by clicking on tag
      tags.addEventListener('click', event =>{
        if (event.target.classList.contains('FavoriteGadgets-Tag')){
          
          // set clicked tag active
          [].forEach.call(tags.children, (el) => {
            if (el === event.target){
              el.classList.add('FavoriteGadgets-Tag--active');
            }
            else {
              el.classList.remove('FavoriteGadgets-Tag--active');
            }
          });
          filterItems(event);
        }
      });
      
      divs.push(tags);
    });
  }
  
  function replaceSelectsByDivs() {
    selects.forEach((select, n) => {
      select.replaceWith(divs[n]);
    });
  }
  
  function replaceDivsBySelects() {
    divs.forEach((div, n) => {
      div.replaceWith(selects[n]);
    });
  }
  
  // filter items
  function filterItems(evt) {
    let items = [].slice.call(evt.target.closest('.withScroll').getElementsByClassName('scrollWrapper')[0].getElementsByClassName('Card'));
    items.forEach(el => {
      if (evt.target.value === 'all') {
        el.style.display = '';
        return;
      }
      if (el.getAttribute('data-room') === evt.target.value || el.getAttribute('data-cardType') === evt.target.value) {
        el.style.display = '';
      }
      else {
        el.style.display = 'none';
      }
    });
  }
}