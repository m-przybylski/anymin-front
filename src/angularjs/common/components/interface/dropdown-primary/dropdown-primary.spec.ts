import * as angular from 'angular'

import {IWindowService} from '../../../services/window/window.service'
import {IDropdownPrimaryComponentBindings} from './dropdown-primary'
import {DropdownPrimaryComponentController} from './dropdown-primary.controller'
import {keyboardCodes} from '../../../classes/keyboard'
describe('Unit testing: profitelo.components.interface.dropdown-primary', () => {
  return describe('for dropdownPrimary component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: DropdownPrimaryComponentController
    let window: IWindowService
    let bindings: IDropdownPrimaryComponentBindings
    let timeout: ng.ITimeoutService
    let document: ng.IDocumentService
    const validHTML = '<dropdown-primary data-label="asd" data-icon="icon">' +
      '<div class="dropdown-header"></div><div class="dropdown-content"></div></dropdown-primary>'

    function create(html: string, bindings: IDropdownPrimaryComponentBindings): JQuery {
      scope = rootScope.$new()
      const parentBoundScope = angular.extend(scope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      parentBoundScope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module('profitelo.components.interface.dropdown-primary')

      inject(($rootScope: any, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, _$window_: IWindowService,
              _$timeout_: ng.ITimeoutService, _$document_: ng.IDocumentService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        timeout = _$timeout_
        window = _$window_
        document = _$document_
      })

      bindings = {
        label: '@',
        inputPlaceholder: '@',
        name: '@',
        placeholder: '@',
        mainList: [{
          name: 'string',
          value: 1
        }],
        onSelectMain: () => {
        },
        selectedItem: {
          name: 'name',
          value: 'value'
        }
      }

      const injectors = {
        $element: create(validHTML, bindings),
        $scope: rootScope,
        $window: window,
        $document: document
      }
      component = componentController<DropdownPrimaryComponentController, {}>('dropdownPrimary', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })

    it('should click on document and close dropdown', () => {
      component.filterBy = {
        name: 'asd'
      }
      document.trigger('click')
      document.bind(event)
      scope.$digest()
      expect(component.isOpen).toBeFalsy()
    })

    it('should open dropdown and call clearDropdown method', () => {
      component.toggleDropdown()
      expect(component.isOpen).toBe(true)
    })

    it('should open and close dropdown', () => {
      component.toggleDropdown()
      component.toggleDropdown()
      expect(component.isOpen).toBe(false)
    })

    it('should add selected item to list and change current item', () => {
      const item = {
        name: 'name',
        value: 0
      }
      spyOn(component, 'onSelectMain')
      component.onMainItemSelect(item)
      expect(component.activeItem).toEqual(item)
      expect(component.onSelectMain).toHaveBeenCalledWith(item)
    })

    it('should check if onSelectMain is a function', () => {
      const item = {
        name: 'name',
        value: 0
      }
      spyOn(component, 'onSelectMain')
      component.onMainItemSelect(item)
      expect(typeof component.onSelectMain === 'function').toBe(true)
      expect(component.onSelectMain).toHaveBeenCalled()
    })

    it('should press arrow-bottom key and not invoke preventDefault', inject(($window: ng.IWindowService) => {
      const event = jQuery.Event('keydown')
      spyOn(event, 'preventDefault')
      event.which = keyboardCodes.arrowDown
      event.keyCode = keyboardCodes.arrowDown
      angular.element($window).trigger(event)
      expect(event.preventDefault).not.toHaveBeenCalled()
    }))
  })
})
