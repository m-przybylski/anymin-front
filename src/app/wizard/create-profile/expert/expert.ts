import * as angular from 'angular'
import 'angular-touch'
import 'angular-permission'
import {ExpertController} from './expert.controller'
import './expert.sass'
import wizardHandlerModule from '../../../../common/components/wizard/wizard-handler/wizard-handler'
import wizardStepModule from '../../../../common/components/wizard/wizard-step/wizard-step'
import apiModule from 'profitelo-api-ng/api.module'
import inputDropdownTagModule from '../../../../common/components/interface/input-dropdown-tag/input-dropdown-tag'
import inputModule from '../../../../common/components/interface/input/input'

const expertWizardModule = angular.module('profitelo.controller.wizard.create-profile.expert', [
  'ui.router',
  'permission',
  'permission.ui',
  'ngTouch',
  'profitelo.directives.interface.local-avatar-uploader',
  inputDropdownTagModule,
  inputModule,
  apiModule,
  wizardHandlerModule,
  wizardStepModule
])
.config(($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider.state('app.wizard.create-profile.expert', {
    url: '/expert',
    controllerAs: 'vm',
    controller: ExpertController,
    template: require('./expert.pug')(),
    data: {
      permissions: {
        only: ['user'],
        redirectTo: 'app.login'
      },
      pageTitle: 'PAGE_TITLE.WIZARDS.CREATE_PROFILE.EXPERT'
    }
  })
})
.controller('expertController', ExpertController)
  .name

export default expertWizardModule
