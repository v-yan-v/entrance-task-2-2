'use strict';

export function sliderControl(sliderBox) {
  let slider = sliderBox.getElementsByClassName('gadget-Slider')[0];
  
  slider.addEventListener('pointerdown', apd);
  slider.ondragstart = ()=>{ return false; };
  
  let mediaQ = window.matchMedia("(min-width: 800px)");
  
  mediaQ.addListener(()=>{
    if (mediaQ.matches){
      slider.style.top = '';
    } else {
      slider.style.left = '';
    }
  });
  
  // FUNCTIONS
  function apd(event) {
    // add pointerDown
  
    let
      parentCoords = getCoords(sliderBox),
      sliderCoords = getCoords(slider);
    
    let
      shift = { // distances from pointer event to slider edges
        left:   event.pageX - sliderCoords.left,
        top:    event.pageY - sliderCoords.top,
        right:  sliderCoords.right  - event.pageX,
        bottom: sliderCoords.bottom - event.pageY
      };
    
    moveAt(event);
    
    document.addEventListener('pointermove', moveAt);
    
    document.addEventListener('pointerup', rpm);
    
    function moveAt(e) {
      let
        newIndent = {
          left:   e.pageX - parentCoords.left - shift.left,
          top:    e.pageY - parentCoords.top - shift.top,
          right:  parentCoords.right - e.pageX - shift.right,
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
      document.removeEventListener('pointermove', moveAt);
      document.removeEventListener('pointerup', rpm);
    }
  }
}

