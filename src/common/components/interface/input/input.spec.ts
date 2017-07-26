import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import inputModule from './input'
import {InputComponentController} from './input.controller'
import {IInputComponentBindings} from './input'

describe('Unit testing: profitelo.components.interface.input', () => {
  return describe('for inputPrimary component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: InputComponentController
    let bindings: IInputComponentBindings
    let document: ng.IDocumentService
    let validHTML = '<input-primary>'

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(inputModule)
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
        inputText: 'tekst',
        placeholder: 'placeholder',
        maxLength: '20',
        validationText: 's',
        isValid: true,
        ngRequired: false,
        ngModel: true,
        ngPattern: 'regex'
      }

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $document: document
      }

      component = componentController<InputComponentController, {}>('inputPrimary', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})
