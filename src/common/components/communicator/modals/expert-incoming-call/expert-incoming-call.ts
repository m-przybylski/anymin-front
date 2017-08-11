import * as angular from 'angular'
import {ExpertIncomingCallController} from './expert-incoming-call.controller'
import './expert-incoming-call.sass'
import btnDropdownModule from '../../../interface/btn-dropdown/btn-dropdown'

const expertIncomingCallModule = angular.module(
  'profitelo.components.communicator.modals.expert-incoming-call', [
    'ui.bootstrap',
    btnDropdownModule
  ])
.controller('expertIncomingCall', ExpertIncomingCallController)
  .name

export default expertIncomingCallModule
