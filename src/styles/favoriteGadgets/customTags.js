'use strict';

export function customTags() {
  let selects = [].slice.call(document.getElementsByClassName('customTags'));
  let divs = [];
  
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
      let options = select.getElementsByTagName('OPTION');
      
      // copy attributes from select to div
      [].forEach.call(select.attributes, (attr) => {
        tags.setAttribute(attr.name, attr.value);
      });
      
      [].forEach.call(options, (option) => {
        let tag = document.createElement("DIV");
        // copy attributes from option to tag
        [].forEach.call(option.attributes, (attr) => {
          tag.setAttribute(attr.name, attr.value);
        });
        
        // copy all content
        tag.innerHTML = option.innerHTML;
        
        tags.appendChild(tag);
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
}