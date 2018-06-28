// tslint:disable:new-parens
import * as angular from 'angular';
import { InputLinksComponent } from './input-links.component';
import '../../../directives/pro-social-icon-getter/pro-social-icon-getter';
import ValidationAlertModule from '../../interface/alert/validation-alert/validation-alert';

export interface IInputLinksComponentBindings extends ng.IController {
  selectedLinks: string[];
  label?: string;
}

const inputLinksModule = angular.module('profitelo.components.interface.input-links', [
  'pascalprecht.translate',
  'profitelo.directives.pro-social-icon-getter',
  ValidationAlertModule

])
.component('inputLinks', new InputLinksComponent)
  .name;

export default inputLinksModule;
