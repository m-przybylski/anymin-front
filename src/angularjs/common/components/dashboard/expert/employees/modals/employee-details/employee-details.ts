import * as angular from 'angular';
import { ExpertEmployeeDetailsModalController } from './employee-details.controller';
import consultationListItemModule from '../../../../../invitations/consultation-list-item/consultation-list-item';
import userAvatarModule from '../../../../../interface/user-avatar/user-avatar';

const expertEmployeeDetailsModalModule =
  angular.module('profitelo.components.dashboard.expert.employees.modals.employee-details', [
  'ui.bootstrap',
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.scrollable',
  consultationListItemModule,
  userAvatarModule
])
.controller('expertEmployeeDetailsModal', ExpertEmployeeDetailsModalController)
  .name;

export default expertEmployeeDetailsModalModule;
