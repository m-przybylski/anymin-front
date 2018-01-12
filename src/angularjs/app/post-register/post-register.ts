import * as angular from 'angular'
import 'angular-permission'
import './set-email/set-email'
import './set-password/set-password'
import {Config} from '../config';
import {StateProvider} from '@uirouter/angularjs'
import uiRouter from '@uirouter/angularjs'

function controller(): void {
  this.isPlatformForExpert = Config.isPlatformForExpert

  return this
}

function config($stateProvider: StateProvider): void {
  $stateProvider.state('app.post-register', {
    url: '/post-register',
    controllerAs: 'vm',
    controller: 'PostRegisterController',
    template: require('./post-register.html'),
    abstract: true,
    data: {
      permissions: {
        only: ['partially-registered'],
        redirectTo: 'app.login.account'
      },
      pageTitle: 'PAGE_TITLE.LOGIN.REGISTER'
    }
  })
}

const postRegisterPageModule = angular.module('profitelo.controller.post-register', [
  'permission',
  uiRouter,
  'permission.ui',
  'profitelo.controller.post-register.set-password',
  'profitelo.controller.post-register.set-email'
])
  .config(['$stateProvider', config])
  .controller('PostRegisterController', [controller])
  .name

export default postRegisterPageModule
