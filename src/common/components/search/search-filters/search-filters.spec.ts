import * as angular from 'angular'
import {ISearchFiltersComponentBindings} from './search-filters'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {SearchFiltersComponentController} from './search-filters.controller'

describe('Unit testing: profitelo.components.search.searchFilters', () => {
  return describe('for Search Filters component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: SearchFiltersComponentController
    let timeout: ng.ITimeoutService
    const searchService = {
    }
    const bindings: ISearchFiltersComponentBindings = {
      tags: ['tag-1']
    }
    const validHTML: string =
      '<search-filters></search-filters>'

    const commonConfig = {
      getAllData: () => ({
        config: {
          moneyDivider: 100,
          'supported-languages': ['polski, czeski, niemiecki']
        }
      })
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {

      angular.mock.module('profitelo.components.search.searchFilters')
      angular.mock.module('profitelo.directives.interface.pro-range-slider')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService,
              $timeout: ng.ITimeoutService, $httpBackend: ng.IHttpBackendService) => {

        rootScope = $rootScope.$new()
        compile = $compile
        timeout = $timeout
        const injectors = {
          searchService: searchService,
          CommonConfig: commonConfig,
          $element: create(validHTML, {})
        }

        component = $componentController<SearchFiltersComponentController, ISearchFiltersComponentBindings>(
          'searchFilters', injectors, bindings
        )

        $httpBackend.when('GET', require("../../../templates/range-slider/range-slider.tpl.pug")).respond(200, {})
      })
    })

    function create(html: string, bindings: {}): JQuery {
      const parentScope: ng.IScope = rootScope.$new()
      const parentBoundScope = angular.extend(parentScope, bindings)
      const elem: JQuery = angular.element(html)
      const compiledElement: JQuery = compile(elem)(parentBoundScope)
      parentBoundScope.$digest()
      return compiledElement
    }

  })
})
