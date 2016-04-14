(function() {
  function proAlert(proTopAlertService) {

    function linkFunction(scope, element, attr) {
      scope.alerts = []
      let addAlert = (alerts)=> {
        scope.alerts = alerts
      }
      scope.destroyAlert = (alertId)=> {
        _.remove(scope.alerts, (alert)=> {
          return alert.id === alertId
        })
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

  angular.module('profitelo.directives.interface.pro-alert', [
    'profitelo.directives.pro-top-alert-service'
  ])
  .directive('proAlert', proAlert)

}())