angular.module('profitelo.controller.expert-profile', [
  'ui.router',
  'profitelo.directive.pro-question-mark'
])
.config(($stateProvider) => {
  $stateProvider.state('app.expert-profile', {
    url: '/expert-profile',
    controllerAs: 'vm',
    controller: 'ExpertProfileController',
    templateUrl: 'expert-profile/expert-profile.tpl.html'
  });
})
.controller('ExpertProfileController', ExpertProfileController);

function ExpertProfileController() {
  var vm = this;

  vm.profile = {}
  vm.profile.progressPercentage = 40

  return vm;

}
