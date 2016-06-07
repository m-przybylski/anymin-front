angular.module('profitelo.controller.expert-profile', [
  'ui.router'
])
.config(($stateProvider, UserRolesProvider) => {
  $stateProvider.state('app.expert-profile', {
    controllerAs: 'vm',
    url: '/expert-profile',
    templateUrl: 'expert-profile/expert-profile.tpl.html',
    controller: 'ExpertProfileController',
    data          : {
      access : UserRolesProvider.getAccessLevel('public')
    }
  })
})
.controller('ExpertProfileController', ExpertProfileController)


function ExpertProfileController() {
  var vm = this


  return vm
}
