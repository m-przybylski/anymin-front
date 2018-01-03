import * as angular from 'angular'

import inputPriceModule from './input-price'
import {InputPriceComponentController} from './input-price.controller'
import {IInputPriceComponentBindings} from './input-price'
import {IScope} from 'angular'
import {keyboardCodes} from '../../../classes/keyboard'

describe('Unit testing: profitelo.components.interface.input-price', () => {
  return describe('for inputPrice component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: InputPriceComponentController
    let bindings: IInputPriceComponentBindings
    let document: ng.IDocumentService
    let injectors: { $scope?: IScope, [key: string]: any }
    let validHTML = '<input-price data-ng-model="ngModel">'

    function create(html: string, bindings: IInputPriceComponentBindings): JQuery {
      scope = rootScope.$new()
      const parentBoundScope = angular.extend(scope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      parentBoundScope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(inputPriceModule)
    })

    beforeEach(() => {
      angular.mock.module('pascalprecht.translate')
      inject(($rootScope: any, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      bindings = {
        id: 'name',
        name: 'name',
        inputText: 'labeltext',
        placeholder: 'placeholder',
        validationText: 's',
        isSubmitted: false,
        ngModel: 0,
        currency: 'PLN',
        inputValueCallback: (): void => {},
        isValid: (): void => {},
        isDisabled: false
      }

      injectors = {
        $element: create(validHTML, bindings),
        $scope: rootScope,
        $document: document
      }

      component = componentController<InputPriceComponentController, {}>('inputPrice', injectors, bindings)
    })

    it('should have a dummy test', inject((): void => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', (): void => {
      const el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })

    it('should set digitsCodesBlocked to empty array', inject((): void => {
      component.onChange()
      expect(component.digitsCodesBlocked).toEqual([])
    }))

    it('should block special signs - comma, dot', inject(() => {
      component.ngModel = 45.45
      component.onChange()
      expect(component.digitsCodesBlocked).toEqual([
        keyboardCodes.dot,
        keyboardCodes.comma,
        keyboardCodes.dotASCI,
        keyboardCodes.commaASCI
      ])
    }))

    it('should call blockInvalidDigits', (): void => {
      spyOn(component, 'blockInvalidDigits')
      component.$onInit()
      expect(component.blockInvalidDigits).toHaveBeenCalled()
    })

    it('should prevent default when typing correct value', (): void => {
      const el = create(validHTML, bindings)
      const event = jQuery.Event('keypress')
      spyOn(event, 'preventDefault')
      event.which = keyboardCodes.zero
      event.keyCode = keyboardCodes.zero
      el.find('input').trigger(event)
      expect(event.preventDefault).not.toHaveBeenCalled()
    })

    it('shouldn`t prevent default when typing correct value', (): void => {
      const el = create(validHTML, bindings)
      const event = jQuery.Event('keypress')
      spyOn(event, 'preventDefault')
      event.which = keyboardCodes.arrowUp
      event.keyCode = keyboardCodes.arrowUp
      el.find('input').trigger(event)
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('should block digitsCodes when using one special sign', inject((): void => {
      const element = create(validHTML, bindings)
      element.trigger('keypress', {keyCode: keyboardCodes.dotASCI})
      expect(component.digitsCodesBlocked).toEqual([])
    }))
  })
})
