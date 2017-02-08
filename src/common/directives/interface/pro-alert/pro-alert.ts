(function() {
  function proAlert(topAlertService) {

    function linkFunction(scope, _element: ng.IRootElementService, _attr) {
      scope.alerts = []
      let addAlert = (alerts)=> {
        scope.alerts = alerts
      }

      scope.destroyAlert = (alertId)=> {
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

}())
