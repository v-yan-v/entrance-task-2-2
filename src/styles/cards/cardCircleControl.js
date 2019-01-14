'use strict';

export function circleControl(circleBox) {
  let rays = circleBox.getElementsByClassName('gadget-Ray');
  
  circleBox.addEventListener('pointerdown', ()=>{
    circleBox.addEventListener('pointermove', setActiveRay);
  });
  circleBox.addEventListener('pointerup', ()=>{
    circleBox.removeEventListener('pointermove', setActiveRay);
  });
  circleBox.addEventListener('pointerleave', ()=>{
    circleBox.removeEventListener('pointermove', setActiveRay);
  });
  
  function setActiveRay(e) {
    if (e.target.classList.contains('gadget-Ray')) {
      [].forEach.call(rays, (el) => {
        if (el === e.target) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    }
  }
}