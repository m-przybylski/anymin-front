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
      },
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
      },
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
