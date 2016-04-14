(function() {
  function proAlert(proTopAlertService) {

    function linkFunction(scope, element, attr) {
      scope.alerts = []
      let addAlert = (alerts)=> {
        scope.alerts = alerts
      }
      scope.destroyAlert = (alertId)=> {
        for (var i = 0; i < scope.alerts.length; i++) {
          if (scope.alerts[i].id === alertId) {
            scope.alerts.splice(i, 1)
          }
        }
      }
      proTopAlertService.bindAlert(addAlert)
    }


    return {
      templateUrl:  'directives/interface/pro-alert/pro-alert.tpl.html',
      restrict:     'E',
      replace:      true,
      link: linkFunction

    }
  }

  angular.module('profitelo.directives.interface.pro-alert', [])
  .directive('proAlert', proAlert)

}())