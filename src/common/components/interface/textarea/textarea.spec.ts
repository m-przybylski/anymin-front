import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {TextareaComponentController} from './textarea.controller'
import {ITextareaComponentBindings} from './textarea'
import textareaModule from './textarea'

describe('Unit testing: profitelo.components.interface.textarea', () => {
  return describe('for textareaPrimary component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: TextareaComponentController
    let bindings: ITextareaComponentBindings
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
      angular.mock.module(textareaModule)
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
        validationText: 'tekst',
        isValid: true,
        ngModel: true
      }

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $document: document
      }

      component = componentController<TextareaComponentController, {}>('textareaPrimary', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})
