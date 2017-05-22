import * as angular from 'angular'
import {NavbarNotificationsComponent} from './navbar-notifications.component'
import './navbar-notifications.sass'
import userAvatarModule from '../../interface/user-avatar/user-avatar'
import noContentMessageModule from '../../dashboard/no-content-message/no-content-message'
import modalsModule from '../../../services/modals/modals'

export interface INavbarNotificationsComponentBindings extends ng.IController {
  isNotificationsTab: boolean
  isInvitationsTab: boolean
  onClick: () => void
}

const navbarNotificationsModule = angular.module('profitelo.components.navbar.navbar-notifications', [
  'pascalprecht.translate',
  userAvatarModule,
  noContentMessageModule,
  modalsModule
])
.component('navbarNotifications', new NavbarNotificationsComponent)
  .name

export default navbarNotificationsModule
