import * as angular from "angular"
import uiRouter from "angular-ui-router";


function ErrorController() {

  return this
}

const errorPageModule = angular.module('profitelo.controller.error', [
  "ui.router"
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.error', {
      template: require('./error.jade')(),
      controller: 'ErrorController',
      controllerAs: 'vm',
      data: {},
      resolve: {
        errorObj: [function () {
          return this.self.error
        }]
      }
    })
  })
  .controller('ErrorController', ErrorController)
  .name

export default errorPageModule;
