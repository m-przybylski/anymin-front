import * as angular from 'angular';
import { InvitationsModalController } from './invitations.controller';
import userAvatarModule from '../../../common/components/interface/user-avatar/user-avatar';
import consultationListItemModule
  from '../../../common/components/invitations/consultation-list-item/consultation-list-item';
import noResultsInformationModule
  from '../../../common/components/dashboard/no-results-information/no-results-information';
import userModule from '../../../common/services/user/user';
import translatorModule from '../../../common/services/translator/translator';

const invitationsModalModule = angular.module('profitelo.components.invitations.modals.invitations', [
  'ui.bootstrap',
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.scrollable',
  'pascalprecht.translate',
  userAvatarModule,
  userModule,
  consultationListItemModule,
  noResultsInformationModule,
  translatorModule
])
.controller('invitationsModal', InvitationsModalController)
  .name;

export default invitationsModalModule;
