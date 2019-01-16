'use strict';

import './main.sass';

import {cards} from './styles/cards/cards';
import {commonElements} from "./styles/common/common";

document.addEventListener('DOMContentLoaded', ()=>{
  commonElements();
  cards();
});