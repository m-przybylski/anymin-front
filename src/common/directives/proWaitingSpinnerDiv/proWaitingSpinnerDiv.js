angular.module('profitelo.directives.proWaitingSpinnerDiv', [
  'pascalprecht.translate'
])

.directive('proWaitingSpinnerDiv', function() {
  return {
    restrict:       'E',
    replace:        true,
    templateUrl:    'directives/proWaitingSpinnerDiv/proWaitingSpinnerDiv.tpl.html',
    scope: {
      isPending:    '='
    },
    link: function($scope) {
      if ($scope.isPending || $scope.isPending.length > 0) {
        $scope.isPending = true
      } else {
        $scope.isPending = false
      }
    }
  }
})