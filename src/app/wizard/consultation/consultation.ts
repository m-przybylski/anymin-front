import * as angular from 'angular'
import 'angular-touch'
import 'angular-permission'
import {ConsultationController} from './consultation.controller'

const consultaionWizardModule = angular.module('profitelo.controller.wizard.consultation', [
  'ui.router',
  'permission',
  'permission.ui',
  'ngTouch'
])
.config(($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider.state('app.wizard.consultation', {
    url: '/consultation',
    controllerAs: 'vm',
    controller: ConsultationController,
    template: require('./consultation.pug')(),
    data: {
      permissions: {
        only: ['user'],
        redirectTo: 'app.login'
      },
      pageTitle: 'PAGE_TITLE.WIZARDS.CONSULTATION'
    }
  })
})
.controller('consultationController', ConsultationController)
  .name

export default consultaionWizardModule
