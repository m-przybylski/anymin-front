import * as angular from 'angular'
import {SearchService} from './search.service'
import {SearchApiMock} from 'profitelo-api-ng/api/api'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService

describe('Unit testing: profitelo.services.search >', () => {
  describe('for searchService service >', () => {

    let searchService: SearchService
    let httpBackend: any
    let SearchApiMock: SearchApiMock
    let $rootScope: IRootScopeService

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.services.search')

      inject(($injector: ng.auto.IInjectorService) => {
        searchService = $injector.get<SearchService>('searchService')
        httpBackend = $injector.get<ng.IHttpBackendService>('$httpBackend')
        SearchApiMock = $injector.get<SearchApiMock>('SearchApiMock')
        $rootScope = $injector.get<IRootScopeService>('$rootScope')
      })

    })

    it('should exist', () => {
      expect(true).toBeTruthy()
    })

    it('should return default search parameter', () => {
      const observer = {
        callback: (_: any): void => {
        }
      }
      spyOn(observer, 'callback')

      searchService.onQueryParamsChange($rootScope, (params) => {
        observer.callback(angular.extend({}, params))
      })

      $rootScope.$digest()

      expect(observer.callback).toHaveBeenCalledWith({
        q: undefined,
        tagId: undefined,
        category: undefined,
        profileType: undefined,
        onlyAvailable: false,
        sortBy: 'top',
        language: undefined,
        offset: 0,
        limit: 20,
        minPrice: 0,
        maxPrice: 20
      })
    })

    it('should set implicit search parameters', inject(() => {

      const observer = {
        callback: (_: any): void => {
        }
      }
      spyOn(observer, 'callback')

      searchService.setSearchQueryParams({
        categorySlug: 'test-cat'
      })

      searchService.onQueryParamsChange($rootScope, (params) => {
        observer.callback(angular.extend({}, params))
      })

      $rootScope.$digest()

      expect(observer.callback).toHaveBeenCalledWith({
        q: undefined,
        tagId: undefined,
        category: undefined,
        profileType: undefined,
        onlyAvailable: false,
        sortBy: 'top',
        language: undefined,
        offset: 0,
        limit: 20,
        minPrice: 0,
        maxPrice: 20
      })
    }))

  })
})
