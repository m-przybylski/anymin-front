import * as angular from 'angular'
import 'angular-touch'
import 'angular-permission'
import {ExpertController} from './expert.controller'
import './expert.sass'
import {WizardApi} from 'profitelo-api-ng/api/api'
import wizardHandlerModule from '../../../../common/components/wizard/wizard-handler/wizard-handler'
import apiModule from 'profitelo-api-ng/api.module'
import inputDropdownTagModule from '../../../../common/components/interface/input-dropdown-tag/input-dropdown-tag'
import inputModule from '../../../../common/components/interface/input/input'
import wizardUploaderModule from '../../../../common/components/wizard/wizard-uploader/wizard-uploader'

const expertWizardModule = angular.module('profitelo.controller.wizard.create-profile.expert', [
  'ui.router',
  'permission',
  'permission.ui',
  'ngTouch',
  'profitelo.directives.interface.local-avatar-uploader',
  inputDropdownTagModule,
  inputModule,
  apiModule,
  wizardUploaderModule,
  wizardHandlerModule
])
.config(($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider.state('app.wizard.create-profile.expert', {
    url: '/expert',
    controllerAs: 'vm',
    controller: ExpertController,
    template: require('./expert.pug')(),
    resolve: {
      /* istanbul ignore next */
      wizardProfile: (WizardApi: WizardApi) => {
        return WizardApi.getWizardProfileRoute().then((wizardProfile) => {
          return wizardProfile
        }, (error) => {
          if (error.status === 404) {
            return void 0
          } else {
            throw new Error('Can not get wizard profile ' + error)
          }
        })
      }
    },
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
