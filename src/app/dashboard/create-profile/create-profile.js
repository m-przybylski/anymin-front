angular.module('profitelo.controller.dashboard.create-profile', [
  'ui.router'
])
.config(($stateProvider) =>{
  $stateProvider.state('app.dashboard.create-profile', {
    controllerAs: 'vm',
    url: '/create-profile',
    templateUrl: 'dashboard/create-profile/create-profile.tpl.html',
    controller: 'DashboardCreateProfileController'
  })
})
.controller('DashboardCreateProfileController', DashboardCreateProfileController)


function DashboardCreateProfileController() {
  var vm = this
  
  return vm
}
