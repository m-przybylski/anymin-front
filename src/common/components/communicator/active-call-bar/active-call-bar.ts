import * as angular from 'angular'
import {ActiveCallBarComponent} from './active-call-bar.component'
import './active-call-bar.sass'
const activeCallBarModule = angular.module('profitelo.components.communicator.active-call-bar', [
])
.component('activeCallBar', new ActiveCallBarComponent)
  .name

export default activeCallBarModule;
