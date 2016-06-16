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
      name: 'Ragnar Lodbrok',
      status: 'available'
    },
    {
      name: 'Penelope Cruz',
      status: 'not-available'
    },
    {
      name: 'Ironman',
      status: 'busy'
    }
  ]
  return this
}
