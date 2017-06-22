import * as angular from 'angular'

import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {SearchApiMock} from 'profitelo-api-ng/api/api'

describe('Unit testing:profitelo.components.pro-search-dropdown', () => {
  return describe('for pro-search-dropdown >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let scope: any
    let state: any
    let componentController: any
    let component: any
    let validHTML = '<pro-search-dropdown data-mask-search="vm.interfaceController.hideSearchMask"></pro-search-dropdown>'
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
      $provide.value('translateFilter', (x: any) => {
        return x
      })
    }))

    beforeEach(() => {

      angular.mock.module('profitelo.components.pro-search-dropdown')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, $injector: ng.auto.IInjectorService, _$componentController_: ng.IComponentControllerService) => {
        rootScope = $rootScope
        componentController = _$componentController_
        scope = $rootScope.$new()
        compile = $compile
        state = $injector.get('$state')
        SearchApiMock = $injector.get<SearchApiMock>('SearchApiMock')
        httpBackend = $injector.get('$httpBackend')
      })

      component = componentController('proSearchDropdown', {$element: create(validHTML), $scope: scope}, {
        maskSearch: false,
        ngModel: 'ngModel',
        searchCount: 1
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should watch query', () => {
      //FIXME type
      SearchApiMock.searchSuggestionsRoute(200, undefined, undefined, <any>{})
      component.ngModel = 'foo'
      rootScope.$digest()

      expect(component.primarySuggestion).toEqual('')
    })

    it('should be focused', () => {
      component.onFocus()
      expect(component.isFocused).toBe(true)
      expect(component.isCollapsed).toBe(false)
    })

    it('should focused out', () => {
      component.isMouseOverDropdown = false
      component.onFocusOut()
      expect(component.isFocused).toBe(false)
      expect(component.isCollapsed).toBe(true)
      expect(component.maskSearch).toBe(true)
    })

    it('should mouse leave', () => {
      component.onDropdownMouseLeave()
      expect(component.isMouseOverDropdown).toBe(false)
    })

    it('should mouse leave', () => {
      component.onDropdownMouseEnter()
      expect(component.isMouseOverDropdown).toBe(true)
    })

    it('should clear model', () => {
      component.clearModel()
      expect(component.ngModel).toBeNull()
      expect(component.currentTagId).toBeNull()
    })

    it('should redirect to app.search-result', () => {
      spyOn(state, 'go')
      component.search()
      expect(state.go).toHaveBeenCalledWith('app.search-result', {q: 'ngModel', tagId: null})
    })

    it('should show results counter', () => {
      component.isCollapsed = true
      expect(component.showResultsCounter()).toEqual(true)
    })

  })
})
