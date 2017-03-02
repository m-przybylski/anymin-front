namespace profitelo.dashboard.settings.security {

  import IModalsService = profitelo.services.modals.IModalsService
  import IUserService = profitelo.services.user.IUserService
  import AccountDetails = profitelo.api.AccountDetails
  import ISecuritySettingsService = profitelo.resolvers.securitySettings.ISecuritySettingsService
  import GetSession = profitelo.api.GetSession
  import ITimeConstant = profitelo.constants.time.ITimeConstant
  import ISessionApi = profitelo.api.ISessionApi

  interface ISession {
    device: string
    status: boolean
    city: string
    system: string,
    apiKey: string
  }

  export class DashboardSettingsSecurityController implements ng.IController {
    public hasMobilePin: boolean
    public sessions: Array<ISession>


    constructor(private modalsService: IModalsService, user: AccountDetails, sessionsData: Array<GetSession>,
                timeConstant: ITimeConstant, private SessionApi: ISessionApi) {
      this.hasMobilePin = user.hasMobilePin
      this.sessions = sessionsData.map((session) => {
        const minuteAgo = Date.now() - timeConstant.USER_ACTIVITY_LAST_MINUTE
        const deviceType = () => {
          if (session.userAgent && (session.userAgent.includes('Mac') || session.userAgent.includes('Win') )) {
            return 'desktop'
          } else if(session.userAgent && (session.userAgent.includes('Android'))) {
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
      console.log(apiKey)
      this.SessionApi.logoutRoute(apiKey).then(() => {
        _.remove(this.sessions, session => session.apiKey == apiKey)
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
    'profitelo.services.user',
    'profitelo.api.SessionApi',
    'ngLodash',
    'profitelo.constants.time',
    'profitelo.resolvers.security-settings',
    'profitelo.components.dashboard.settings.manage-devices',
    'profitelo.services.modals'
  ])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.dashboard.settings.security', {
      url: '/security',
      templateUrl: 'dashboard/settings/security/security.tpl.html',
      controller: 'dashboardSettingsSecurityController',
      controllerAs: 'vm',
      resolve: {
        user: (userService: IUserService) => {
          return userService.getUser(true)
        },
        sessionsData: (securitySettingsResolver: ISecuritySettingsService) => {
          return securitySettingsResolver.resolve()
        }
      }
    })
  })
  .controller('dashboardSettingsSecurityController', DashboardSettingsSecurityController)
}
