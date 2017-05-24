import * as angular from 'angular'
import 'angular-touch'
import 'angular-permission'
import {CompanyController} from './company.controller'

const companyWizardModule = angular.module('profitelo.controller.wizard.create-profile.company', [
  'ui.router',
  'permission',
  'permission.ui',
  'ngTouch'
])
.config(($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider.state('app.wizard.create-profile.company', {
    url: '/company',
    controllerAs: 'vm',
    controller: CompanyController,
    template: require('./company.pug')(),
    data: {
      permissions: {
        only: ['user'],
        redirectTo: 'app.login'
      },
      pageTitle: 'PAGE_TITLE.WIZARDS.CREATE_PROFILE.COMPANY'
    }
  })
})
.controller('companyController', CompanyController)
  .name

export default companyWizardModule
