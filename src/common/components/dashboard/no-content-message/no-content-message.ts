import * as angular from 'angular'
import 'angular-translate'
import {NoContentMessageComponent} from './no-content-message.component'
import './no-content-message.sass'

export interface INoContentMessageComponentBindings extends ng.IController {
  iconSrc: string
  messageTitle: string
  messageDescription: string
  buttonTitle: string
  buttonClass: string
  buttonIconLeftClass: string
  buttonIconRightClass: string
}

const noContentMessageModule = angular.module('profitelo.components.dashboard.expert.no-content-message', [
  'pascalprecht.translate'
])
  .component('noContentMessage', new NoContentMessageComponent())
  .name

export default noContentMessageModule
