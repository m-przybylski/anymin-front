function ProCreateNewServiceNameController($scope, $filter, $http, toastr, _) {
  var vm = this

  var _account      = $scope.account
  var _userProfiles = $scope.userProfiles

  return vm
}

angular.module('profitelo.directives.wizards.pro-create-new-service-name', [
  'ngAnimate',
  'toastr',  // some parts depends on ngAnimate
  'lodash',

  // internal scripts
  'profitelo.api.profiles'
])

.directive('proCreateNewServiceName', function() {
  return {
    replace:        true,
    templateUrl:    'directives/wizards/pro-create-new-service-name/pro-create-new-service-name.tpl.html',
    controller:     ProCreateNewServiceNameController,
    controllerAs:   'vm',
    scope: {
      serviceState: '=',
      userProfile:  '='
    }
  }
})

