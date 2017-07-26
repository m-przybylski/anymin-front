import * as angular from 'angular'

function ErrorController(): void {

  return this
}

const errorPageModule = angular.module('profitelo.controller.error', [
  'ui.router'
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.error', {
      template: require('./error.pug')(),
      controller: 'ErrorController',
      controllerAs: 'vm',
      data: {},
      resolve: {
        errorObj: [function (): void {
          return this.self.error
        }]
      }
    })
  })
  .controller('ErrorController', ErrorController)
  .name

export default errorPageModule;
