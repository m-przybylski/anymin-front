(function() {
  function HomeController($scope, smoothScrolling) {

    this.interfaceController = {}

    this.interfaceController.hideSearchMask = true
    this.nextSlide = () => {
      this.controlls.nextSlide()
    }

    this.prevSlide = () => {
      this.controlls.prevSlide()
    }

    this.onSearchFocus = () => {
      this.interfaceController.hideSearchMask = false
      const searchInputOnPage = angular.element(document).find('.search-bar-container .search-bar')[1]
      smoothScrolling.simpleScrollTo(searchInputOnPage, true)
    }

    angular.element(angular.element(document).find('.search-active-mask')).on('whell mousewheel', (e) => {
      this.interfaceController.hideSearchMask = true
      $scope.$digest()
    })


    this.expertCard = [
      {
        id: '0', 
        value: {
          name: '1 Slide',
          status: 'not-available',
          avatar: 'https://placekitten.com/50/50',
          description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
        }
      },
      {
        id: '1',
        value: {
          name: '2 Slide',
          status: 'not-available',
          avatar: 'https://placekitten.com/50/50',
          description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
        }
      },
      {
        id: '2',
        value: {
          name: '3 Slide',
          status: 'not-available',
          avatar: 'https://placekitten.com/50/50',
          description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
        }
      },
      {
        id: '3',
        value: {
          name: '4 Slide',
          status: 'not-available',
          avatar: 'https://placekitten.com/50/50',
          description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
        }
      },
      {
        id: '4',
        value: {
          name: '5 Slide',
          status: 'not-available',
          avatar: 'https://placekitten.com/50/50',
          description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
        }
      },
      {
        id: '5',
        value: {
          name: '6 Slide',
          status: 'not-available',
          avatar: 'https://placekitten.com/50/50',
          description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
        }
      },
      {
        id: '6',
        value: {
          name: '7 Slide',
          status: 'not-available',
          avatar: 'https://placekitten.com/50/50',
          description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
        }
      },
      {
        id: '7',
        value: {
          name: '8 Slide',
          status: 'not-available',
          avatar: 'https://placekitten.com/50/50',
          description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
        }
      },
      {
        id: '8',
        value: {
          name: '9 Slide',
          status: 'not-available',
          avatar: 'https://placekitten.com/50/50',
          description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
        }
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

    this.similarExperts = [
      {
        name: 'Stu Unger Rise And Fall Of A Poker Genius',
        numberOfCalls: 2,
        satisfaction: 2,
        price: 10000,
        owner: {
          name: 'Janek Dzbanek',
          img: null,
          type: 'EXP'
        }
      },
      {
        name: 'Stu Unger Rise And Fall Of A Poker Genius',
        numberOfCalls: 2,
        satisfaction: 2,
        price: 10000,
        owner: {
          name: 'Janek Dzbanek',
          img: null,
          type: 'EXP'
        }
      },
      {
        name: 'Stu Unger Rise And Fall Of A Poker Genius',
        numberOfCalls: 2,
        satisfaction: 2,
        price: 10000,
        owner: {
          name: 'Janek Dzbanek',
          img: null,
          type: 'EXP'
        }
      },
      {
        name: 'Stu Unger Rise And Fall Of A Poker Genius',
        numberOfCalls: 2,
        satisfaction: 2,
        price: 10000,
        owner: {
          name: 'Janek Dzbanek',
          img: null,
          type: 'EXP'
        }
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
    'profitelo.components.expert-profile.similar-experts-slider',
    'profitelo.directives.pro-top-navbar',
    'profitelo.components.pro-search-dropdown',
    'profitelo.components.interface.slider'
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
