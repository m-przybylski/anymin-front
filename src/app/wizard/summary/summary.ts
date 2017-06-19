import * as angular from 'angular'
import 'angular-touch'
import 'angular-permission'
import {SummaryController} from './summary.controller'
import {WizardApi} from 'profitelo-api-ng/api/api'
import {GetWizardProfile} from 'profitelo-api-ng/model/models'
import userAvatarModule from '../../../common/components/interface/user-avatar/user-avatar'
import './summary.sass'
import profileHeaderEditModule from '../../../common/components/wizard/summary/profile-header-edit/profile-header-edit'
import singleConsultationEditModule from '../../../common/components/wizard/summary/single-consultation-edit/single-consultation-edit'
import apiModule from 'profitelo-api-ng/api.module'
import errorHandlerModule from '../../../common/services/error-handler/error-handler'

const summaryWizardModule = angular.module('profitelo.controller.wizard.summary', [
  'ui.router',
  'permission',
  'permission.ui',
  'ngTouch',
  userAvatarModule,
  profileHeaderEditModule,
  singleConsultationEditModule,
  apiModule,
  errorHandlerModule
])
.config(($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider.state('app.wizard.summary', {
    url: '/summary',
    controllerAs: 'vm',
    controller: SummaryController,
    template: require('./summary.pug')(),
    resolve: {
      /* istanbul ignore next */
      wizardProfile: (WizardApi: WizardApi): ng.IPromise<GetWizardProfile> => {
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
      pageTitle: 'PAGE_TITLE.WIZARDS.SUMMARY'
    }
  })
})
.controller('summaryController', SummaryController)
  .name

export default summaryWizardModule
