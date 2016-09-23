(function() {
  function HomeController($window, $scope) {

    this.searchMask = true

    this.nextSlide = () => {
      this.controlls.nextSlide()
    }

    this.prevSlide = () => {
      this.controlls.prevSlide()
    }

    this.newsPrevSlide = () => {
      this.newsControlls.prevSlide()
    }

    this.newsNextSlide = () => {
      this.newsControlls.nextSlide()
    }

    this.searchMaskDeactive = () => {
      this.searchMask = true
    }

    angular.element(angular.element(document).find('.search-active-mask')).on('whell mousewheel', (e) => {
      this.searchMask = true
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

    this.newsSlider = [
      {
        img: 'http://chicksbymail.com/wp-content/uploads/2016/08/hipster-floral-tumblr-background-ulzzangnet-background-images-floral-tumblrflowers-hipster-floral-print-dress-zara-tattoo-hearts-tumblr-bp8xkytr-1200x600.jpg',
        title: 'Title 1',
        descriptions: 'Stu Unger Rise And Fall Of A Poker Genius'
      },
      {
        img: 'http://chicksbymail.com/wp-content/uploads/2016/08/hipster-floral-tumblr-background-ulzzangnet-background-images-floral-tumblrflowers-hipster-floral-print-dress-zara-tattoo-hearts-tumblr-bp8xkytr-1200x600.jpg',
        title: 'Title 2',
        descriptions: 'Stu Unger Rise And Fasd'
      },
      {
        img: 'http://chicksbymail.com/wp-content/uploads/2016/08/hipster-floral-tumblr-background-ulzzangnet-background-images-floral-tumblrflowers-hipster-floral-print-dress-zara-tattoo-hearts-tumblr-bp8xkytr-1200x600.jpg',
        title: 'Title 3',
        descriptions: 'Stu Unger Rise And Fall Of A Poker Genius, Stu Unger Rise And Fall Of A Poker Genius, Stu Unger Rise And Fall Of A Poker Genius'
      },
      {
        img: 'http://chicksbymail.com/wp-content/uploads/2016/08/hipster-floral-tumblr-background-ulzzangnet-background-images-floral-tumblrflowers-hipster-floral-print-dress-zara-tattoo-hearts-tumblr-bp8xkytr-1200x600.jpg',
        title: 'Title 4',
        descriptions: 'Stu Unger Rise And Fall Of A Poker Genius Stu Unger Rise And Fall Of A Poker Genius'
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
