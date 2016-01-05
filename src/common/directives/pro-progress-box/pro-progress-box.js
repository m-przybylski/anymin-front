angular.module('profitelo.directive.proProgressBox', [
])

.directive('proProgressBox', () =>{
  function link(scope, element) {
    if (scope.container.status === 100) {
      element.css({'background-color':'lightgreen'})
    }

  }
  return {
    templateUrl:  'directives/pro-progress-box/pro-progress-box.tpl.html',
    restrict:     'A',
    scope:        { container: '='},
    controller:   'ProgressBoxDirectiveController',
    controllerAs: 'vm',
    replace:      true,
    link:         link
  }
})

.controller('ProgressBoxDirectiveController', ProgressBoxDirectiveController)

function ProgressBoxDirectiveController() {
  var vm = this
  return vm

}
