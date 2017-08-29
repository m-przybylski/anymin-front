import * as angular from 'angular'
import {WizardController} from './wizard.controller'
import wizardWizardModule from './wizard'


describe('Testing Controller: WizardController', () => {

  let WizardController: WizardController,
      $state: ng.ui.IStateService

  let previousState: string

  beforeEach(angular.mock.module( ($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL/')
    $provide.value('previousState', previousState)
  }))

  beforeEach(() => {
    angular.mock.module(wizardWizardModule)

    inject(($controller: ng.IControllerService, $q: ng.IQService) => {

      $state = <ng.ui.IStateService>{
        go: (_to: string): ng.IPromise<{}> => $q.resolve({})
      }

      WizardController = $controller<WizardController>('wizardController', {
        $state: $state,
        previousState: previousState
      })
    })
  })

  it('should exists', () => {
    expect(!!WizardController).toBe(true)
  })

  it('should onModalClose redirect to home', () => {
    spyOn($state, 'go')
    WizardController.onModalClose()
    expect($state.go).toHaveBeenCalledWith('app.home')
  })

  it('should onModalClose redirect to previousState', inject(($controller: ng.IControllerService) => {
    previousState = 'previousState'

    WizardController = $controller<WizardController>('wizardController', {
      $state: $state,
      previousState: previousState
    })

    spyOn($state, 'go')
    WizardController.onModalClose()
    expect($state.go).toHaveBeenCalledWith(previousState)
  }))
})
