import * as angular from 'angular'
import {NoInvitationsModalController} from './no-invitations.controller'
import noContentMessageModule from '../../../dashboard/no-content-message/no-content-message'

const noInvitationsModalModule = angular.module('profitelo.components.invitations.modals.no-invitations', [
  'ui.bootstrap',
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.scrollable',
  noContentMessageModule
])
.controller('noInvitationsModal', NoInvitationsModalController)
  .name

export default noInvitationsModalModule
