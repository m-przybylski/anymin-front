import * as angular from 'angular'
import {TooltipComponent} from './tooltip.component'
import './tooltip.sass'

export interface ITooltipComponentBindings extends ng.IController {
  tooltipText: string
}

const tooltipModule = angular.module('profitelo.components.interface.tooltip', [])
.component('tooltip', new TooltipComponent())
  .name

export default tooltipModule
