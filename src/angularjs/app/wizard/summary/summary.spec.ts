import * as angular from 'angular'
import {GetWizardProfile, GetWizardService, WizardCompleteResult} from 'profitelo-api-ng/model/models'
import {WizardApi, WizardApiMock} from 'profitelo-api-ng/api/api'
import {SummaryController} from './summary.controller'
import summaryWizardModule from './summary'
import {ErrorHandlerService} from '../../../common/services/error-handler/error-handler.service'
import {UserService} from '../../../common/services/user/user.service'
import {StateService, TransitionPromise} from '@uirouter/angularjs'
import {TopAlertService} from '../../../common/services/top-alert/top-alert.service'

describe('Testing Controller: SummaryController', () => {

  let summaryController: SummaryController,
    httpBackend: ng.IHttpBackendService,
    $state: StateService,
    _WizardApiMock: WizardApiMock,
    errorHandler: ErrorHandlerService,
    controller: ng.IControllerService,
    wizardApi: WizardApi,
    q: ng.IQService,
    userService: UserService,
    filter: ng.IFilterService

  const  topAlertService: TopAlertService = <any>{}

  const wizardProfile: GetWizardProfile = {
    isExpert: true,
    isCompany: false,
    isSummary: true,
    services: [
      {
        name: 'ServiceName',
        price: {
          amount: 4200,
          currency: 'PLN'
        },
        tags: [{
          name: 'Tag-1'
        }],
        isOwnerEmployee: true,
        description: 'asd',
        language: 'pl'
      }
    ],
    expertDetailsOption:  {
      name: 'Czesław',
      avatar: 'logo.png',
      description: 'Expert'
    }
  }

  const createController = (wizardProfile: GetWizardProfile): SummaryController => {
    return controller<SummaryController>('summaryController', {
      $state: $state,
      wizardProfile: wizardProfile,
      WizardApi: wizardApi,
      errorHandler: errorHandler,
      topAlertService: topAlertService,
      $filter: filter
    })
  }

  beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService): void {
    $provide.value('apiUrl', 'awesomeURL/')
    $provide.value('WizardApi', WizardApi)
    $provide.value('WizardApiMock', WizardApiMock)
    $provide.value('normalizeTranslationKeyFilter', (x: string) => x)
  }))

  beforeEach(() => {
    angular.mock.module(summaryWizardModule)

    inject(($controller: ng.IControllerService, $httpBackend: ng.IHttpBackendService, WizardApi: WizardApi,
            WizardApiMock: WizardApiMock, $q: ng.IQService, _errorHandler_: ErrorHandlerService,
            _userService_: UserService) => {

      $state = <StateService>{
        go: (_to: string): TransitionPromise => <any>Promise.resolve(<any>{})
      }

      q = $q
      controller = $controller
      httpBackend = $httpBackend
      _WizardApiMock = WizardApiMock
      errorHandler = _errorHandler_
      wizardApi = WizardApi
      userService = _userService_
      summaryController = createController(wizardProfile)
    })
  })

  it('should exists', () => {
    expect(!!summaryController).toBe(true)
  })

  it('should delete profile onMainProfileDelete', () => {
    spyOn($state, 'go')
    _WizardApiMock.putWizardProfileRoute(200, wizardProfile)
    summaryController.onMainProfileDelete()
    httpBackend.flush()
    expect($state.go).toHaveBeenCalledWith('app.wizard.create-profile')
  })

  it('should throw error when can not delete profile onMainProfileDelete', () => {
    _WizardApiMock.putWizardProfileRoute(500, wizardProfile)
    spyOn(errorHandler, 'handleServerError')
    summaryController.onMainProfileDelete()
    httpBackend.flush()
    expect(errorHandler.handleServerError).toHaveBeenCalled()
  })

  it('should redirect to consultation', () => {
    const service: GetWizardService = {
      name: 'name',
      price: {
        amount: 2423,
        currency: 'PLN'
      },
      tags: [{
        name: 'Tag-1'
      }],
      isOwnerEmployee: false,
      description: 'asd',
      language: 'pl'
    }
    spyOn($state, 'go')
    summaryController.editConsultation(service)
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
        description: 'asd',
        language: 'pl',
        price: {
          amount: 2423,
          currency: 'PLN'
        },
        rating: 123,
        usageCounter: 123,
        usageDurationInSeconds: 123,
        isSuspended: false,
        createdAt: new Date(123)
      }]
    }
    spyOn(userService, 'getUser').and.callFake(() => q.resolve({}))
    spyOn($state, 'go')
    _WizardApiMock.postWizardCompleteRoute(200, response)
    summaryController.saveWizard()
    httpBackend.flush()
    expect($state.go).toHaveBeenCalledWith('app.dashboard.expert.activities')
  })

  it('should throw error when can not save wizard', () => {
    spyOn(errorHandler, 'handleServerError')
    _WizardApiMock.postWizardCompleteRoute(500)
    summaryController.saveWizard()
    httpBackend.flush()
    expect(errorHandler.handleServerError).toHaveBeenCalled()
  })

  it('should redirect to app.wizard.create-profile.company', () => {
    const wizardProfile: GetWizardProfile = {
      isExpert: false,
      isCompany: false,
      isSummary: false
    }
    spyOn($state, 'go')
    summaryController = createController(wizardProfile)
    summaryController.$onInit()
    summaryController.onMainProfileEdit()
    expect($state.go).toHaveBeenCalledWith('app.wizard.create-profile.company')
  })

  it('should redirect to app.wizard.create-profile.expert', () => {
    const wizardProfile: GetWizardProfile = {
      isExpert: true,
      isCompany: false,
      isSummary: false
    }
    spyOn($state, 'go')
    summaryController = createController(wizardProfile)
    summaryController.$onInit()
    summaryController.onMainProfileEdit()
    expect($state.go).toHaveBeenCalledWith('app.wizard.create-profile.expert')
  })

  it('should redirect to app.wizard.create-profile.expert', () => {
    spyOn($state, 'go')
    summaryController.onSecondProfileEdit()
    expect($state.go).toHaveBeenCalledWith('app.wizard.create-profile.expert')
  })

  it('should have wizard profile with service', () => {
    const wizardProfile: GetWizardProfile = {
      isExpert: true,
      isCompany: false,
      isSummary: false,
      services: [{
        name: 'name',
        price: {
          amount: 123,
          currency: 'PLN'
        },
        tags: [{
          name: 'tag-1'
        }],
        isOwnerEmployee: false,
        description: 'asd',
        language: 'pl'
      }]
    }
    summaryController = createController(wizardProfile)
    summaryController.$onInit()
    expect(summaryController.services).toEqual(wizardProfile.services)
    expect(summaryController.isConsultation).toEqual(true)
  })

  it('should delete profile onSecondProfileDelete', () => {
    const wizardProfile: GetWizardProfile = {
      isExpert: true,
      isCompany: false,
      isSummary: false
    }
    const summaryController = createController(wizardProfile)
    summaryController.$onInit()
    _WizardApiMock.putWizardProfileRoute(200, wizardProfile)
    summaryController.onSecondProfileDelete()
    httpBackend.flush()
    expect(wizardProfile.isExpert).toBe(false)
    expect(summaryController.isUserShouldCreateExpert).toBe(true)
  })

  it('should throw error when can not delete profile onSecondProfileDelete', () => {
    _WizardApiMock.putWizardProfileRoute(500, wizardProfile)
    spyOn(errorHandler, 'handleServerError')
    summaryController.onSecondProfileDelete()
    httpBackend.flush()
    expect(errorHandler.handleServerError).toHaveBeenCalled()
  })

  it('should be company and expert', () => {
    const wizardProfile: GetWizardProfile = {
      isExpert: true,
      isCompany: true,
      isSummary: false,
      organizationDetailsOption: {
        name: 'name'
      },
      services: [{
        name: 'name',
        price: {
          amount: 123,
          currency: 'PLN'
        },
        tags: [{
          name: 'tag-1'
        }],
        isOwnerEmployee: false,
        description: 'asd',
        language: 'pl'
      }]
    }
    summaryController = createController(wizardProfile)
    summaryController.$onInit()
    expect(summaryController.isCompanyWithExpert).toEqual(true)
  })

})
