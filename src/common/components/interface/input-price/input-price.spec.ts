import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import inputPriceModule from './input-price'
import {InputPriceComponentController} from './input-price.controller'
import {IInputPriceComponentBindings} from './input-price'

describe('Unit testing: profitelo.components.interface.input-price', () => {
  return describe('for inputPrice component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: InputPriceComponentController
    let bindings: IInputPriceComponentBindings
    let document: ng.IDocumentService
    let validHTML = '<input-price>'

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(inputPriceModule)
    })

    beforeEach(() => {
      angular.mock.module('pascalprecht.translate')
      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
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
        isValid: true,
        isSubmitted: false,
        ngModel: 0,
        currency: 'PLN',
        ngPattern: new RegExp(/^\d{1,3}([\.,](\d{1,2})?)?$/)
      }

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $document: document
      }

      component = componentController<InputPriceComponentController, {}>('inputPrice', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should set digitsCodesBlocked to empty array', inject(() => {
      component.onChange()
      expect(component.digitsCodesBlocked).toEqual([])
    }))

    it('should block digitsCodesBlocked', inject(() => {
      component.ngModel = 45.45
      component.onChange()
      expect(component.digitsCodesBlocked).toEqual([46, 44])
    }))

    it('trigger keypress digitsCodesBlocked', inject(() => {
      const element = create(validHTML)
      element.trigger('keypress', {keyCode: 46})
      expect(component.digitsCodesBlocked).toEqual([])
    }))

  })
})
