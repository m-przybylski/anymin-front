import * as angular from 'angular'
import {ActiveCallBarComponent} from './active-call-bar.component'
import './active-call-bar.sass'
import eventsModule from '../../../services/events/events'
import {ActiveCallBarService} from './active-call-bar.service'
const activeCallBarModule = angular.module('profitelo.components.communicator.active-call-bar', [
  eventsModule
])
.component('activeCallBar', new ActiveCallBarComponent)
.service('activeCallBarService', ActiveCallBarService)
  .name

export default activeCallBarModule;
