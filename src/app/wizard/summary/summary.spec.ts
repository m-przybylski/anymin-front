import * as angular from 'angular'
import {GetWizardProfile, WizardService, WizardCompleteResult} from 'profitelo-api-ng/model/models'
import {WizardApi, WizardApiMock} from 'profitelo-api-ng/api/api'
import {SummaryController} from './summary.controller'
import summaryWizardModule from './summary'

describe('Testing Controller: SummaryController', () => {

  let SummaryController: SummaryController,
      httpBackend: ng.IHttpBackendService,
      $state: ng.ui.IStateService,
      _WizardApiMock: WizardApiMock

  const wizardProfile: GetWizardProfile = {
    isExpert: false,
    isCompany: false,
    isSummary: false
  }

  beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
    $provide.value('apiUrl', 'awesomeURL/')
    $provide.value('WizardApi', WizardApi)
    $provide.value('WizardApiMock', WizardApiMock)
  }))

  beforeEach(() => {
    angular.mock.module(summaryWizardModule)

    inject(($controller: ng.IControllerService, $httpBackend: ng.IHttpBackendService, WizardApi: WizardApi,
            WizardApiMock: WizardApiMock, $q: ng.IQService) => {

      $state = <ng.ui.IStateService>{
        go: (_to: string) => $q.resolve({})
      }

      httpBackend = $httpBackend
      _WizardApiMock = WizardApiMock

      SummaryController = $controller<SummaryController>('summaryController', {
        wizardProfile: wizardProfile,
        WizardApi: WizardApi,
        $state: $state
      })
    })
  })

  it('should exists', () => {
    expect(!!SummaryController).toBe(true)
  })

  it('should delete profile', () => {
    spyOn($state, 'go')
    _WizardApiMock.putWizardProfileRoute(200, wizardProfile)
    SummaryController.onMainProfileDelete()
    httpBackend.flush()
    expect($state.go).toHaveBeenCalledWith('app.wizard.create-profile')
  })

  it('should throw error when can not delete profile', () => {
    _WizardApiMock.putWizardProfileRoute(500, wizardProfile)
    expect(() => {
      SummaryController.onMainProfileDelete()
      httpBackend.flush()
    }).toThrowError()
  })

  it('should redirect to consultation', () => {
    const service: WizardService = {
      name: 'name',
      price: {
        amount: 2423,
        currency: 'PLN'
      },
      tags: [{
        name: 'Tag-1'
      }],
      isOwnerEmployee: false
    }
    spyOn($state, 'go')
    SummaryController.editConsultation(service)
    expect($state.go).toHaveBeenCalledWith('app.wizard.consultation', {service})
  })

  it('should save wizard', () => {
    const response: WizardCompleteResult = {
      profile: {
        id: 'id',
        isActive: false
      },
      services: [{
        id: 'id',
        ownerId: 'ownerId',
        name: 'name',
        price: {
          amount: 2423,
          currency: 'PLN'
        },
        rating: 123,
        usageCounter: 123,
        usageDurationInSeconds: 123,
        isSuspended: false,
        createdAt: 123
      }]
    }
    spyOn($state, 'go')
    _WizardApiMock.postWizardCompleteRoute(200, response)
    SummaryController.saveWizard()
    httpBackend.flush()
    expect($state.go).toHaveBeenCalledWith('app.dashboard.expert.activities')
  })

  it('should throw error when can not save wizard', () => {
    _WizardApiMock.postWizardCompleteRoute(500)
    expect(() => {
      SummaryController.saveWizard()
      httpBackend.flush()
    }).toThrowError()
  })

})

