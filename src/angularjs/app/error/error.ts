// tslint:disable:no-duplicate-imports
import * as angular from 'angular';
import { StateProvider } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';

function ErrorController(): void {

  return this;
}

const errorPageModule = angular.module('profitelo.controller.error', [
  uiRouter
])
  .config(['$stateProvider', ($stateProvider: StateProvider): void => {
    $stateProvider.state('app.error', {
      template: require('./error.html'),
      controller: 'ErrorController',
      controllerAs: 'vm',
      data: {},
      resolve: {
        errorObj: [function (): void {
          return this.self.error;
        }]
      }
    });
  }])
  .controller('ErrorController', ErrorController)
  .name;

export default errorPageModule;
