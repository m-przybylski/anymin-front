import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import inputModule from './input'
import {InputComponentController} from './input.controller'
import {IInputComponentBindings} from './input'
import {CommonSettingsService} from '../../../services/common-settings/common-settings.service'
import IScope = angular.IScope

describe('Unit testing: profitelo.components.interface.input', () => {
  return describe('for inputPrimary component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: InputComponentController
    let bindings: IInputComponentBindings
    let document: ng.IDocumentService
    let validHTML = '<input-primary></input-primary>'
    let CommonSettingsService: CommonSettingsService
    let injectors: { $scope?: IScope, [key: string]: any }
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
              _$componentController_: ng.IComponentControllerService,
              _CommonSettingsService_: CommonSettingsService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        CommonSettingsService = _CommonSettingsService_
      })

      bindings = {
        id: 'name',
        name: 'name',
        type: 'tel',
        inputText: 'tekst',
        placeholder: 'placeholder',
        maxLength: '20',
        validationText: 's',
        isValid: true,
        ngRequired: false,
        ngModel: 'string',
        isSubmitted: true
      }

      injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $document: document
      }

      component = componentController<InputComponentController, {}>('inputPrimary', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should call blockInvalidPhonenumberDigits on component init', inject(() => {
      spyOn(component, 'blockInvalidDigits')
      component.$onInit()
      expect(component.blockInvalidDigits).toHaveBeenCalled()
    }))

    it('should call blockInvalidPhonenumberDigits on component init', inject(() => {
      bindings.type = 'number'
      component = componentController<InputComponentController, {}>('inputPrimary', injectors, bindings)
      spyOn(component, 'blockInvalidDigits')
      component.$onInit()
      expect(component.blockInvalidDigits).toHaveBeenCalled()
    }))

    it('should call blockInvalidPhonenumberDigits on component init', inject(() => {
      bindings.type = 'tel'
      component = componentController<InputComponentController, {}>('inputPrimary', injectors, bindings)
      spyOn(component, 'blockInvalidDigits')
      component.$onInit()
      expect(component.blockInvalidDigits).toHaveBeenCalled()
    }))
  })
})
