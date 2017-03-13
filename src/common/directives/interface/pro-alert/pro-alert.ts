import * as angular from "angular"
import {TopAlertService} from "../../../services/top-alert/top-alert.service"
import topAlertModule from "../../../services/top-alert/top-alert"

function proAlert(topAlertService: TopAlertService) {

  function linkFunction(scope: any, _element: ng.IRootElementService, _attr: ng.IAttributes) {
    scope.alerts = []
    let addAlert = (alerts: Array<any>) => {
      scope.alerts = alerts
    }

    scope.destroyAlert = (alertId: number) => {
      topAlertService.destroyAlert(alertId)
    }

    topAlertService.bindAlert(addAlert)

  }

  return {
    template: require('./pro-alert.jade')(),
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
