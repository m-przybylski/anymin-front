// tslint:disable:no-duplicate-imports
import * as angular from 'angular';
import { StateProvider } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';
import generateWidget from '../../../../common/directives/generate-widget/generate-widget';

const dashboardExpertGenerateWidgetModule =
  angular.module('profitelo.controller.dashboard.expert.generate-widget', [
    uiRouter,
    generateWidget
  ])
    .config(['$stateProvider', ($stateProvider: StateProvider): void => {
      $stateProvider.state('app.dashboard.expert.widget', {
        url: '/generate-widget',
        template: require('./generate-widget.html'),
      });
    }]).name;

export default dashboardExpertGenerateWidgetModule;
