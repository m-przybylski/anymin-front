// tslint:disable:no-require-imports
// tslint:disable:no-null-keyword
// tslint:disable:no-invalid-this
// tslint:disable:no-import-side-effect
// tslint:disable:no-implicit-dependencies
// tslint:disable:no-duplicate-imports
// tslint:disable:curly
import * as angular from 'angular';
import sessionModule from '../../common/services/session/session';
import smoothScrollingModule from '../../common/services/smooth-scrolling/smooth-scrolling';
import 'angularjs/common/directives/expert-profile/pro-expert-card/pro-expert-card';
import 'angularjs/common/directives/expert-profile/pro-expert-see-more/pro-expert-see-more';
import 'angularjs/common/directives/pro-advice-tile/pro-advice-tile';
import 'angularjs/common/directives/pro-news-tile/pro-news-tile';
import 'angularjs/common/components/expert-profile/similar-experts-slider/similar-experts-slider';
import 'angularjs/common/components/interface/slider/slider';
import navbarModule from '../../common/components/navbar/navbar';
import { Config } from '../../../config';
import { StateService, StateProvider } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';
import { UserService } from '../../common/services/user/user.service';

function HomeController(): void {

  this.interfaceController = {};

  this.interfaceController.hideSearchMask = true;
  this.nextSlide = (): void => {
    this.controlls.nextSlide();
  };

  this.prevSlide = (): void => {
    this.controlls.prevSlide();
  };

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
  ];
  this.newsTile = [
    {
      title: 'Stu Unger Rise And Fall Of A Poker Genius',
      teaser: 'Many of us are so used to working on a computer desktop that when it comes time to purchase...',
      numberOfComments: '99',
      numberOfLikes: '99',
      publishDate: '2016-02-24'
    }
  ];
  this.adviceTile = [
    {
      title: 'Stu Unger Rise And Fall Of A Poker Genius',
      teaser: 'Many of us are so used to working on a computer desktop that when it comes time to purchase...',
      numberOfComments: '99',
      numberOfLikes: '99',
      publishDate: '2016-02-24'
    }
  ];

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
  ];

  return this;
}

const homePageModule = angular.module('profitelo.controller.home', [
  sessionModule,
  smoothScrollingModule,
  navbarModule,
  uiRouter,
  'profitelo.directives.pro-expert-card',
  'profitelo.directives.pro-expert-see-more',
  'profitelo.directives.pro-advice-tile',
  'profitelo.directives.pro-news-tile',
  'profitelo.components.expert-profile.similar-experts-slider',
  'profitelo.components.interface.slider'
])
  .config(['$stateProvider', ($stateProvider: StateProvider): void => {
    $stateProvider.state('app.home', {
      url: '/home',
      controllerAs: 'vm',
      controller: 'HomeController',
      template: require('./home.html'),
      resolve: {
        isPlatformForExpert: ['userService', '$state', (userService: UserService, $state: StateService): void => {
          if (Config.isPlatformForExpert)
            userService.getUser().then((response) => {
              if (!response.hasPassword) $state.go('app.post-register.set-password');
              else if (!response.unverifiedEmail && !response.email) $state.go('app.post-register.set-email');
              else $state.go('app.dashboard.expert.activities');
            });
        }]
      },
      data: {
        pageTitle: 'PAGE_TITLE.HOME',
        permissions: {
          except: ['partially-registered'],
          redirectTo: 'app.post-register.set-password'
        },
      }
    });
  }])
  .controller('HomeController', HomeController)
  .name;

export default homePageModule;
