function proCreateNewServiceDescriptionController($scope, $filter, $http, toastr, _) {
  var vm = this

  var _account      = $scope.account
  var _userProfiles = $scope.userProfiles

  vm.save = () => {

  }

  return vm
}

angular.module('profitelo.directives.wizards.pro-create-new-service-description', [
  'ngAnimate',
  'toastr',  // some parts depends on ngAnimate
  'lodash',

  // internal scripts
  'profitelo.api.profiles'
])

.directive('proCreateNewServiceDescription', function() {
  return {
    replace:        true,
    templateUrl:    'directives/wizards/pro-create-new-service-description/pro-create-new-service-description.tpl.html',
    controller:     proCreateNewServiceDescriptionController,
    controllerAs:   'vm',
    scope: {
      userProfile:  '='
    }
  }
})

