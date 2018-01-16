import * as angular from 'angular'
import {WizardController} from './wizard.controller'
import wizardWizardModule from './wizard'
import {Config} from '../../../config';
import {StateService, TransitionPromise} from '@uirouter/angularjs'

describe('Testing Controller: WizardController', () => {

  let WizardController: WizardController,
      $state: StateService

  beforeEach(angular.mock.module( ($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL/')
    $provide.value('previousState', '')
  }))

  beforeEach(() => {
    angular.mock.module(wizardWizardModule)

    inject(($controller: ng.IControllerService) => {

      $state = <StateService>{
        go: (_to: string): TransitionPromise => <any>Promise.resolve(<any>{})
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
