'use strict';

export function circleControl(circleBox) {
  let rays = circleBox.getElementsByClassName('gadget-Ray');
  
  circleBox.addEventListener('click', setActiveRay);
  
  circleBox.addEventListener('pointerdown', (e)=>{
    circleBox.addEventListener('pointermove', setActiveRay);
    setActiveRay(e);
  });
  circleBox.addEventListener('pointerup', ()=>{
    circleBox.removeEventListener('pointermove', setActiveRay);
  });
  circleBox.addEventListener('pointerleave', ()=>{
    circleBox.removeEventListener('pointermove', setActiveRay);
  });
  
  circleBox.addEventListener('touchstart', (e)=>{
    circleBox.addEventListener('touchmove', setActiveRay);
    setActiveRay(e);
  });
  circleBox.addEventListener('touchend', ()=>{
    circleBox.removeEventListener('touchstart', setActiveRay);
  });
  circleBox.addEventListener('touchcancel', ()=>{
    circleBox.removeEventListener('touchstart', setActiveRay);
  });
  
  function setActiveRay(e) {
    let target;
    // use element under pointer as target if event is 'touchmove'
    (e.type === 'touchmove') ? (target = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)) : (target = e.target);
    
    if (target.classList.contains('gadget-Ray'))
    {
      [].forEach.call(rays, (el) => {
        if (el === target) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    }
  }
}