import * as angular from 'angular'

import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {SearchApiMock} from 'profitelo-api-ng/api/api'
import searchDropdownModule from './search-dropdown'
import {SearchDropdownController} from './search-dropdown.controller'

describe('Unit testing:profitelo.components.search-dropdown', () => {
  return describe('for search-dropdown >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let scope: ng.IScope
    let state: ng.ui.IStateService
    let componentController: ng.IComponentControllerService
    let component: SearchDropdownController
    let validHTML = '<search-dropdown></search-dropdown>'
    let httpBackend: ng.IHttpBackendService
    let SearchApiMock: SearchApiMock

    function create(html: string) {
      rootScope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(rootScope)
      rootScope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', '')
      $provide.value('translateFilter', (x: string) => x)}))

    beforeEach(() => {

      angular.mock.module(searchDropdownModule)

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, $injector: ng.auto.IInjectorService,
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
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should focus input', () => {
      component.onFocus()
      expect(component.isFocus).toBe(true)
    })

    it('should unfocus input', () => {
      component.onBlur()
      expect(component.isFocus).toBe(false)
    })

    it('should got to search results with query', () => {
      component.searchValue = 'wyszukaj'
      component.search()
      expect(state.go).toHaveBeenCalled()
    })

  })
})
