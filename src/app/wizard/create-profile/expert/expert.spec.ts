import * as angular from 'angular'
import {GetWizardProfile, PartialExpertDetails} from 'profitelo-api-ng/model/models'
import {WizardApi, WizardApiMock} from 'profitelo-api-ng/api/api'
import expertWizardModule from './expert'
import {ExpertController} from './expert.controller'
import {IPromise} from 'angular'

describe('Testing Controller: ExpertController', () => {

  let ExpertController: ExpertController,
    httpBackend: ng.IHttpBackendService,
    $state: ng.ui.IStateService,
    WizardApiMock: WizardApiMock

  const wizardProfile: GetWizardProfile = {
    isExpert: false,
    isCompany: false,
    isSummary: false
  }

  beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService): void {
    $provide.value('apiUrl', 'awesomeURL/')
  }))

  beforeEach(() => {
    angular.mock.module(expertWizardModule)

    inject(($controller: ng.IControllerService, $httpBackend: ng.IHttpBackendService, WizardApi: WizardApi,
            _WizardApiMock_: WizardApiMock, $q: ng.IQService) => {

      $state = <ng.ui.IStateService>{
        go: (_to: string): IPromise<{}> => $q.resolve({})
      }

      httpBackend = $httpBackend

      WizardApiMock = _WizardApiMock_

      ExpertController = $controller<ExpertController>('expertController', {
        wizardProfile: wizardProfile,
        WizardApi: WizardApi,
        $state: $state
      })
    })
  })

  it('should exists', () => {
    expect(!!ExpertController).toBe(true)
  })

  it('should redirect to summary', () => {
    ExpertController.currentWizardState.expertDetailsOption = {
      avatar: 'avatar'
    }
    ExpertController.nameModel = 'name'
    ExpertController.avatarModel = 'avatar'
    ExpertController.languagesModel = ['pl']
    ExpertController.descriptionModel = 'Lorem ipsum dolor sit amet, consectetuer adipiscing'

    spyOn($state, 'go')
    WizardApiMock.putWizardProfileRoute(200, ExpertController.currentWizardState)
    ExpertController.goToSummary()
    expect(ExpertController.currentWizardState.isSummary).toBe(true)
    httpBackend.flush()
    expect($state.go).toHaveBeenCalledWith('app.wizard.summary')
  })

  it('should submit form', () => {
    ExpertController.goToSummary()
    expect(ExpertController.isSubmitted).toBe(true)
  })

  it('should save wizard state', () => {
    spyOn($state, 'go')
    WizardApiMock.putWizardProfileRoute(200, wizardProfile)
    ExpertController.onGoBack()
    expect(ExpertController.currentWizardState.isExpert).toBe(false)
    expect(ExpertController.currentWizardState.isCompany).toBe(false)
    httpBackend.flush()
    expect($state.go).toHaveBeenCalledWith('app.wizard.create-profile')
  })

  it('should name input valid', () => {
    ExpertController.nameModel = 'SomeName'
    expect(ExpertController.checkIsNameInputValid()).toEqual(true)
  })

  it('should avatar valid', () => {
    ExpertController.avatarModel = 'SomeAvatar'
    expect(ExpertController.checkIsAvatarValid()).toEqual(true)
  })

  it('should languages valid', () => {
    ExpertController.languagesModel = ['pl']
    expect(ExpertController.checkIsLanguagesValid()).toEqual(true)
  })

  it('should profile description valid', () => {
    ExpertController.descriptionModel = 'Lorem ipsum dolor sit amet, consectetuer adipiscing'
    expect(ExpertController.checkIsProfileDescriptionValid()).toEqual(true)
  })

  it('should form valid', () => {
    ExpertController.currentWizardState.expertDetailsOption = {
      name: 'name'
    }
    ExpertController.nameModel = 'SomeName'
    ExpertController.avatarModel = 'SomeAvatar'
    ExpertController.languagesModel = ['pl']
    ExpertController.descriptionModel = 'Lorem ipsum dolor sit amet, consectetuer adipiscing'
    expect(ExpertController.checkIsFormValid()).toEqual(true)
  })

  it('should have profile with expert details', inject(($controller: ng.IControllerService) => {
    ExpertController = $controller<ExpertController>('expertController', {
      wizardProfile: {
        isExpert: false,
        isCompany: false,
        isSummary: false,
        expertDetailsOption: {
          name: 'name-1'
        }
      }
    })
    ExpertController.$onInit()
    expect(ExpertController.nameModel).toEqual('name-1')
  }))

  it('should not have wizard profile', () => {
    ExpertController.$onInit()
    expect(ExpertController.currentWizardState.isCompany).toBe(false)
  })

  it('should checkIsAnyStepModelChange', () => {
    const wizardExpertModel: PartialExpertDetails = {
      name: '',
      avatar: undefined,
      languages: [],
      description: '',
      files: [],
      links: []
    }
    ExpertController.saveSteps()
    expect(ExpertController.currentWizardState.expertDetailsOption).toEqual(wizardExpertModel)
  })

})

