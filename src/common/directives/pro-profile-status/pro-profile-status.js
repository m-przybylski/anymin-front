angular.module('profitelo.directives.proProfileStatus', [])

.directive('proProfileStatus', () => {
  return {
    restrict:     'E',
    replace:      true,
    templateUrl:  'directives/pro-profile-status/pro-profile-status.tpl.html',
    scope: {
      status:     '=' // `on/off` or `true/false`
    },
    link: function($scope) {
      if ($scope.status === 'undefined' || !$scope.status || $scope.status === 'off') {
        $scope.status= 'off'
      } else {
        $scope.status= 'on'
      }

      $scope.colorClass = function(status) {
        if (status === 'on') {
          return 'text-success'
        } else {
          return 'text-danger'
        }
      }
    }
  }
})
