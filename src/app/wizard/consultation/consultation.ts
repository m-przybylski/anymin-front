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
import {WizardApi} from 'profitelo-api-ng/api/api'
import {GetWizardProfile} from 'profitelo-api-ng/model/models'
import userModule from '../../../common/services/user/user'
import apiModule from 'profitelo-api-ng/api.module'
import commonConfigModule from '../../../../generated_modules/common-config/common-config'
import inputPriceModule from '../../../common/components/interface/input-price/input-price'

const consultaionWizardModule = angular.module('profitelo.controller.wizard.consultation', [
  'ui.router',
  'permission',
  'permission.ui',
  'ngTouch',
  wizardHandlerModule,
  wizardStepModule,
  inputModule,
  apiModule,
  consultationTagInputModule,
  tooltipModule,
  userModule,
  commonConfigModule,
  consultationEmployeeInputModule,
  inputPriceModule
])
.config(($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider.state('app.wizard.consultation', {
    url: '/consultation',
    params: {
      service: void 0
    },
    controllerAs: 'vm',
    controller: ConsultationController,
    template: require('./consultation.pug')(),
    resolve: {
      /* istanbul ignore next */
      wizardProfile: (WizardApi: WizardApi): ng.IPromise<GetWizardProfile> => {
        return WizardApi.getWizardProfileRoute().then((wizardProfile) => {
          return wizardProfile
        }, (error) => {
            throw new Error('Can not get wizard profile ' + error)
        })
      }
    },
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
