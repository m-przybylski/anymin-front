angular.module('profitelo.controller.expert-profile', [
  'ui.router',
  'profitelo.directives.interface.pro-top-navbar',
  'profitelo.directives.expert-profile.pro-expert-header',
  'profitelo.directives.expert-profile.pro-expert-single-consultation'
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
