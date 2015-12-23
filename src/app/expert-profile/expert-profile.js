angular.module('profitelo.controller.expert-profile', [
    'ui.router'
  ])
  .config(($stateProvider) =>{
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

  console.log('Expert Profile');

  return vm;

}
