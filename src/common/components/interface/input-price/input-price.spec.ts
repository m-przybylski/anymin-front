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

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
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
        placeholder: 'placeholder',
        validationText: 's',
        isValid: true,
        ngModel: 0,
        currency: 'PLN'
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
  })
})
