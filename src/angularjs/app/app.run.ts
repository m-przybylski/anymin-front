import {PermissionService} from '../common/services/permission/permission.service'
import {SessionServiceWrapper} from '../common/services/session/session.service'
import {TopAlertService} from '../common/services/top-alert/top-alert.service'
import {ProfiteloWebsocketService} from '../common/services/profitelo-websocket/profitelo-websocket.service'
import {Config} from './config';
import {SessionDeletedService} from '../common/services/session-deleted/session-deleted.service'
import {EventsService} from '../common/services/events/events.service'
import {IRootScopeService} from '../common/services/root-scope/root-scope.service';

/* @ngInject */
export function AppRunFunction($rootScope: IRootScopeService,
                               $log: ng.ILogService,
                               permissionService: PermissionService,
                               $anchorScroll: ng.IAnchorScrollService,
                               eventsService: EventsService,
                               sessionServiceWrapper: SessionServiceWrapper,
                               $urlRouter: ng.ui.IUrlRouterService,
                               $state: ng.ui.IStateService,
                               topAlertService: TopAlertService,
                               sessionDeletedService: SessionDeletedService,
                               profiteloWebsocket: ProfiteloWebsocketService): void {
  // initialize all views permissions
  permissionService.initializeAll()

  // initialize websocket service
  profiteloWebsocket.initializeWebsocket()
  sessionDeletedService.init()

  eventsService.on('logout', () => $state.go('app.login.account'))

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
    if (Config.isPlatformForExpert) {
      $state.go('app.login.account')
    } else {
      $state.go('app.home')
    }
  })

  sessionServiceWrapper.getSession().then(() => {
    $urlRouter.listen()
    $urlRouter.sync()
  }, () => {
    $urlRouter.listen()
    $urlRouter.sync()

  })
}
