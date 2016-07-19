(function() {
  function HomeController() {

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
    this.newsTile = [
      {
        title: 'Stu Unger Rise And Fall Of A Poker Genius',
        teaser: 'Many of us are so used to working on a computer desktop that when it comes time to purchase...',
        numberOfComments: '99',
        numberOfLikes: '99',
        publishDate: '2016-02-24'
      }
    ]
    this.adviceTile = [
      {
        title: 'Stu Unger Rise And Fall Of A Poker Genius',
        teaser: 'Many of us are so used to working on a computer desktop that when it comes time to purchase...',
        numberOfComments: '99',
        numberOfLikes: '99',
        publishDate: '2016-02-24'
      }
    ]

    return this
  }

  angular.module('profitelo.controller.home', [
    'ui.router',
    'c7s.ng.userAuth',
    'profitelo.directives.pro-expert-card',
    'profitelo.directives.pro-expert-see-more',
    'profitelo.directives.pro-advice-tile',
    'profitelo.directives.pro-news-tile',
    'profitelo.components.pro-search-dropdown'
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
}())