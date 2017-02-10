namespace profitelo.directives.interface.proAlert {

  import ITopAlertService = profitelo.services.topAlert.ITopAlertService

  function proAlert(topAlertService: ITopAlertService) {

    function linkFunction(scope: any, _element: ng.IRootElementService, _attr: ng.IAttributes) {
      scope.alerts = []
      let addAlert = (alerts: Array<any>)=> {
        scope.alerts = alerts
      }

      scope.destroyAlert = (alertId: number)=> {
        topAlertService.destroyAlert(alertId)
      }

      topAlertService.bindAlert(addAlert)

    }

    return {
      templateUrl:  'directives/interface/pro-alert/pro-alert.tpl.html',
      restrict:     'E',
      replace:      true,
      link: linkFunction,
      scope: {}
    }
  }

  angular.module('profitelo.directives.interface.pro-alert', [
    'profitelo.services.top-alert'
  ])
    .directive('proAlert', proAlert)
}
