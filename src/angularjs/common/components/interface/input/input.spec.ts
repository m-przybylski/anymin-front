import * as angular from 'angular'

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
    let validHTML = '<input-primary data-type="tel"></input-primary>'
    let CommonSettingsService: CommonSettingsService
    let injectors: { $scope?: IScope, [key: string]: any }

    function create(html: string, bindings: IInputComponentBindings): JQuery {
      scope = rootScope.$new()
      const parentBoundScope = angular.extend(scope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      parentBoundScope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(inputModule)
    })

    beforeEach(() => {
      angular.mock.module('pascalprecht.translate')
      inject(($rootScope: any, $compile: ng.ICompileService,
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
        $element: create(validHTML, bindings),
        $scope: rootScope,
        $document: document
      }

      component = componentController<InputComponentController, {}>('inputPrimary', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })

    it('should call blockInvalidDigits with type number', () => {
      bindings.type = 'number'
      const component = componentController<InputComponentController, {}>('inputPrimary', injectors, bindings)
      spyOn(component, 'blockInvalidDigits')
      component.$onInit()
      expect(component.blockInvalidDigits).toHaveBeenCalled()
    })

    it('should call blockInvalidDigits with type tel', () => {
      bindings.type = 'tel'
      const component = componentController<InputComponentController, {}>('inputPrimary', injectors, bindings)
      spyOn(component, 'blockInvalidDigits')
      component.$onInit()
      expect(component.blockInvalidDigits).toHaveBeenCalled()
    })

    it('should not call blockInvalidDigits when type undefined', () => {
      bindings.type = ''
      const component = componentController<InputComponentController, {}>('inputPrimary', injectors, bindings)
      spyOn(component, 'blockInvalidDigits')
      expect(component.blockInvalidDigits).not.toHaveBeenCalled()
    })

    it('should check if user typing correct value in input', () => {
      const el = create(validHTML, bindings)
      bindings.type = 'number'
      const event = jQuery.Event('keypress')
      spyOn(event, 'preventDefault')
      event.which = 48
      event.keyCode = 48
      el.find('input').trigger(event)
      expect(event.preventDefault).not.toHaveBeenCalled()
    })

    it('should check if user typing incorrect value in input', () => {
      const el = create(validHTML, bindings)
      const event = jQuery.Event('keypress')
      spyOn(event, 'preventDefault')
      event.which = 12
      event.keyCode = 12
      el.find('input').trigger(event)
      expect(event.preventDefault).toHaveBeenCalled()
    })
  })
})
