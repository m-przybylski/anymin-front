// tslint:disable:no-shadowed-variable
// tslint:disable:no-require-imports
// tslint:disable:no-import-side-effect
// tslint:disable:no-duplicate-imports
import * as angular from 'angular';
import 'angular-touch';
import 'angular-permission';
import { ConsultationController } from './consultation.controller';
import wizardStepModule from '../../../common/components/wizard/wizard-step/wizard-step';
import wizardHandlerModule from '../../../common/components/wizard/wizard-handler/wizard-handler';
import inputModule from '../../../common/components/interface/input/input';
import tooltipModule from '../../../common/components/interface/tooltip/tooltip';
import consultationEmployeeInputModule
  from '../../../common/components/interface/input-consultation-employee/input-consultation-employee';
import consultationTagInputModule
  from '../../../common/components/interface/input-consultaiton-tag/input-consultaiton-tag';
import { WizardApi } from 'profitelo-api-ng/api/api';
import { GetWizardProfile } from 'profitelo-api-ng/model/models';
import userModule from '../../../common/services/user/user';
import apiModule from 'profitelo-api-ng/api.module';
import inputPriceModule from '../../../common/components/interface/input-price/input-price';
import languagesModule from '../../../common/services/languages/languages';
import translatorModule from '../../../common/services/translator/translator';
import { StateProvider } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';

const consultaionWizardModule = angular.module('profitelo.controller.wizard.consultation', [
  'permission',
  uiRouter,
  'permission.ui',
  'ngTouch',
  wizardHandlerModule,
  wizardStepModule,
  inputModule,
  apiModule,
  consultationTagInputModule,
  tooltipModule,
  userModule,
  consultationEmployeeInputModule,
  inputPriceModule,
  languagesModule,
  translatorModule
])
  .config(['$stateProvider', ($stateProvider: StateProvider): void => {
    $stateProvider.state('app.wizard.consultation', {
      url: '/consultation',
      params: {
        service: void 0
      },
      controllerAs: 'vm',
      controller: ConsultationController,
      template: require('./consultation.html'),
      resolve: {
        wizardProfile: ['WizardApi', (WizardApi: WizardApi): ng.IPromise<GetWizardProfile> =>
          WizardApi.getWizardProfileRoute().then((wizardProfile) => wizardProfile, (error) => {
            throw new Error('Can not get wizard profile ' + String(error));
          })]
      },
      data: {
        permissions: {
          only: ['user'],
          redirectTo: ['$location', ($location: ng.ILocationService): void => {
            $location.path('/login');
          }]
        },
        pageTitle: 'PAGE_TITLE.WIZARDS.CONSULTATION'
      }
    });
  }])
  .controller('consultationController', ConsultationController)
  .name;

export default consultaionWizardModule;
