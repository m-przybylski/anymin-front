import * as angular from 'angular'


import {SearchApiMock} from 'profitelo-api-ng/api/api'
import searchDropdownModule from './search-dropdown'
import {SearchDropdownController} from './search-dropdown.controller'
import {keyboardCodes} from '../../classes/keyboard'

describe('Unit testing:profitelo.components.search-dropdown', () => {
  return describe('for search-dropdown >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let scope: ng.IScope
    let state: ng.ui.IStateService
    let componentController: ng.IComponentControllerService
    let component: SearchDropdownController
    const validHTML = '<search-dropdown></search-dropdown>'
    let httpBackend: ng.IHttpBackendService
    let SearchApiMock: SearchApiMock

    function create(html: string): JQuery {
      rootScope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(rootScope)
      rootScope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', '')
      $provide.value('translateFilter', (x: string) => x)}))

    beforeEach(() => {

      angular.mock.module(searchDropdownModule)

      inject(($rootScope: any, $compile: ng.ICompileService, $injector: ng.auto.IInjectorService,
              _$componentController_: ng.IComponentControllerService) => {
        rootScope = $rootScope
        componentController = _$componentController_
        scope = $rootScope.$new()
        compile = $compile
        state = jasmine.createSpyObj('$state', ['go'])
        SearchApiMock = $injector.get<SearchApiMock>('SearchApiMock')
        httpBackend = $injector.get('$httpBackend')
      })

      component = componentController<SearchDropdownController, {}>('searchDropdown',
        {$element: create(validHTML), $scope: scope, $state: state}, {})
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should go to search results with query', () => {
      component.searchValue = 'wyszukaj'
      component.search()
      expect(state.go).toHaveBeenCalled()
    })

    it('should call search on select', () => {
      spyOn(component, 'search')
      component.onItemSelect('prprpr')
      expect(component.search).toHaveBeenCalled()
    })

    it('should focus search on enter', () => {
      spyOn(component, 'search')
      component.onEnter()
      expect(component.search).toHaveBeenCalled()
    })

    it('should check is user press arrow up correctly', () => {
      const el = create(validHTML)
      const controller = el.controller('search-dropdown')
      spyOn(controller, 'isSuggestionsDropdown').and.returnValue(true)
      controller.$onInit()
      const e = jQuery.Event('keydown')
      e.which = keyboardCodes.arrowUp
      e.keyCode = keyboardCodes.arrowUp
      el.triggerHandler(e)
      expect(controller.isSuggestionsDropdown).toHaveBeenCalled()
    })

    it('should check is user press arrow down correctly', () => {
      const el = create(validHTML)
      const controller = el.controller('search-dropdown')
      spyOn(controller, 'isSuggestionsDropdown').and.returnValue(true)
      controller.$onInit()
      const e = jQuery.Event('keydown')
      e.which = keyboardCodes.arrowDown
      e.keyCode = keyboardCodes.arrowDown
      el.triggerHandler(e)
      expect(controller.isSuggestionsDropdown).toHaveBeenCalled()
    })


  })
})
