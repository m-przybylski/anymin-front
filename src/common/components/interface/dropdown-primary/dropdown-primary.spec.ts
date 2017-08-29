import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IWindowService} from '../../../services/window/window.service'
describe('Unit testing: profitelo.components.interface.dropdown-primary', () => {
  return describe('for dropdownPrimary component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let window: IWindowService
    let bindings: any
    let timeout: ng.ITimeoutService
    let document: ng.IDocumentService
    const validHTML = '<dropdown-primary data-label="asd" data-icon="icon"></dropdown-primary>'

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module('profitelo.components.interface.dropdown-primary')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
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
        mainList: {},
        onSelectMain: {},
        selectedItem: {},
        callback: ()=>{}

      }

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $window: window,
        $document: document
      }

      component = componentController('dropdownPrimary', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should $document.bind', () => {
      component.filterBy = {
        name: 'asd'
      }
      document.trigger('click')
      document.bind(event)
      expect(component.isOpen).toBeFalsy()
      scope.$digest()
    })

    it('should call toggleDropdown', () => {
      spyOn(component, 'clearDropdown')
      component.toggleDropdown()
      expect(component.isOpen).toBe(true)
      expect(component.clearDropdown).toHaveBeenCalled()
    })

    it('should call toggleDropdown if isOpen false', () => {
      component.toggleDropdown()
      component.toggleDropdown()
      expect(component.isOpen).toBe(false)
    })

    it('should onMainItemSelect', () => {
      const item = {
        name: 'name',
        value: 0
      }
      spyOn(component, 'onItemChecked')
      spyOn(component, 'onSelectMain')
      component.onMainItemSelect(item)
      expect(component.activeItem).toEqual(item)
      expect(component.onSelectMain).toHaveBeenCalledWith(item)
      expect(component.onItemChecked).toHaveBeenCalledWith(item)
    })

    it('should onMainItemSelect else', () => {
      const item = {
        name: 'name',
        value: 0
      }
      component.onSelectMain = undefined
      spyOn(component, 'onItemChecked')
      component.onMainItemSelect(item)
      expect(component.onSelectMain !== 'function').toBe(true)
    })
  })
})
