(function() {
  function HomeController() {

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

    this.expertCard = [
      {
        id: '1',
        value: {
          name: '1 Slide',
          status: 'not-available'
        }
      },
      {
        id: '2',
        value: {
          name: '2 Slide',
          status: 'not-available'
        }
      },
      {
        id: '3',
        value: {
          name: '3 Slide',
          status: 'not-available'
        }
      },
      {
        id: '4',
        value: {
          name: '4 Slide',
          status: 'not-available'
        }
      },
      {
        id: '5',
        value: {
          name: '5 Slide',
          status: 'not-available'
        }
      },
      {
        id: '6',
        value: {
          name: '6 Slide',
          status: 'not-available'
        }
      },
      {
        id: '7',
        value: {
          name: '7 Slide',
          status: 'not-available'
        }
      },
      {
        id: '8',
        value: {
          name: '8 Slide',
          status: 'not-available'
        }
      },
      {
        id: '9',
        value: {
          name: '9 Slide',
          status: 'not-available'
        }
      },
      {
        id: '10',
        value: {
          name: '10 Slide',
          status: 'not-available'
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
