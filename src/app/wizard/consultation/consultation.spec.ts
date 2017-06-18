import * as angular from 'angular'
import {GetWizardProfile, WizardService} from 'profitelo-api-ng/model/models'
import {WizardApi, WizardApiMock} from 'profitelo-api-ng/api/api'
import {ConsultationController, IConsultationStateParams} from './consultation.controller'
import consultaionWizardModule from './consultation'
import {UserService} from '../../../common/services/user/user.service'
import apiModule from 'profitelo-api-ng/api.module'

describe('Testing Controller: ConsultationController', () => {

  let httpBackend: ng.IHttpBackendService
  let wizardApiMock: WizardApiMock
  let UserService: UserService
  let state: ng.ui.IStateService
  let wizardApi: WizardApi
  let stateParams: IConsultationStateParams
  let controller: ng.IControllerService
  let q: ng.IQService
  let consultationController: ConsultationController
  const wizardProfile: GetWizardProfile = {
    isExpert: false,
    isCompany: true,
    isSummary: true
  }

  const serviceMock: WizardService = {
    name: 'Edit Consultation',
    price: {
      amount: 2423,
      currency: 'PLN'
    },
    tags: [{
      name: 'Tag-1'
    }],
    invitations: [{
      email: 'testowy@profitelo.pl'
    }],
    isOwnerEmployee: true
  }

  const createController = (stateParams: IConsultationStateParams, wizardProfile: GetWizardProfile) => {
    return controller<ConsultationController>('consultationController', {
      $state: state,
      userService: UserService,
      $stateParams: stateParams,
      wizardProfile: wizardProfile,
      WizardApi: wizardApi
    })
  }


  beforeEach(angular.mock.module( ($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL/')
  }))

  beforeEach(() => {
    angular.mock.module(consultaionWizardModule)
    angular.mock.module(apiModule)

    inject(($controller: ng.IControllerService, $httpBackend: ng.IHttpBackendService, userService: UserService,
            WizardApi: WizardApi, WizardApiMock: WizardApiMock, $stateParams: IConsultationStateParams,
            $state: ng.ui.IStateService, $q: ng.IQService) => {
      q = $q
      controller = $controller
      wizardApi = WizardApi
      httpBackend = $httpBackend
      wizardApiMock = WizardApiMock
      UserService = userService
      state = $state
      stateParams = $stateParams
      consultationController = createController(stateParams, wizardProfile)
    })
  })

  it('should exists', () => {
    expect(!!consultationController).toBe(true)
  })

  it('should create controller with stateParams without invitations', () => {
    const stateParams: IConsultationStateParams = {
      service: serviceMock
    }
    wizardProfile.services = [serviceMock]
    const consultationController = createController(stateParams, wizardProfile)
    consultationController.$onInit()
    expect(consultationController.nameInputValue).toEqual(stateParams.service.name)
    expect(consultationController.priceAmountInputValue).toEqual(stateParams.service.price.amount / 100)
    expect(consultationController.tagsInputValue[0]).toEqual(stateParams.service.tags[0].name)
    expect(consultationController.isOwnerEmployee).toEqual(stateParams.service.isOwnerEmployee)
  })

  it('should create controller with stateParams', () => {
    const stateParams: IConsultationStateParams = {
      service: {
        name: 'Edit Consultation',
        price: {
          amount: 2423,
          currency: 'PLN'
        },
        tags: [{
          name: 'Tag-1'
        }],
        isOwnerEmployee: true
      }
    }
    const consultationController = createController(stateParams, wizardProfile)
    consultationController.$onInit()
    expect(consultationController.nameInputValue).toEqual(stateParams.service.name)
    expect(consultationController.priceAmountInputValue).toEqual(stateParams.service.price.amount / 100)
    expect(consultationController.tagsInputValue[0]).toEqual(stateParams.service.tags[0].name)
    expect(consultationController.isOwnerEmployee).toEqual(stateParams.service.isOwnerEmployee)
  })

  it('should save consultation', () => {
    spyOn(state, 'go')
    spyOn(UserService, 'getUser').and.returnValue(q.resolve({currency: 'PLN'}))
    const stateParams: IConsultationStateParams = {
      service: {
        name: 'Edit Consultation',
        price: {
          amount: 2423,
          currency: 'PLN'
        },
        tags: [{
          name: 'Tag-1'
        }],
        isOwnerEmployee: true
      }
    }
    const consultationController = createController(stateParams, wizardProfile)
    consultationController.$onInit()
    wizardApiMock.putWizardProfileRoute(200, {})
    consultationController.saveConsultation()
    httpBackend.flush()
    expect(state.go).toHaveBeenCalledWith('app.wizard.summary')
  })

  it('should save consultation as expert', () => {
    spyOn(state, 'go')
    spyOn(UserService, 'getUser').and.returnValue(q.resolve({currency: 'PLN'}))
    const stateParams: IConsultationStateParams = {
      service: {
        name: 'Edit Consultation',
        price: {
          amount: 2423,
          currency: 'PLN'
        },
        tags: [{
          name: 'Tag-1'
        }],
        isOwnerEmployee: true
      }
    }
    const wizardProfile = {
      isExpert: true,
      isSummary: true,
      isCompany: false
    }
    const consultationController = createController(stateParams, wizardProfile)
    consultationController.$onInit()
    wizardApiMock.putWizardProfileRoute(200, {})
    consultationController.saveStepsOnExpertPath()
    httpBackend.flush()
    expect(state.go).toHaveBeenCalledWith('app.wizard.summary')
  })


  it('should save consultation without state-params with service', () => {
    spyOn(state, 'go')
    spyOn(UserService, 'getUser').and.returnValue(q.resolve({currency: 'PLN'}))
    wizardProfile.services = [serviceMock]
    const consultationController = createController(stateParams, wizardProfile)
    consultationController.$onInit()
    wizardApiMock.putWizardProfileRoute(200, {})
    consultationController.saveConsultation()
    httpBackend.flush()
    expect(state.go).toHaveBeenCalledWith('app.wizard.summary')
  })

  it('should save consultation on edit - with state-params', () => {
    spyOn(state, 'go')
    spyOn(UserService, 'getUser').and.returnValue(q.resolve({currency: 'PLN'}))
    const stateParams: IConsultationStateParams = {
      service: serviceMock
    }
    wizardProfile.services = [serviceMock]
    const consultationController = createController(stateParams, wizardProfile)
    consultationController.$onInit()
    wizardApiMock.putWizardProfileRoute(200, {})
    consultationController.saveConsultation()
    httpBackend.flush()
    expect(state.go).toHaveBeenCalledWith('app.wizard.summary')
  })

  it('should go to app.wizard.summary', () => {
    spyOn(state, 'go')
    consultationController.onGoBack()
    expect(state.go).toHaveBeenCalledWith('app.wizard.summary')
  })




})
