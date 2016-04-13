(function() {
function proAlert(proTopAlertService){

  function linkFunction(scope, element, attr) {
    scope.alerts = []
    let addAlert = (alert)=> {
      scope.alerts.push(alert)
    }
    scope.destroyAlert = (id)=> {

    }
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