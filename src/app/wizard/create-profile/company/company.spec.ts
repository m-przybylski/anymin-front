import * as angular from 'angular'
import companyWizardModule from './company'
import {GetWizardProfile} from 'profitelo-api-ng/model/models'
import {WizardApi, WizardApiMock} from 'profitelo-api-ng/api/api'
import {CompanyController} from './company.controller'

describe('Testing Controller: CompanyController', () => {

  let CompanyController: CompanyController
  let httpBackend: ng.IHttpBackendService
  let $state: ng.ui.IStateService
  let WizardApiMock: WizardApiMock

  const wizardProfile: GetWizardProfile = {
    isExpert: false,
    isCompany: false,
    isSummary: false
  }

  beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
    $provide.value('apiUrl', 'awesomeURL/')
  }))

  beforeEach(() => {
    angular.mock.module(companyWizardModule)

    inject(($controller: ng.IControllerService, $httpBackend: ng.IHttpBackendService, WizardApi: WizardApi,
            _WizardApiMock_: WizardApiMock, $q: ng.IQService) => {

      $state = <ng.ui.IStateService>{
        go: (_to: string) => $q.resolve({})
      }
      httpBackend = $httpBackend
      WizardApiMock = _WizardApiMock_
      CompanyController = $controller<CompanyController>('companyController', {
        wizardProfile: wizardProfile,
        WizardApi: WizardApi,
        $state: $state
      })
    })
  })

  it('should exists', () => {
    expect(!!CompanyController).toBe(true)
  })

  it('should save wizard state', () => {
    spyOn($state, 'go')
    WizardApiMock.putWizardProfileRoute(200, wizardProfile)
    CompanyController.onGoBack()
    expect(CompanyController.currentWizardState.isExpert).toBe(false)
    expect(CompanyController.currentWizardState.isCompany).toBe(false)
    httpBackend.flush()
    expect($state.go).toHaveBeenCalledWith('app.wizard.create-profile')
  })

  it('should submit form', () => {
    CompanyController.goToSummary()
    expect(CompanyController.isSubmitted).toBe(true)
  })

  it('should name valid', () => {
    CompanyController.nameModel = 'SomeName'
    expect(CompanyController.checkIsNameInputValid()).toEqual(true)
  })

  it('should logo valid', () => {
    CompanyController.logoModel = 'logo'
    expect(CompanyController.checkIsLogoValid()).toEqual(true)
  })

  it('should description valid', () => {
    CompanyController.descriptionModel = 'Lorem ipsum dolor sit amet, consectetuer adipiscing'
    expect(CompanyController.checkIsProfileDescriptionValid()).toEqual(true)
  })

  it('should form valid', () => {
    CompanyController.currentWizardState.organizationDetailsOption = true
    spyOn(CompanyController, 'checkIsNameInputValid').and.returnValue(true)
    spyOn(CompanyController, 'checkIsLogoValid').and.returnValue(true)
    spyOn(CompanyController, 'checkIsProfileDescriptionValid').and.returnValue(true)
    expect(CompanyController.checkIsFormValid()).toEqual(true)
  })

})
