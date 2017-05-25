import * as angular from 'angular'
import 'angular-touch'
import 'angular-permission'
import {SummaryController} from './summary.controller'

const summaryWizardModule = angular.module('profitelo.controller.wizard.summary', [
  'ui.router',
  'permission',
  'permission.ui',
  'ngTouch'
])
.config(($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider.state('app.wizard.summary', {
    url: '/summary',
    controllerAs: 'vm',
    controller: SummaryController,
    template: require('./summary.pug')(),
    data: {
      permissions: {
        only: ['user'],
        redirectTo: 'app.login'
      },
      pageTitle: 'PAGE_TITLE.WIZARDS.SUMMARY'
    }
  })
})
.controller('summaryController', SummaryController)
  .name

export default summaryWizardModule
