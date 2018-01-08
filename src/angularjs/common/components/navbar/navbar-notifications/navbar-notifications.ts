import * as angular from 'angular'
import {NavbarNotificationsComponent} from './navbar-notifications.component'
import userAvatarModule from '../../interface/user-avatar/user-avatar'
import noResultsInformationModule from '../../dashboard/no-results-information/no-results-information'
import modalsModule from '../../../services/modals/modals'
import apiModule from 'profitelo-api-ng/api.module'
import {NavbarNotificationsService} from './navbar-notifications.service'
import {GetProfileWithServicesInvitations} from 'profitelo-api-ng/model/models'

export interface INavbarNotificationsComponentBindings extends ng.IController {
  isNotificationsTab: boolean
  isInvitationsTab: boolean
  onClick: () => void
  invitations: GetProfileWithServicesInvitations[]
}

const navbarNotificationsModule = angular.module('profitelo.components.navbar.navbar-notifications', [
  'pascalprecht.translate',
  userAvatarModule,
  'ui.router',
  noResultsInformationModule,
  modalsModule,
  apiModule
])
.service('navbarNotificationsService', NavbarNotificationsService)
.component('navbarNotifications', new NavbarNotificationsComponent)
  .name

export default navbarNotificationsModule
