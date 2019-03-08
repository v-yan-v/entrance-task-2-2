'use strict';

import {toggleMenu} from './mainMenu';
import {scroller} from "./Scroller";

export function commonElements() {
  toggleMenu(document.getElementsByClassName('Header-Navigation')[0]);
  scroller(document.getElementById('gadgets'));
}