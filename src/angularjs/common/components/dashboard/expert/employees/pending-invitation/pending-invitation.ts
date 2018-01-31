import * as angular from 'angular';
import { PendingInvitationComponent } from './pending-invitation.component';
import 'angular-translate';
import userAvatarModule from '../../../../interface/user-avatar/user-avatar';
import apiModule from 'profitelo-api-ng/api.module';
import errorHandlerModule from '../../../../../services/error-handler/error-handler';
import topAlertModule from '../../../../../services/top-alert/top-alert';
import translatorModule from '../../../../../services/translator/translator';
import { GetInvitation } from 'profitelo-api-ng/model/models';

export interface IPendingInvitationComponentBindings extends ng.IController {
  invitations: GetInvitation[];
  onDeleteCallback: () => void;
}

const pendingInvitationModule: string =
  angular.module('profitelo.components.dashboard.expert.employees.pending-invitation', [
  'pascalprecht.translate',
  userAvatarModule,
  apiModule,
  errorHandlerModule,
  topAlertModule,
  translatorModule
])
.component('pendingInvitation', new PendingInvitationComponent())
  .name;

export default pendingInvitationModule;
