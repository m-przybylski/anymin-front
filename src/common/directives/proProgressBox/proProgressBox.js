angular.module('profitelo.directive.proProgressBox', [
])

.directive('proProgressBox', () =>{
  function link(scope, element) {
    if (scope.container.status === 100) {
      element.addClass('full-progress')
    }

  }
  return {
    templateUrl:  'directives/proProgressBox/proProgressBox.tpl.html',
    restrict:     'A',
    scope:        { container: '='},
    controller:   ProgressBoxDirectiveController,
    controllerAs: 'vm',
    replace:      true,
    link:         link
  }
})

function ProgressBoxDirectiveController() {
  var vm = this
  return vm

}
