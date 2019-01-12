//  todo:
//  todo: js variables and get data for air temperature cards
//  todo: js variables and get data for light control cards
//  todo: js variables and get data for floor temperature cards
//  todo: actions on events from full-screen cards (close, coloring active/changing slider, change data in compact mode)
//  todo: actions on events from compact cards (open full-screen)
//  todo: wheel scroll change slider value

const cardAirTemperature = `
<!--<div class="Card&#45;&#45;fullScreen">-->
  <div class="gadgetWrap">
    <div class="gadget">
      <div class="gadget-Header">
        <div class="gadget-Title">
          <span>HEADER TEXT</span>
          <div class="gadget-Status">online</div>
        </div>
        <div class="gadget-Info">
          <span class="gadget-InfoText">+22</span>
          <div class="gadget-Icon">
            <img src="./img/icons/icon_temperature.svg" alt="">
          </div>
        </div>
      </div>
      <div class="gadget-Presets">
        <span class="gadget-Variants active">manual</span>
        <span class="gadget-Variants">cold</span>
        <span class="gadget-Variants">warm</span>
        <span class="gadget-Variants">hot</span>
      </div>
      <div class="gadget-SliderBox gadget-SliderBox--temperature">
        <div class="gadget-Limits">
          <span class="gadget-LimitMin">-10</span>
          <span class="gadget-LimitMax">+30</span>
        </div>
        <div class="gadget-Slider"></div>
      </div>

    </div>
    <div class="gadget-ConfirmForm">
      <button class="gadget-FormButtons applyBtn active">apply</button>
      <button class="gadget-FormButtons closeBtn">close</button>
    </div>
  </div>
<!--</div>-->
`;

let raysDiv = '';
for (let i=-45; i<=225; i+=3){
  raysDiv += `<div class="gadget-Ray deg${i.toString()}"></div>`;
}
const cardFloorTemperature = `
<!--<div class="Card&#45;&#45;fullScreen">-->
  <div class="gadgetWrap">
    <div class="gadget">
      <div class="gadget-Header">
        <div class="gadget-Title">
          <span>HEADER TEXT</span>
          <div class="gadget-Status">online</div>
        </div>
        <div class="gadget-Info">
          <span class="gadget-InfoText">+22</span>
          <div class="gadget-Icon">
            <img src="./img/icons/icon_temperature.svg" alt="">
          </div>
        </div>
      </div>

      <div class="gadget-CircleControlBox">

        <div class="gadget-Circle">
          <div class="gadget-NewValue">+23</div>
        </div>
          
        ${raysDiv}

      </div>

    </div>
    <div class="gadget-ConfirmForm">
      <button class="gadget-FormButtons applyBtn active">apply</button>
      <button class="gadget-FormButtons closeBtn">close</button>
    </div>
  </div>
<!--</div>-->
`;

const cardLightControl = `
<!--<div class="Card&#45;&#45;fullScreen">-->
  <div class="gadgetWrap">
    <div class="gadget">
      <div class="gadget-Header">
        <div class="gadget-Title">
          <span>HEADER TEXT</span>
          <div class="gadget-Status">online</div>
        </div>
        <div class="gadget-Info">
          <span class="gadget-InfoText">+22</span>
          <div class="gadget-Icon">
            <img src="./img/icons/icon_temperature.svg" alt="">
          </div>
        </div>
      </div>
      <div class="gadget-Presets">
        <span class="gadget-Variants active">manual</span>
        <span class="gadget-Variants">cold</span>
        <span class="gadget-Variants">warm</span>
        <span class="gadget-Variants">hot</span>
      </div>
      <div class="gadget-SliderBox gadget-SliderBox--lightControl">
        <div class="gadget-Limits">
          <span class="gadget-LimitMin"></span>
          <span class="gadget-LimitMax"></span>
        </div>
        <div class="gadget-Slider"></div>
      </div>

    </div>
    <div class="gadget-ConfirmForm">
      <button class="gadget-FormButtons applyBtn active">apply</button>
      <button class="gadget-FormButtons closeBtn">close</button>
    </div>
  </div>
<!--</div>-->
`;

import {sliderControl} from './cardSlider';
import {circleControl} from './cardCircleControl';

function onCardClick(event) {
  // create modal
  let modal = document.createElement('DIV');
  modal.classList.add('Card--fullScreen');
  
  document.body.appendChild(modal);
  
  // fill modal by type
  let cardType = event.target.closest('.Card').getAttribute('data-cardType');
  if (cardType === 'airTemperature'){
    modal.innerHTML = cardAirTemperature;
    sliderControl(modal.getElementsByClassName('gadget-SliderBox')[0]);
  }
  if (cardType === 'floorTemperature'){
    modal.innerHTML = cardFloorTemperature;
    circleControl(modal.getElementsByClassName('gadget-CircleControlBox')[0]);
  }
  if (cardType === 'light'){
    modal.innerHTML = cardLightControl;
    sliderControl(modal.getElementsByClassName('gadget-SliderBox')[0]);
  }
  
  // close modal
  modal.addEventListener('click', e=>{
    if (e.target === modal || e.target.classList.contains('closeBtn')) {
      modal.remove();
    }
  });
  
}

export function cards() {
  document.body.addEventListener('click', e=>{
    if (e.target.closest('.Card')){
      // console.log(e.target);
      onCardClick(e);
    }
  });
}