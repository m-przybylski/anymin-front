import * as angular from 'angular'
import {PinVerificationComponentController, IPinVerificationComponentBindings} from './pin-verification'

describe('Unit testing: profitelo.components.interface.pinVerification', () => {
  return describe('for pinVerification component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: PinVerificationComponentController

    const validHTML =
      '<pin-verification data-on-send-pin-again="asd" data-on-complete-pin-inputs="callback"></pin-verification>'

    const bindings: IPinVerificationComponentBindings = {
      onSendPinAgain: () => {
      },
      onCompletePinInputs: () => {
      }
    }

    function create(html: string, bindings: IPinVerificationComponentBindings) {
      const parentScope = rootScope.$new()
      const parentBoundScope = angular.extend(parentScope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentBoundScope)
      parentBoundScope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module('profitelo.components.interface.pin-verification')

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope
        compile = $compile

        const injectors = {}

        component = $componentController<PinVerificationComponentController, IPinVerificationComponentBindings>(
          'pinVerification', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      let el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })

    it('should sendPinAgain', () => {
      spyOn(component, 'onSendPinAgain')
      component.sendPinAgain()
      expect(component.isButtonDisable).toBe(true)
      expect(component.onSendPinAgain).toHaveBeenCalled()
    })

    it('should pin be correct', () => {
      component.pinInputModels = ['1', '2', '3', '4']
      spyOn(component, 'onCompletePinInputs')
      component.onInputChange()
      expect(component.isPinInCorrect).toBe(false)
      expect(component.onCompletePinInputs).toHaveBeenCalled()
    })

    it('should pin be incorrect', () => {
      component.pinInputModels = ['', '', '3', '4']
      component.onInputChange()
      expect(component.isPinInCorrect).toBe(true)
    })

  })
})
