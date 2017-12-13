import * as _ from 'lodash'
import apiModule from 'profitelo-api-ng/api.module'
import {SessionApi} from 'profitelo-api-ng/api/api'
import {GetSession} from 'profitelo-api-ng/model/models'
import {ModalsService} from '../../../../common/services/modals/modals.service'
import * as angular from 'angular'
import userModule from '../../../../common/services/user/user'
import modalsModule from '../../../../common/services/modals/modals'
import {ISecuritySettingsService} from '../../../../common/resolvers/security-settings/security-settings.service'
import 'common/resolvers/security-settings/security-settings.service'
import 'common/components/dashboard/settings/manage-devices/manage-devices'
import {SessionService} from '../../../../common/services/session/session.service'
import {UserService} from '../../../../common/services/user/user.service'
import {IStateService} from 'angular-ui-router'
import {TopAlertService} from '../../../../common/services/top-alert/top-alert.service'
import topAlertModule from '../../../../common/services/top-alert/top-alert'
import {TranslatorService} from '../../../../common/services/translator/translator.service'

interface ISession {
  device: string
  status: boolean
  city?: string
  system: string,
  apiKey: string
}

export class DashboardSettingsSecurityController implements ng.IController {
  public hasMobilePin: boolean
  public sessions: ISession[]

  constructor(private modalsService: ModalsService, private currentSession: GetSession, sessionsData: GetSession[],
              private SessionApi: SessionApi, private userService: UserService,
              private $state: IStateService, private topAlertService: TopAlertService,
              private translatorService: TranslatorService) {

    if (currentSession.account) {
      this.hasMobilePin = currentSession.account.hasMobilePin
    }

    this.sessions = sessionsData.map((session) => {
      const deviceType = (): string => {
        if (
          session.userAgent && (
          session.userAgent.includes('Win') ||
          session.userAgent.includes('Mac') ||
          session.userAgent.includes('Linux'))
        ) {
          return 'desktop'
        } else if (
          session.userAgent && (session.userAgent.includes('Android') ||
          session.userAgent.includes('Mobile') ||
          session.userAgent.includes('iOS') ||
          session.userAgent.includes('Windows Phone'))
        ) {
          return 'mobile'
        } else {
          return 'unknown'
        }
      }

      return {
        device: deviceType(),
        status: currentSession.apiKey === session.apiKey,
        city: session.city,
        system: String(session.userAgent),
        apiKey: session.apiKey
      }
    })
  }

  public removeSession = (apiKey: string): void => {
    if (this.currentSession.apiKey !== apiKey) {
      this.SessionApi.logoutRoute(apiKey).then(() => {
        _.remove(this.sessions, session => session.apiKey === apiKey)
      }, (error) => {
        throw new Error('Can not delete this session ' + error)
      })
    } else {
      this.userService.logout().then(() => {
        this.$state.reload()
        this.topAlertService.success({
          message: this.translatorService.translate('LOGIN.SUCCESSFUL_LOGOUT'),
          timeout: 2
        })
      })
    }
  }

  public checkIsCurrentSession = (apiKey: string): boolean => apiKey === this.currentSession.apiKey

  public openSecurityChangePasswordSettingsModal = (): void => {
    this.modalsService.createSecurityChangePasswordSettingsModal()
  }

  public openSecurityPinSecuritySettingsModal = (): void => {
    this.modalsService.createSecurityPinSecuritySettingsModal()
  }
}

angular.module('profitelo.controller.dashboard.settings.security', [
  'ui.router',
  userModule,
  apiModule,
  topAlertModule,
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
      currentSession: (sessionService: SessionService): ng.IPromise<GetSession> => sessionService.getSession(true),
      sessionsData: (securitySettingsResolver: ISecuritySettingsService): ng.IPromise<GetSession[]> =>
        securitySettingsResolver.resolve()
    }
  })
})
.controller('dashboardSettingsSecurityController', DashboardSettingsSecurityController)
