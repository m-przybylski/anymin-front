angular.module('profitelo.controller.home', [
  'ui.router',
  'c7s.ng.userAuth',
  'profitelo.directives.pro-expert-card',
  'profitelo.directives.pro-expert-see-more'
])
.config(($stateProvider, UserRolesProvider) => {
  $stateProvider.state('app.home', {
    url: '/home',
    controllerAs: 'vm',
    controller: 'HomeController',
    templateUrl: 'home/home.tpl.html',
    data          : {
      access : UserRolesProvider.getAccessLevel('public'),
      pageTitle: 'PAGE_TITLE.HOME'
    }
  })
})
.controller('HomeController', HomeController)

function HomeController($scope) {
  this.expertCard = [
    {
      status: 'available',
      label: 'HOME.EXPERT_CARD_AVAILABLE'
    },
    {
      status: 'not-available',
      label: 'HOME.EXPERT_CARD_NOT_AVAILABLE'
    },
    {
      status: 'busy',
      label: 'HOME.EXPERT_CARD_BUSY'
    }
  ]
  return this
}
