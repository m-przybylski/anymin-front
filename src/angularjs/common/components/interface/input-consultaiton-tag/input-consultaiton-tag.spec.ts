import * as angular from 'angular'

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
      inject(($rootScope: any, $compile: ng.ICompileService, promiseService: PromiseService,
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
      expect(component.isInputValidationAlert).toBe(false)
      expect(component.tagModel).toBe('')
    })

    it('should tagModel invalid', () => {
      component.tagModel = ''
      component.onEnter()
      expect(component.isInputValidationAlert).toBe(true)
    })

    it('should add selected number', () => {
      const item = 'item'
      const index = 1
      component.suggestedTags = ['asd', 'dsa']
      component.addSelectedItem(item, index)
      expect(component.selectedTags.length).toBe(1)
      expect(component.isInputValidationAlert).toBe(false)
      expect(component.suggestedTags.length).toBe(1)
    })

    it('should onBlur', () => {
      component.onBlur()
      expect(component.isDirty).toBe(true)
      expect(component.isFocus).toBe(false)
      expect(component.isInputValidationAlert).toBe(false)
    })

    it('should onFocus', () => {
      component.onFocus()
      expect(component.isFocus).toBe(true)
    })

    it('should delete selected item', () => {
      const index = 0
      component.selectedTags = ['selectedTag']
      component.deleteSelectedItem(index)
      expect(component.selectedTags.length).toBe(0)
    })

    it('should show validation error', () => {
      component.isValid = false
      component.isDirty = true
      expect(component.isValidationAlertVisible()).toEqual(true)
    })

    it('should assign validation alert translation when tags count invalid', () => {
      const invalidTagsCount = 22;
      const tag = '';
      component.selectedTags = new Array(invalidTagsCount).fill(tag, 0, invalidTagsCount);
      component.onEnter();
      expect(component.validationAlertTranslation).toEqual(
        'INTERFACE.INPUT_CONSULTATION_TAG.VALIDATION_TEXT.INVALID_TAGS_COUNT');
    });

    it('should assign validation alert translation when tag length invalid', () => {
      component.tagModel = 'a';
      component.onEnter();
      expect(component.validationAlertTranslation).toEqual(
        'INTERFACE.INPUT_CONSULTATION_TAG.VALIDATION_TEXT.INVALID_CHARACTERS_COUNT');
    });

    it('should assign validation alert translation when tag is duplicated', () => {
      component.selectedTags = ['someTag']
      component.tagModel = 'someTag';
      component.onEnter();
      expect(component.validationAlertTranslation).toEqual(
        'INTERFACE.INPUT_CONSULTATION_TAG.VALIDATION_TEXT.INVALID_TAG_DUPLICATED');
    });

    it('should assign validation alert translation when tag has too much words', () => {
      component.tagModel = 'some tag with too much words';
      component.onEnter();
      expect(component.validationAlertTranslation).toEqual(
        'INTERFACE.INPUT_CONSULTATION_TAG.VALIDATION_TEXT.INVALID_WORDS_COUNT');
    });

    it('should assign validation alert translation when tag name invalid', () => {
      component.tagModel = 'WWWW';
      component.onEnter();
      expect(component.validationAlertTranslation).toEqual(
        'INTERFACE.INPUT_CONSULTATION_TAG.VALIDATION_TEXT.INVALID_TAG_NAME');
    });

  })
)
