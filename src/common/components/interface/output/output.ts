import * as angular from 'angular'
import {OutputComponent} from './output.component'
import './output.sass'

export interface IOutputComponentBindings extends ng.IController {
  id: string
  labelText: string
  ngModel: boolean
  value: number
  consultationCost: number
  callback: (minTime: boolean) => void
}

const outputTimerModule = angular.module('profitelo.components.interface.output-timer', [
  'pascalprecht.translate'
])
.component('outputPrimary', new OutputComponent)
  .name

export default outputTimerModule
