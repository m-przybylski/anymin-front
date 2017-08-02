import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import inputPasswordModule from './input-password'
import {InputPasswordComponentController} from './input-password.controller'
import {IInputPasswordComponentBindings} from './input-password'

describe('Unit testing: profitelo.components.interface.input', () => {
  return describe('for inputPrimary component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: InputPasswordComponentController
    let bindings: IInputPasswordComponentBindings
    let document: ng.IDocumentService
    const validHTML = '<input-primary type="tel"></input-primary>'

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(inputPasswordModule)
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
        type: 'tel',
        inputText: 'tekst',
        placeholder: 'placeholder',
        validationText: 's',
        isValid: true,
        ngRequired: false,
        ngModel: 'string',
        ngPattern: '(/^{1,3}$/)',
        isSubmitted: true,
        onChange: 'name2'
      }

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $document: document
      }

      component = componentController<InputPasswordComponentController, {}>('inputPassword', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should call blockInvalidPhonenumberDigits on component init', inject(() => {
      spyOn(component, 'blockInvalidPhonenumberDigits')
      component.$onInit()
      expect(component.blockInvalidPhonenumberDigits).toHaveBeenCalled()
    }))

  })
})
