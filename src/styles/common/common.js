'use strict';

import {toggleMenu} from './mainMenu';

export function commonElements() {
  toggleMenu(document.getElementsByClassName('Header-Navigation')[0]);
}