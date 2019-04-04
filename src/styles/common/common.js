'use strict';

import {toggleMenu} from './mainMenu';
import {scroller} from "./Scroller";
import {customTags} from "../favoriteGadgets/customTags";

export function commonElements() {
  toggleMenu(document.getElementsByClassName('Header-Navigation')[0]);
  scroller();
  customTags();
}