import * as angular from 'angular'
import 'angular-touch'
import 'angular-permission'
import {ExpertController} from './expert.controller'
import {GetWizardProfile} from 'profitelo-api-ng/model/models'
import {WizardApi} from 'profitelo-api-ng/api/api'
import wizardHandlerModule from '../../../../common/components/wizard/wizard-handler/wizard-handler'
import apiModule from 'profitelo-api-ng/api.module'
import inputDropdownTagModule from '../../../../common/components/interface/input-dropdown-tag/input-dropdown-tag'
import inputModule from '../../../../common/components/interface/input/input'
import fileUploaderModule from '../../../../common/components/file-uploader/file-uploader'
import textareaModule from '../../../../common/components/interface/textarea/textarea'
import inputLinksModule from '../../../../common/components/interface/input-links/input-links'
import commonSettingsModule from '../../../../common/services/common-settings/common-settings'
import ValidationAlertModule from '../../../../common/components/interface/alert/validation-alert/validation-alert'
import {httpCodes} from '../../../../common/classes/http-codes'
import {StateProvider} from '@uirouter/angularjs'
import uiRouter from '@uirouter/angularjs'

const expertWizardModule = angular.module('profitelo.controller.wizard.create-profile.expert', [
  'permission',
  uiRouter,
  'permission.ui',
  'ngTouch',
  'profitelo.directives.interface.local-avatar-uploader',
  inputDropdownTagModule,
  inputModule,
  apiModule,
  textareaModule,
  fileUploaderModule,
  inputLinksModule,
  wizardHandlerModule,
  commonSettingsModule,
  'profitelo.directives.interface.pro-alert',
  ValidationAlertModule
])
  .config(($stateProvider: StateProvider) => {
    $stateProvider.state('app.wizard.create-profile.expert', {
      url: '/expert',
      controllerAs: 'vm',
      controller: ExpertController,
      template: require('./expert.html'),
      resolve: {
        /* istanbul ignore next */
        wizardProfile: (WizardApi: WizardApi): ng.IPromise<GetWizardProfile | void> =>
          WizardApi.getWizardProfileRoute().catch((error) => {
            if (error.status === httpCodes.notFound) {
              return void 0
            } else {
              throw new Error('Can not get wizard profile ' + String(error))
            }
          })
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
