//  todo: add html data tag with card-gadget type info
//  todo: html and styles for full-screen card lights
//  todo: actions on events from full-screen cards (close, coloring active/changing slider, change data in compact mode)
//  todo: actions on events from compact cards (open full-screen)
//  todo: wheel scroll change slider value

const cardAirTemperature = `<div class="Card--fullScreen">
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
      <div class="gadget-SliderBox">
        <div class="gadget-Limits">
          <span class="gadget-LimitMin">-10</span>
          <span class="gadget-LimitMax">+30</span>
        </div>
        <div class="gadget-Slider"></div>
      </div>

    </div>
    <div class="gadget-ConfirmForm">
      <button class="gadget-FormButtons active">apply</button>
      <button class="gadget-FormButtons ">close</button>
    </div>
  </div>
</div>`;

let raysDiv = '';
for (let i=-45; i<=225; i+=3){
  raysDiv += `<div class="gadget-Ray deg${i.toString()}"></div>`;
}
const cardFloorTemperature = `
<div class="Card--fullScreen">
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
      <button class="gadget-FormButtons active">apply</button>
      <button class="gadget-FormButtons ">close</button>
    </div>
  </div>
</div>
`;

function onCardClick(event) {
}