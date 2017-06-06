import * as angular from 'angular'
import 'angular-touch'
import 'angular-permission'
import {ConsultationController} from './consultation.controller'
import './consultation.sass'
import wizardStepModule from '../../../common/components/wizard/wizard-step/wizard-step'
import wizardHandlerModule from '../../../common/components/wizard/wizard-handler/wizard-handler'
import inputModule from '../../../common/components/interface/input/input'
import tooltipModule from '../../../common/components/interface/tooltip/tooltip'
import consultationEmployeeInputModule from '../../../common/components/wizard/consultation-employee-input/consultation-employee-input'
import consultationTagInputModule from '../../../common/components/wizard/cosnultaiton-tag-input/cosnultaiton-tag-input'

const consultaionWizardModule = angular.module('profitelo.controller.wizard.consultation', [
  'ui.router',
  'permission',
  'permission.ui',
  'ngTouch',
  wizardHandlerModule,
  wizardStepModule,
  inputModule,
  consultationTagInputModule,
  tooltipModule,
  consultationEmployeeInputModule
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
