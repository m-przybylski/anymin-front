import * as angular from 'angular'
import {ClientCallController} from './client-call.controller'
import './client-call.sass'
import btnDropdownModule from '../../../interface/btn-dropdown/btn-dropdown'

const clientCallControllerModule = angular.module(
  'profitelo.components.communicator.modals.client-call', [
    'ui.bootstrap',
    btnDropdownModule
  ])
.controller('clientCallController', ClientCallController)
  .name

export default clientCallControllerModule
