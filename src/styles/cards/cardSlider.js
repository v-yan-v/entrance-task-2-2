'use strict';

export function sliderControl(sliderBox) {
  let slider = sliderBox.getElementsByClassName('gadget-Slider')[0];
  
  
  slider.addEventListener('pointerdown', apd);
  slider.ondragstart = ()=>{ return false; };
  
  
  // functions
  function apd(event) {
    // add pointerDown
  
    let parentCoords = getCoords(sliderBox),
        sliderCoords = getCoords(slider);
        // indentX      = sliderCoords.left  - parentCoords.left,
        // indentY      = sliderCoords.top - parentCoords.top;
    
    let shift = { // distances from pointer event to slider edges
      left:   event.pageX - sliderCoords.left,
      top:    event.pageY - sliderCoords.top,
      right:  sliderCoords.right  - event.pageX,
      bottom: sliderCoords.bottom - event.pageY
    };
    
    moveAt(event);
    
    document.addEventListener('pointermove', moveAt);
    
    document.addEventListener('pointerup', rpm);
    
    function moveAt(e) {
      let newIndent = {
        left:   e.pageX - parentCoords.left - shift.left,
        top:    e.pageY - parentCoords.top - shift.top,
        right:  parentCoords.right - e.pageX - shift.right,
        bottom: parentCoords.right - e.pageY - shift.bottom
      };
      let sliderWidth = sliderCoords.right - sliderCoords.left,
          parentWidth = parentCoords.right - parentCoords.left;
      
      if (newIndent.left < 0){
        newIndent.left = 0;
      }
      if (newIndent.right < 0){
        newIndent.right = 0;
        newIndent.left = parentWidth - sliderWidth;
      }
      
      slider.style.left = newIndent.left + 'px';
      // slider.style.top  = parenCoords.top /*e.pageY - shiftY*/ + 'px';
    }
    
    function getCoords(elem) {   // кроме IE8-
      let box = elem.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset,
        bottom: box.bottom + pageYOffset,
        right: box.right + pageXOffset
      };
    }
  
    function rpm (){
      //remove pointerMove
      document.removeEventListener('pointermove', moveAt);
      document.removeEventListener('pointerup', rpm);
    }
  }
}

