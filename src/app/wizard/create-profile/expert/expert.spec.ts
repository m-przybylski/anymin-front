import * as angular from 'angular'
import {GetWizardProfile} from 'profitelo-api-ng/model/models'
import {WizardApi} from 'profitelo-api-ng/api/api'
import expertWizardModule from './expert'
import {ExpertController} from './expert.controller'

describe('Testing Controller: ExpertController', () => {

  let ExpertController: ExpertController
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
    angular.mock.module(expertWizardModule)

    inject(($controller: ng.IControllerService, $httpBackend: ng.IHttpBackendService, WizardApi: WizardApi) => {
      httpBackend = $httpBackend
      ExpertController = $controller<ExpertController>('expertController', {
        wizardProfile: wizardProfile,
        WizardApi: WizardApi
      })
    })
  })

  it('should exists', () => {
    expect(!!ExpertController).toBe(true)
  })

  it('should submit form', () => {
    ExpertController.goToSummary()
    expect(ExpertController.isSubmitted).toBe(true)
  })
})
