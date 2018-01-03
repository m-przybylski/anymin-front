import * as angular from 'angular'

import ValidationAlertModule, {IValidationAlertBindings} from './validation-alert'
import {ValidationAlertComponentController} from './validation-alert.controller'

describe('Unit testing: profitelo.components.interface.alert.validation-alert', () => {
  return describe('for validation-alert component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: ValidationAlertComponentController
    let bindings: IValidationAlertBindings
    let document: ng.IDocumentService
    let validHTML = '<validation-alert></validation-alert>'

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(ValidationAlertModule)
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
        alertText: 'input text',
        isVisible: true
      }

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $document: document
      }

      component = componentController<ValidationAlertComponentController, {}>('validationAlert', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})
