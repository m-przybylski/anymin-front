function proCreateNewServiceCategoryController($scope, $filter, $http, toastr, _) {
  var vm = this

  var _account      = $scope.account
  var _userProfiles = $scope.userProfiles

  vm.save = () => {

  }
  vm.categories = ['Podatki', 'Prawo finansowe', 'Księgowość', 'Prawo podatkowe', 'Dokumenty', 'Pomoc biurowa', 'Biuro rachunkowe', 'Inwestycje']
  return vm
}

angular.module('profitelo.directives.wizards.pro-create-new-service-category', [
  'ngAnimate',
  'toastr',  // some parts depends on ngAnimate
  'lodash',

  // internal scripts
  'profitelo.api.profiles'
])

.directive('proCreateNewServiceCategory', function() {
  return {
    replace:        true,
    templateUrl:    'directives/wizards/pro-create-new-service-category/pro-create-new-service-category.tpl.html',
    controller:     proCreateNewServiceCategoryController,
    controllerAs:   'vm',
    scope: {
      userProfile:  '='
    }
  }
})

