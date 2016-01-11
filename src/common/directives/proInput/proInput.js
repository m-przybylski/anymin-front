function proInput($scope) {
  var vm = this


  vm.iconClass  = $scope.iconClass

  console.log($scope.toolTip)
  return vm
}


angular.module('profitelo.directives.proInput', [
  'pascalprecht.translate'
])
.directive('proInput', function() {
  return {
    restrict:     'EA',
    replace:      true,
    controllerAs: 'vm',
    templateUrl:  'directives/proInput/proInput.tpl.html',
    controller:   proInput,
    scope: {
      toolTip:    '=',
      model:      '=',
      iconClass:  '='
    }
  }
})

