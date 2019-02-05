'use strict';

export function sliderControl(sliderBox) {
  let slider = sliderBox.getElementsByClassName('gadget-Slider')[0];
  let modal = document.body.getElementsByClassName('Card--fullScreen')[0];
  
  let
    parentCoords = {}, // sliderBox coordinates
    sliderCoords = {}, // slider coordinates
    shift = {}; // distances from pointer event to slider edges
  
  
  sliderBox.addEventListener('click', (e)=>{
    parentCoords = getCoords(sliderBox); // renew coords for case the view had change
    sliderCoords = getCoords(slider); // renew coords for case the view had change
    
    if (e.target !== slider){
      shift = { // distances from pointer event to slider edges
        left: sliderCoords.width / 2,
        top: sliderCoords.height / 2,
        right: sliderCoords.width / 2,
        bottom: sliderCoords.height / 2
      };
    }
    moveAt(e);
  });
  
  slider.addEventListener('touchstart', apd);
  slider.addEventListener('mousedown', apd);
  slider.addEventListener('pointerdown', apd);
  slider.ondragstart = ()=>{ return false; };
  
  let mediaQ = window.matchMedia("(min-aspect-ratio: 1001/1000)"); // ratio can't work with float numbers
  
  mediaQ.addListener((mediaEvent)=>{ // react to media queries events
    if (mediaEvent.matches){
      slider.style.top = '';
    } else {
      slider.style.left = '';
    }
    parentCoords = getCoords(sliderBox); // renew coords for case the view had change
    sliderCoords = getCoords(slider); // renew coords for case the view had change
  });
  
  // FUNCTIONS
  function apd(event) {
    // add pointerDown
    event.preventDefault();
    event.stopPropagation();
  
    parentCoords = getCoords(sliderBox); // renew coords for case the view had change
    sliderCoords = getCoords(slider); // renew coords for case the view had change
    
    shift = { // distances from pointer event to slider edges
      left: event.pageX - sliderCoords.left,
      top: event.pageY - sliderCoords.top,
      right: sliderCoords.right - event.pageX,
      bottom: sliderCoords.bottom - event.pageY
    };
  
    modal.addEventListener('touchmove', moveAt);
    modal.addEventListener('mousemove', moveAt);
    modal.addEventListener('pointermove', moveAt);
  
    modal.addEventListener('touchend', rpm);
    modal.addEventListener('mouseup', rpm);
    modal.addEventListener('pointerup', rpm);
    modal.addEventListener('touchcancel', rpm);
    
    moveAt(event);
    
  }
  
  function moveAt(e) {
    // move slider at position under pointer
  
    let
      newIndent = { // distance from sliderBox to slider
        left: e.pageX - parentCoords.left - shift.left,
        top: e.pageY - parentCoords.top - shift.top,
        right: parentCoords.right - e.pageX - shift.right,
        bottom: parentCoords.bottom - e.pageY - shift.bottom
      };
    
    if (mediaQ.matches){ // horizontal slider view
      if (newIndent.left < 0) {
        newIndent.left = 0;
      }
      if (newIndent.right < 0) {
        newIndent.right = 0;
        newIndent.left = parentCoords.width - sliderCoords.width;
      }
      slider.style.left = newIndent.left + 'px';
    }
    
    if (!mediaQ.matches){ // vertical slider view
      if (newIndent.top < 0){
        newIndent.top = 0;
      }
      if (newIndent.bottom < 0){
        newIndent.bottom = 0;
        newIndent.top = parentCoords.height - sliderCoords.height;
      }
      slider.style.top  = newIndent.top + 'px';
    }
  }
  
  function getCoords(elem) {   // кроме IE8-
    let box = elem.getBoundingClientRect();
    
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
      bottom: box.bottom + pageYOffset,
      right: box.right + pageXOffset,
      width: box.width,
      height: box.height
    };
  }
  
  function rpm (){
    //remove pointerMove
  
    // console.log('remove pointer move Function');
    
    // slider.removeEventListener('pointerdown', apd);
    // slider.removeEventListener('touchstart', apd);
    // slider.removeEventListener('mousedown', apd);
  
    modal.removeEventListener('touchmove', moveAt);
    modal.removeEventListener('mousemove', moveAt);
    modal.removeEventListener('pointermove', moveAt);
  
    modal.removeEventListener('touchend', rpm);
    modal.removeEventListener('touchecancel', rpm);
    modal.removeEventListener('mouseup', rpm);
    modal.removeEventListener('pointerup', rpm);
  }
}

