import * as angular from 'angular'
import {TopAlertService} from '../../../services/top-alert/top-alert.service'
import topAlertModule from '../../../services/top-alert/top-alert'
import {IDirective} from 'angular'

function proAlert(topAlertService: TopAlertService): IDirective {

  function linkFunction(scope: any, _element: ng.IRootElementService, _attr: ng.IAttributes): void {
    scope.alerts = []
    const addAlert = (alerts: any[]): void => {
      scope.alerts = alerts
    }

    scope.destroyAlert = (alertId: number): void => {
      topAlertService.destroyAlert(alertId)
    }

    topAlertService.bindAlert(addAlert)

  }

  return {
    template: require('./pro-alert.pug')(),
    restrict: 'E',
    replace: true,
    link: linkFunction,
    scope: {}
  }
}

angular.module('profitelo.directives.interface.pro-alert', [
  topAlertModule
])
  .directive('proAlert', proAlert)
