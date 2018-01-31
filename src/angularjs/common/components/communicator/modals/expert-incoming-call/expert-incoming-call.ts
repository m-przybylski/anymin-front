import * as angular from 'angular';
import { ExpertIncomingCallController } from './expert-incoming-call.controller';
import btnDropdownCallModule from '../../../interface/btn-dropdown-call/btn-dropdown-call';

const expertIncomingCallModule = angular.module(
  'profitelo.components.communicator.modals.expert-incoming-call', [
    'ui.bootstrap',
    'profitelo.components.interface.radio',
    btnDropdownCallModule
  ])
.controller('expertIncomingCall', ExpertIncomingCallController)
  .name;

export default expertIncomingCallModule;
