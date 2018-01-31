import * as angular from 'angular';
import { TooltipComponent } from './tooltip.component';

export interface ITooltipComponentBindings extends ng.IController {
  tooltipText: string;
}

const tooltipModule = angular.module('profitelo.components.interface.tooltip', [
  'pascalprecht.translate'
])
.component('tooltip', new TooltipComponent())
  .name;

export default tooltipModule;
