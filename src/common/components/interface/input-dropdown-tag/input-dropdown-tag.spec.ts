import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IWindowService} from '../../../services/window/window.service'
import inputDropdownTagModule from './input-dropdown-tag'
import {IDropdownItem, InputDropdownTagComponentController} from './input-dropdown-tag.controller'
import {InputDropdownTagComponentBindings} from './input-dropdown-tag'
import {CommonSettingsService} from '../../../services/common-settings/common-settings.service'

describe('Unit testing: profitelo.components.interface.input-dropdown-tag', () => {
  return describe('for inputDropdownTag component >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: InputDropdownTagComponentController
    let window: IWindowService
    let bindings: InputDropdownTagComponentBindings
    let document: ng.IDocumentService
    const validHTML = '<input-dropdown-tag data-selected-items-value="selectedItemsValue"></input-dropdown-tag>'
    let filteredItems: IDropdownItem[]
    let CommonSettingsService: CommonSettingsService

    function create(html: string): JQuery {
      scope = rootScope.$new()
      scope.selectedItemsValue = []
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(inputDropdownTagModule)
    })

    beforeEach(() => {
      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, _$window_: IWindowService,
              _$document_: ng.IDocumentService, _CommonSettingsService_: CommonSettingsService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        window = _$window_
        document = _$document_
        CommonSettingsService = _CommonSettingsService_
      })

      bindings = {
        placeholder: 'test',
        label: 'asas',
        hintLabel: 'sdsd',
        dictionary: {
          A: 'AA'
        },
        selectedItemsValue: ['asd']
      }

      filteredItems = [{
        name: 'name2',
        value: 'asd'
      }]

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $document: document
      }

      component = componentController('inputDropdownTag', injectors, bindings)

    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should mainList exists', () => {
      component.dropdownList = [{
        name: 'name',
        value: 'value'
      }]
      expect(component.mainListExist()).toEqual(true)
    })

    it('should inputClick', () => {
      component.inputClick()
      expect(component.isOpen).toBe(false)
    })

    it('should delete selected item', () => {
      const item: IDropdownItem = {
        name: 'name',
        value: 'value'
      }
      component.selectedItems = [{
        name: 'name2',
        value: 'value2'
      }]
      component.filterInputText = 'value'
      component.selectedItemNumber = 2
      component.deleteSelectedItem(item, 0)
      expect(component.selectedItems.length).toBe(0)
      expect(component.selectedItemsValue.length).toBe(0)
      expect(component.dropdownList.length).toBe(1)
      expect(component.selectedItemNumber).toBe(1)
      expect(component.isDirty).toBe(true)
    })

    it('should add selected item', () => {
      const item: IDropdownItem = {
        name: 'name',
        value: 'value'
      }
      component.dropdownList = [{
        name: 'name2',
        value: 'value2'
      }]
      component.filterInputText = 'filterInputText'
      component.onMainItemSelect(item, 0)
      expect(component.selectedItems.length).toBe(1)
      expect(component.isOpen).toBe(false)
      expect(component.selectedItemsValue.length).toBe(2)
      expect(component.dropdownList.length).toBe(0)
      expect(component.isFocus).toBe(false)
      expect(component.filterInputText).toBe('')
    })

    it('should onFocus', () => {
      component.onFocus()
      expect(component.isFocus).toBe(true)
      expect(component.isDirty).toBe(true)
    })

    it('should onBlur', () => {
      component.onBlur()
      expect(component.isFocus).toBe(false)
      expect(component.isDirty).toBe(true)
    })

    it('should select item onClickEnter', () => {
      component.selectedItemNumber = 1
      component.filteredItems = [{
        name: 'newName',
        value: 'newValue'
      }]
      component.selectedItems = []
      component.selectedItemsValue = []
      component.filterInputText = 'qwe'
      component.onClickEnter()
      expect(component.selectedItems.length).toBe(1)
      expect(component.selectedItemsValue.length).toBe(1)
      expect(component.isOpen).toBe(false)
      expect(component.filterInputText).toBe('')
      expect(component.selectedItemNumber).toBe(0)
    })

  })
})
