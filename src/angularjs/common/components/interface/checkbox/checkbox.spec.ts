import * as angular from 'angular'

import CheckboxModule from './checkbox'
import {CheckboxComponentController} from './checkbox.controller'
import {ICheckboxComponentBindings} from './checkbox'

describe('Unit testing: profitelo.components.interface.checkbox', () => {
  return describe('for checkbox component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: CheckboxComponentController
    let bindings: ICheckboxComponentBindings
    let document: ng.IDocumentService
    let validHTML = '<checkbox data-input-text="inputtext" data-additional-text="additinal"' +
      'data-is-disabled="false"></checkbox>'

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(CheckboxModule)
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
        inputText: 'input text',
        additionalText: 'additional text',
        name: 'name',
        alertText: 'alert',
        isDisabled: false,
        ngRequired: false,
        ngModel: false,
        validation: true,
        onChange: (): void => {
        }
      }

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $document: document
      }

      component = componentController<CheckboxComponentController, {}>('checkbox', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should onClick isDisabled', () => {
      component.onClick()
      expect(component.isDisabled).toBe(false)
      expect(component.ngModel).toBe(true)
    })

    it('should onClickCallback not isDisabled', () => {
      component.isDisabled = true
      component.isDisabled = true

      component.onClick()
      expect(component.isDisabled).toBe(true)
      expect(component.ngModel).toBe(false)
    })

    it('should onClickCallback', () => {
      spyOn(component, 'onChange')
      component.onClick()
      expect(component.onChange).toHaveBeenCalled()
    })
  })
})
