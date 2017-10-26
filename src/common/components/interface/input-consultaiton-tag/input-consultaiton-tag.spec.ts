import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import inputConsultationTagModule, {IInputConsultationTagBindings} from './input-consultaiton-tag'
import {InputConsultationTagComponentController} from './input-consultaiton-tag.controller'
import {PromiseService} from '../../../services/promise/promise.service'

describe('Unit testing: profitelo.components.interface.input-consultation-tag', () =>
  describe('for inputConsultationTag component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: InputConsultationTagComponentController
    const validHTML = '<input-consultation-tag></input-consultation-tag>'

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(inputConsultationTagModule)
    })

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService): void {
      $provide.value('apiUrl', 'url')
    }))

    beforeEach(() => {
      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, promiseService: PromiseService,
              $componentController: ng.IComponentControllerService) => {
        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          $element: create(validHTML),
          $scope: rootScope,
          promiseService
        }

        component = $componentController<InputConsultationTagComponentController, IInputConsultationTagBindings>(
          'inputConsultationTag', injectors
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
      component.suggestedTags = ['asd', 'dsa']
      component.addSelectedItem(item, index)
      expect(component.selectedTags.length).toBe(1)
      expect(component.isInputValueInvalid).toBe(false)
      expect(component.suggestedTags.length).toBe(1)
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
)
