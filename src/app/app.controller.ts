import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IFilterService} from '../common/services/filter/filter.service'
import {InterfaceLanguageService} from '../common/services/interface-language/interface-language.service'
import {SessionService} from '../common/services/session/session.service'
import {TopAlertService} from '../common/services/top-alert/top-alert.service'

/* @ngInject */
export function AppComponentController($rootScope: IRootScopeService, $state: ng.ui.IStateService, $filter: IFilterService,
                                       InterfaceLanguageService: InterfaceLanguageService, sessionService: SessionService,
                                       topAlertService: TopAlertService) {

  InterfaceLanguageService.setLanguage(InterfaceLanguageService.getStartupLanguage())

  this.isPending = false

  this.logout = (targetState = 'app.home') => {

    let action = () => {
      this.isPending = false
      $rootScope.loggedIn = false
      topAlertService.success({
        message: $filter('translate')('LOGIN.SUCCESSFUL_LOGOUT'),
        timeout: 2
      })
      $state.go(targetState)
    }

    if (!this.isPending) {
      this.isPending = true
      sessionService.logout().then(action, action)
    }
  }

  return this
}
