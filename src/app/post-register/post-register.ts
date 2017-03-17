import * as angular from 'angular'
import 'angular-permission'
import './set-email/set-email'
import './set-password/set-password'

function controller() {

  return this
}

function config($stateProvider: ng.ui.IStateProvider) {
  $stateProvider.state('app.post-register', {
    url: '/post-register',
    controllerAs: 'vm',
    controller: 'PostRegisterController',
    template: require('./post-register.pug')(),
    abstract: true,
    data: {
      permissions: {
        except: ['anon'],
        redirectTo: 'app.login'
      },
      pageTitle: 'PAGE_TITLE.LOGIN.REGISTER'
    }
  })
}

const postRegisterPageModule = angular.module('profitelo.controller.post-register', [
  'ui.router',
  'permission',
  'permission.ui',
  'profitelo.controller.post-register.set-password',
  'profitelo.controller.post-register.set-email'
])
  .config(config)
  .controller('PostRegisterController', controller)
  .name

export default postRegisterPageModule
