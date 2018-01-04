import * as angular from 'angular'
import {GetWizardProfile, WizardService} from 'profitelo-api-ng/model/models'
import {WizardApi, WizardApiMock} from 'profitelo-api-ng/api/api'
import {ConsultationController, IConsultationStateParams} from './consultation.controller'
import consultaionWizardModule from './consultation'
import {UserService} from '../../../common/services/user/user.service'
import apiModule from 'profitelo-api-ng/api.module'
import {CommonConfig} from '../../../../../generated_modules/common-config/common-config'
import {IFilterService} from '../../../common/services/filter/filter.service'

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
  let filter: IFilterService
  const wizardProfile: GetWizardProfile = {
    isExpert: false,
    isCompany: true,
    isSummary: true
  }
  const commonConfig: CommonConfig = <CommonConfig>{
    getAllData: (): object => {
      return {
        config: {
          moneyDivider: 100,
          'supported-languages': [{
            shortcut: 'pl', name: 'Polish'
          }]
        }
      }
    }
  }
  const serviceMock: WizardService = {
    name: 'Edit Consultation',
    price: {
      amount: 2423,
      currency: 'PLN'
    },
    tags: [{
        name: 'Tag-1'
      },
      {
        name: 'Tag-2'
      },
      {
        name: 'Tag-3'
    }],
    invitations: [{
      email: 'testowy@profitelo.pl'
    }],
    isOwnerEmployee: true,
    description: 'aksdfn ajsdlfj lkjasdflj a lakjsdfl ja dslkfj aldf d',
    language: 'pl'
  }

  const responseGetWizardProfile: GetWizardProfile = {
    isExpert: false,
    isCompany: true,
    isSummary: true,
    organizationDetailsOption: {
      logo: 'sdsdsdsd'
    }
  }

  const createController = (stateParams: IConsultationStateParams, wizardProfile: GetWizardProfile): ConsultationController => {
    return controller<ConsultationController>('consultationController', {
      $state: state,
      userService: UserService,
      $stateParams: stateParams,
      wizardProfile: wizardProfile,
      WizardApi: wizardApi,
      CommonConfig: commonConfig,
      $filter: filter,
    })
  }

  beforeEach(angular.mock.module( ($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL/')
    $provide.value('normalizeTranslationKeyFilter', (x: string) => x)
  }))

  beforeEach(() => {
    angular.mock.module(consultaionWizardModule)
    angular.mock.module(apiModule)

    inject(($controller: ng.IControllerService, $httpBackend: ng.IHttpBackendService, userService: UserService,
            WizardApi: WizardApi, WizardApiMock: WizardApiMock, $stateParams: IConsultationStateParams,
            $state: ng.ui.IStateService, $q: ng.IQService, $filter: IFilterService) => {
      q = $q
      controller = $controller
      wizardApi = WizardApi
      httpBackend = $httpBackend
      wizardApiMock = WizardApiMock
      UserService = userService
      state = $state
      stateParams = $stateParams
      filter = $filter,
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
    expect(consultationController.priceAmountInputValue).toEqual((stateParams.service.price.amount / 100).toString())
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
        isOwnerEmployee: true,
        description: 'salaksddf lkaslkdf asdfkj kjasdfj ljkahsd kjhasjdh jh jahsd kjsd',
        language: 'pl'
      }
    }
    const consultationController = createController(stateParams, wizardProfile)
    consultationController.$onInit()
    expect(consultationController.nameInputValue).toEqual(stateParams.service.name)
    expect(consultationController.priceAmountInputValue).toEqual((stateParams.service.price.amount / 100).toString())
    expect(consultationController.tagsInputValue[0]).toEqual(stateParams.service.tags[0].name)
    expect(consultationController.isOwnerEmployee).toEqual(stateParams.service.isOwnerEmployee)
  })

  it('should save consultation', () => {
    spyOn(state, 'go')
    spyOn(UserService, 'getUser').and.returnValue(q.resolve({currency: 'PLN', countryISO: 'PL'}))
    const stateParams: IConsultationStateParams = {
      service: {
        name: 'Edit Consultation',
        price: {
          amount: 2423,
          currency: 'PLN'
        },
        tags: [{
          name: 'Tag-1'
        },
          {
            name: 'Tag-2'
          },
          {
            name: 'Tag-3'
          }],
        isOwnerEmployee: true,
        description: 'saksjdf kjhsakfjdh ahfjh ajkhgsf kjasjf gjkag fasdjhf jasd',
        language: 'pl'
      }
    }
    const consultationController = createController(stateParams, wizardProfile)
    consultationController.$onInit()
    wizardApiMock.putWizardProfileRoute(200, responseGetWizardProfile)
    consultationController.saveConsultation()
    httpBackend.flush()
    expect(state.go).toHaveBeenCalledWith('app.wizard.summary')
  })

  it('should save consultation as expert', () => {
    spyOn(state, 'go')
    spyOn(UserService, 'getUser').and.returnValue(q.resolve({currency: 'PLN', countryISO: 'PL'}))
    const stateParams: IConsultationStateParams = {
      service: {
        name: 'Edit Consultation',
        price: {
          amount: 2423,
          currency: 'PLN'
        },
        tags: [{
          name: 'Tag-1'
        },
          {
            name: 'Tag-2'
          },
          {
            name: 'Tag-3'
          }],
        isOwnerEmployee: true,
        description: 'saksjdf kjhsakfjdh ahfjh ajkhgsf kjasjf gjkag fasdjhf jasd',
        language: 'pl'
      }
    }
    const wizardProfile = {
      isExpert: true,
      isSummary: true,
      isCompany: false
    }
    const consultationController = createController(stateParams, wizardProfile)
    consultationController.$onInit()
    wizardApiMock.putWizardProfileRoute(200, responseGetWizardProfile)
    consultationController.saveStepsOnExpertPath()
    httpBackend.flush()
    expect(state.go).toHaveBeenCalledWith('app.wizard.summary')
  })

  it('should save consultation without state-params with service', () => {
    spyOn(state, 'go')
    spyOn(UserService, 'getUser').and.returnValue(q.resolve({currency: 'PLN', countryISO: 'PL'}))
    wizardProfile.services = [serviceMock]

    const consultationController = createController(stateParams, wizardProfile)
    spyOn(consultationController, 'checkIsFormValid').and.returnValue(true)
    consultationController.$onInit()
    wizardApiMock.putWizardProfileRoute(200, responseGetWizardProfile)

    consultationController.isOwnerEmployee = true
    consultationController.nameInputValue = 'Service name'
    consultationController.priceAmountInputValue = '23'
    consultationController.tagsInputValue = ['Tag-234']
    consultationController.languageInputValue = {name: 'polski', value: 'pl'}

    consultationController.saveConsultation()
    httpBackend.flush()
    expect(state.go).toHaveBeenCalledWith('app.wizard.summary')
  })

  it('should save consultation on edit - with state-params', () => {
    spyOn(state, 'go')
    spyOn(UserService, 'getUser').and.returnValue(q.resolve({currency: 'PLN', countryISO: 'PL'}))
    const stateParams: IConsultationStateParams = {
      service: serviceMock
    }
    wizardProfile.services = [serviceMock]
    const consultationController = createController(stateParams, wizardProfile)
    consultationController.$onInit()
    wizardApiMock.putWizardProfileRoute(200, responseGetWizardProfile)
    consultationController.saveConsultation()
    httpBackend.flush()
    expect(state.go).toHaveBeenCalledWith('app.wizard.summary')
  })

  it('should go to app.wizard.summary', () => {
    spyOn(state, 'go')
    consultationController.onGoBack()
    expect(state.go).toHaveBeenCalledWith('app.wizard.summary')
  })

  it('should name input invalid', () => {
    consultationController.nameInputValue = ''
    expect(consultationController.checkIsNameInputValid()).toEqual(false)
  })

  it('should tags input valid', () => {
    consultationController.tagsInputValue = ['tag-1', 'tag-2', 'tag-3']
    expect(consultationController.checkIsTagsInputValid()).toEqual(true)
  })

  it('should employees input valid', () => {
    consultationController.invitationsInputValue = ['invitation']
    expect(consultationController.checkIsEmployeesInputValid()).toEqual(true)
  })

  it('should description input invalid', () => {
    consultationController.descriptionInputValue = 'a'
    expect(consultationController.checkIsDescriptionInputValid()).toEqual(false)
  })

  it('should form valid', () => {
    consultationController.nameInputValue = 'ThisIsName'
    consultationController.tagsInputValue = ['tag-1', 'tag-2', 'tag-3']
    consultationController.priceAmountInputValue = '123'
    consultationController.invitationsInputValue = ['invitation']
    consultationController.languageInputValue = {name: 'polski', value: 'pl'}
    consultationController.descriptionInputValue = 'aksdfn ajsdlfj lkjasdflj a lakjsdfl ja dslkfj aldf d'
    expect(consultationController.checkIsFormValid()).toEqual(true)
  })

  it('should price button disabled', () => {
    consultationController.isCompany = false
    expect(consultationController.checkIsPriceButtonDisabled()).toEqual(true)
  })

  it('should consultation price be valid', () => {
    const price: number = 13
    consultationController.onPriceChange(price)
    expect(consultationController.checkIsPriceInputValid()).toBe(true)
  })

})
