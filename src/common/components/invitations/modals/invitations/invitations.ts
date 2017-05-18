import * as angular from 'angular'
import {InvitationsModalController} from './invitations.controller'
import userAvatarModule from '../../../interface/user-avatar/user-avatar'
import './invitations.sass'
import consultationListItemModule from '../../../dashboard/shared/consultation-list-item/consultation-list-item'

const invitationsModalModule = angular.module('profitelo.components.invitations.modals.invitations', [
  'ui.bootstrap',
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.scrollable',
  userAvatarModule,
  consultationListItemModule
])
.controller('invitationsModal', InvitationsModalController)
  .name

export default invitationsModalModule
