import * as angular from 'angular'
import 'angular-touch'
import 'angular-permission'
import {CompanyController} from './company.controller'
import {WizardApi} from 'profitelo-api-ng/api/api'
import {GetWizardProfile} from 'profitelo-api-ng/model/models'
import apiModule from 'profitelo-api-ng/api.module'
import ValidationAlertModule from '../../../../common/components/interface/alert/validation-alert/validation-alert'
import {httpCodes} from '../../../../common/classes/http-codes'
import commonSettingsModule from '../../../../common/services/common-settings/common-settings'

const companyWizardModule = angular.module('profitelo.controller.wizard.create-profile.company', [
  'ui.router',
  'permission',
  'permission.ui',
  'ngTouch',
  apiModule,
  ValidationAlertModule,
  commonSettingsModule
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.wizard.create-profile.company', {
      url: '/company',
      controllerAs: 'vm',
      controller: CompanyController,
      template: require('./company.pug'),
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
        pageTitle: 'PAGE_TITLE.WIZARDS.CREATE_PROFILE.COMPANY'
      }
    })
  })
  .controller('companyController', CompanyController)
  .name

export default companyWizardModule
