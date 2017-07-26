import * as angular from 'angular'
import {WizardController} from './wizard.controller'
import wizardWizardModule from './wizard'


describe('Testing Controller: WizardController', () => {

  let WizardController: WizardController,
      $state: ng.ui.IStateService

  const previousState: string = 'previousState'

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
        $state: $state
      })
    })
  })

  it('should exists', () => {
    expect(!!WizardController).toBe(true)
  })

  it('should onModalClose redirect to previousState', () => {
    spyOn($state, 'go')
    WizardController.onModalClose()
    expect($state.go).toHaveBeenCalledWith(previousState)
  })

})
