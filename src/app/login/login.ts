import * as angular from "angular"
import "angular-permission"
import "./account/account"
import "./register/register"
import "./forgot-password/forgot-password"
import "./set-new-password/set-new-password"
import "./confirm-email/confirm-email"

function LoginController() {

  return this
}

function config($stateProvider: ng.ui.IStateProvider) {
  $stateProvider.state('app.login', {
    abstract: true,
    url: '/login',
    controllerAs: 'vm',
    controller: 'LoginController',
    template: require('./login.jade')(),
    data: {
      permissions: {
        only: ['anon'],
        redirectTo: 'app.home'
      }
    }
  })
}

const loginPageModule = angular.module('profitelo.controller.login', [
  'ui.router',
  'permission',
  'permission.ui',
  'profitelo.controller.login.account',
  'profitelo.controller.login.register',
  'profitelo.controller.login.forgot-password',
  'profitelo.controller.login.set-new-password',
  'profitelo.controller.login.confirm-email'
])
  .config(config)
  .controller('LoginController', LoginController)
  .name

export default loginPageModule;
