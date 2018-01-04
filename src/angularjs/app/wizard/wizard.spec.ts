import * as angular from 'angular'
import {WizardController} from './wizard.controller'
import wizardWizardModule from './wizard'
import {Config} from '../config';

describe('Testing Controller: WizardController', () => {

  let WizardController: WizardController,
      $state: ng.ui.IStateService

  beforeEach(angular.mock.module( ($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL/')
    $provide.value('previousState', '')
  }))

  beforeEach(() => {
    angular.mock.module(wizardWizardModule)

    inject(($controller: ng.IControllerService, $q: ng.IQService) => {

      $state = <ng.ui.IStateService>{
        go: (_to: string): ng.IPromise<{}> => $q.resolve({})
      }

      WizardController = $controller<WizardController>('wizardController', {
        $state,
        previousState: ''
      })
    })
  })

  it('should exists', () => {
    expect(!!WizardController).toBe(true)
  })

  if (!Config.isPlatformForExpert)
    it('should call onModalClose and redirect to home page', () => {
      spyOn($state, 'go')
      WizardController.onModalClose()
      expect($state.go).toHaveBeenCalledWith('app.home')
    })

  if (!Config.isPlatformForExpert)
    it('should call onModalClose and redirect to previous state', inject(($controller: ng.IControllerService) => {
      const previousState = 'previousState'
      WizardController = $controller<WizardController>('wizardController', {
        $state,
        previousState
      })

      spyOn($state, 'go')
      WizardController.onModalClose()
      expect($state.go).toHaveBeenCalledWith(previousState)
    }))
})
