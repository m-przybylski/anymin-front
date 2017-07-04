import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import consultationTagInputModule, {IConsultationTagInputBindings} from './cosnultaiton-tag-input'
import {ConsultationTagInputComponentController} from './cosnultaiton-tag-input.controller'

describe('Unit testing: profitelo.components.interface.consultation-tag-input', () => {
  return describe('for consultationTagInput component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: ConsultationTagInputComponentController
    let validHTML = '<consultation-tag-input></consultation-tag-input>'

    function create(html: string) {
      scope = rootScope.$new()
      scope.selectedItemsValue = []
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(consultationTagInputModule)
    })

    beforeEach(() => {
      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {
        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          $element: create(validHTML),
          $scope: rootScope
        }

        component = $componentController<ConsultationTagInputComponentController, IConsultationTagInputBindings>(
          'consultationTagInput', injectors
        )
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should add tagModel', () => {
      component.tagModel = 'tagModel'
      component.selectedTags = []
      component.onEnter()
      expect(component.selectedTags.length).toBe(1)
      expect(component.isInputValueInvalid).toBe(false)
      expect(component.tagModel).toBe('')
    })

    it('should tagModel invalid', () => {
      component.tagModel = ''
      component.onEnter()
      expect(component.isInputValueInvalid).toBe(true)
    })

    it('should add selected number', () => {
      const item: string = 'item'
      const index: number = 1
      component.dictionary = ['asd', 'dsa']
      component.addSelectedItem(item, index)
      expect(component.selectedTags.length).toBe(1)
      expect(component.isInputValueInvalid).toBe(false)
      expect(component.dictionary.length).toBe(1)
    })

    it('should onBlur', () => {
      component.onBlur()
      expect(component.isDirty).toBe(true)
      expect(component.isFocus).toBe(false)
      expect(component.isInputValueInvalid).toBe(false)
    })

    it('should onFocus', () => {
      component.onFocus()
      expect(component.isFocus).toBe(true)
    })

    it('should delete selected item', () => {
      const index: number = 0
      component.selectedTags = ['selectedTag']
      component.deleteSelectedItem(index)
      expect(component.selectedTags.length).toBe(0)
    })

  })
})
