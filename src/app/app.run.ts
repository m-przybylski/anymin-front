import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {PermissionService} from '../common/services/permission/permission.service'
import {SessionService} from '../common/services/session/session.service'
import {TopAlertService} from '../common/services/top-alert/top-alert.service'
import {ProfiteloWebsocketService} from '../common/services/profitelo-websocket/profitelo-websocket.service'

/* @ngInject */
export function AppRunFunction($rootScope: IRootScopeService, $log: ng.ILogService, permissionService: PermissionService,
                               $anchorScroll: ng.IAnchorScrollService, sessionService: SessionService,
                               $urlRouter: ng.ui.IUrlRouterService, $state: ng.ui.IStateService,
                               topAlertService: TopAlertService, profiteloWebsocket: ProfiteloWebsocketService): void {

  // initialize all views permissions
  permissionService.initializeAll()

  // initialize websocket service
  profiteloWebsocket.initializeWebsocket()

  // scrollup after every state change
  $rootScope.$on('$locationChangeSuccess', () => {
    $anchorScroll()
  })
  $rootScope.$on('$stateChangeError', (event, _toState, _toParams, _fromState, _fromParams, error) => {
    $log.error(error)
    event.preventDefault()
    topAlertService.error({
      message: 'error',
      timeout: 4
    })
  })

  $rootScope.$on('$stateChangePermissionDenied', (event, toState, _toParams, _options) => {
    event.preventDefault()
    $log.error('Permission to state', toState.name, 'DENIED')
    $state.go('app.home')
  })

  sessionService.getSession().then(() => {
    $urlRouter.listen()
    $urlRouter.sync()
  }, () => {
    $urlRouter.listen()
    $urlRouter.sync()

  })
}
