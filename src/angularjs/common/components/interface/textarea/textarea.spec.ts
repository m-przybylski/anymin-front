import * as angular from 'angular'

import {TextareaComponentController} from './textarea.controller'
import {ITextareaComponentBindings} from './textarea'
import textareaModule from './textarea'
import {IScope} from 'angular'

describe('Unit testing: profitelo.components.interface.textarea', () => {
  return describe('for textareaPrimary component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: TextareaComponentController
    let bindings: ITextareaComponentBindings
    let document: ng.IDocumentService
    const validHTML = '<input-primary>'
    let injectors: { $scope?: IScope, [key: string]: any }

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
      inject(($rootScope: any, $compile: ng.ICompileService,
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
        ngModel: true,
        onChange: (): void => {}
      }


      injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $document: document
      }

      component = componentController<TextareaComponentController, {}>('textareaPrimary', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should type description and invoke onChange callback', () => {
      const description = 'Some text'
      spyOn(component, 'onChange')
      component.onDescriptionChange(description)
      expect(component.onChange).toBeDefined()
      expect(component.onChange).toHaveBeenCalledWith(description)
    })

    it('should check if onChange is defined', () => {
      bindings.onChange = undefined
      component = componentController<TextareaComponentController, {}>('textareaPrimary', injectors, bindings)
      const description = 'Some text'
      component.onDescriptionChange(description)
      expect(component.onChange).toBe(undefined)
    })

  })
})
