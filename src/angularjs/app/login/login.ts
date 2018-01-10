import * as angular from 'angular'
import 'angular-permission'
import './account/account'
import './register/register'
import './forgot-password/forgot-password'
import './set-new-password/set-new-password'
import {Config} from '../config';
import {StateProvider} from '@uirouter/angularjs'
import uiRouter from '@uirouter/angularjs'

function LoginController(): void {
  this.isPlatformForExpert = Config.isPlatformForExpert

  this.isPlatformForExpert ? this.onLogoLink = 'app.login.account' : this.onLogoLink = 'app.home'

  return this
}

function config($stateProvider: StateProvider): void {
  $stateProvider.state('app.login', {
    abstract: true,
    url: '/login',
    controllerAs: 'vm',
    controller: 'LoginController',
    template: require('./login.html'),
    data: {
      permissions: {
        only: ['anon'],
        redirectTo: 'app.home'
      }
    }
  })
}

const loginPageModule = angular.module('profitelo.controller.login', [
  'permission',
  uiRouter,
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
