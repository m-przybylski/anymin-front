// tslint:disable:prefer-method-signature
// tslint:disable:new-parens
import * as angular from 'angular';
import { BtnDropdownCallComponent } from './btn-dropdown-call.component';
import { BtnDropdownCallAnimation } from './btn-dropdown-call.animation';

export interface IBtnDropdownCallComponentBindings extends ng.IController {
  callback: () => void;
  buttonText: string;
  buttonClass: string;
}

const btnDropdownCallModule = angular.module('profitelo.components.interface.btn-dropdown-call', [
  'pascalprecht.translate'
])
.component('btnDropdownCall', new BtnDropdownCallComponent)
.animation('.collapse-height', BtnDropdownCallAnimation.getInstance())
  .name;

export default btnDropdownCallModule;
