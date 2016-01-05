function proProgressBarController($scope) {

  var vm = this
  vm.progress = $scope.progress

  if (!vm.progress) {
    vm.progress = 0
  }
  return vm


}

angular.module('profitelo.directives.proProgressBar', [
  'pascalprecht.translate'
])
.directive('proProgressBar', function() {
  return {
    restrict:     'EA',
    replace:      true,
    templateUrl:  'directives/proProgressBar/proProgressBar.tpl.html',
    controller:   proProgressBarController,
    controllerAs: 'vm',
    scope: {
      progress: '=?proProgressBar'
    }
  }
})
