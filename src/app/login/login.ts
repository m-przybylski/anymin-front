import * as angular from 'angular'
import 'angular-permission'
import './account/account'
import './register/register'
import './forgot-password/forgot-password'
import './set-new-password/set-new-password'

function LoginController(): void {

  return this
}

function config($stateProvider: ng.ui.IStateProvider): void {
  $stateProvider.state('app.login', {
    abstract: true,
    url: '/login',
    controllerAs: 'vm',
    controller: 'LoginController',
    template: require('./login.pug')(),
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
  'profitelo.controller.login.set-new-password'
])
  .config(config)
  .controller('LoginController', LoginController)
  .name

export default loginPageModule;
