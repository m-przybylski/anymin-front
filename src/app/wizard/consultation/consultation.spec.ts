import * as angular from 'angular'
import IScope = angular.IScope
import {GetWizardProfile} from 'profitelo-api-ng/model/models'
import {WizardApi} from 'profitelo-api-ng/api/api'
import {ConsultationController} from './consultation.controller'
import consultaionWizardModule from './consultation'

describe('Testing Controller: CompanyController', () => {

  let ConsultationController: ConsultationController
  let scope: IScope
  let httpBackend: ng.IHttpBackendService

  const wizardProfile: GetWizardProfile = {
    isExpert: false,
    isCompany: false,
    isSummary: false
  }

  beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
    $provide.value('apiUrl', 'awesomeURL/')
  }))

  beforeEach(() => {
    angular.mock.module(consultaionWizardModule)

    inject(($controller: ng.IControllerService, $httpBackend: ng.IHttpBackendService, WizardApi: WizardApi) => {
      httpBackend = $httpBackend
      ConsultationController = $controller<ConsultationController>('consultationController', {
        $scope: scope,
        wizardProfile: wizardProfile,
        WizardApi: WizardApi
      })
    })
  })

  it('should exists', () => {
    expect(!!ConsultationController).toBe(true)
  })
})
