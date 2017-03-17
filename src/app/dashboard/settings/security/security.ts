import apiModule from 'profitelo-api-ng/api.module'
import {SessionApi} from 'profitelo-api-ng/api/api'
import {AccountDetails, GetSession} from 'profitelo-api-ng/model/models'
import {ModalsService} from '../../../../common/services/modals/modals.service'
import * as angular from 'angular'
import ITimeConstant = profitelo.constants.time.ITimeConstant
import userModule from '../../../../common/services/user/user'
import modalsModule from '../../../../common/services/modals/modals'
import {UserService} from '../../../../common/services/user/user.service'
import {ISecuritySettingsService} from '../../../../common/resolvers/security-settings/security-settings.service'
import 'common/resolvers/security-settings/security-settings.service'
import 'common/components/dashboard/settings/manage-devices/manage-devices'

interface ISession {
  device: string
  status: boolean
  city?: string
  system: string,
  apiKey: string
}

export class DashboardSettingsSecurityController implements ng.IController {
  public hasMobilePin: boolean
  public sessions: Array<ISession>


  constructor(private modalsService: ModalsService, user: AccountDetails, sessionsData: Array<GetSession>,
              timeConstant: ITimeConstant, private SessionApi: SessionApi, private $window: ng.IWindowService,
              private lodash: _.LoDashStatic) {
    this.hasMobilePin = user.hasMobilePin
    this.sessions = sessionsData.map((session) => {
      const minuteAgo = Date.now() - timeConstant.USER_ACTIVITY_LAST_MINUTE
      const deviceType = () => {
        if (session.userAgent && (session.userAgent.includes('Mac') || session.userAgent.includes('Win') )) {
          return 'desktop'
        } else if (session.userAgent && (session.userAgent.includes('Android'))) {
          return 'mobile'
        } else {
          return 'unknown'
        }
      }

      return {
        device: deviceType(),
        status: Date.parse(String(session.lastActivityAt)) > minuteAgo,
        city: session.city,
        system: String(session.userAgent),
        apiKey: session.apiKey
      }
    })
  }

  public removeSession = (apiKey: string) => {
    this.SessionApi.logoutRoute(apiKey).then(() => {
      this.lodash.remove(this.sessions, session => session.apiKey === apiKey)
      if (this.sessions.length === 0) {
        this.$window.location.reload()
      }
    }, (error) => {
      throw new Error('Can not delete this session ' + error)
    })
  }

  public openSecurityChangePasswordSettingsModal = () => {
    this.modalsService.createSecurityChangePasswordSettingsModal()
  }

  public openSecurityPinSecuritySettingsModal = () => {
    this.modalsService.createSecurityPinSecuritySettingsModal()
  }
}

angular.module('profitelo.controller.dashboard.settings.security', [
  'ui.router',
  userModule,
  apiModule,
  'ngLodash',
  'profitelo.constants.time',
  'profitelo.resolvers.security-settings',
  'profitelo.components.dashboard.settings.manage-devices',
  modalsModule
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.dashboard.settings.security', {
      url: '/security',
      template: require('./security.pug')(),
      controller: 'dashboardSettingsSecurityController',
      controllerAs: 'vm',
      resolve: {
        user: (userService: UserService) => {
          return userService.getUser(true)
        },
        sessionsData: (securitySettingsResolver: ISecuritySettingsService) => {
          return securitySettingsResolver.resolve()
        }
      }
    })
  })
  .controller('dashboardSettingsSecurityController', DashboardSettingsSecurityController)
