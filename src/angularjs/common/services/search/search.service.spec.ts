import * as angular from 'angular'
import {SearchService} from './search.service'
import {
  GetSearchRequestResult, GetSuggestedQueries, GetSuggestedTags
} from 'profitelo-api-ng/model/models'
import {SearchApiMock} from 'profitelo-api-ng/api/api'
import searchModule from './search'
import {SearchQueryParams} from './search-query-params'
import {ErrorHandlerService} from '../error-handler/error-handler.service'
import {IRootScopeService} from '../root-scope/root-scope.service';

describe('Unit testing: profitelo.services.search >', () => {
  describe('for searchService service >', () => {

    let searchService: SearchService
    let httpBackend: ng.IHttpBackendService
    let SearchApiMock: SearchApiMock
    let $rootScope: IRootScopeService
    let searchQueryParams: SearchQueryParams
    let q: ng.IQService
    let errorHandler: ErrorHandlerService
    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
      angular.mock.module(searchModule)
      searchQueryParams = new SearchQueryParams
      inject(($injector: ng.auto.IInjectorService, $q: ng.IQService) => {
        q = $q
        errorHandler = $injector.get<ErrorHandlerService>('errorHandler')
        searchService = $injector.get<SearchService>('searchService')
        httpBackend = $injector.get<ng.IHttpBackendService>('$httpBackend')
        SearchApiMock = $injector.get<SearchApiMock>('SearchApiMock')
        $rootScope = $injector.get<IRootScopeService>('$rootScope')
      })

    })

    it('should exist', () => {
      expect(true).toBeTruthy()
    })

    it('should call search', (done) => {
      SearchApiMock.postSearchRoute(200, [<GetSearchRequestResult>{}])
      searchQueryParams.setQuery('asd')
      searchService.search(searchQueryParams).then((res) => {
        expect(res).toEqual(<any>[{}])
        done()
      })
      httpBackend.flush()
    })

    it('should call search and error', () => {
      spyOn(errorHandler, 'handleServerError')
      SearchApiMock.postSearchRoute(500, [<GetSearchRequestResult>{}])
      searchQueryParams.setQuery('asd')
      searchService.search(searchQueryParams).catch(() => {
        expect(errorHandler.handleServerError).toHaveBeenCalled()
      })
      httpBackend.flush()
    })

    it('should call querySuggestions', () => {
      SearchApiMock.postQueriesSuggestionsRoute(200, <GetSuggestedQueries>{})
      const querySuggestions = searchService.querySuggestions('aaa')
      httpBackend.flush()
      expect(querySuggestions).toEqual(<any>q.resolve({}))
    })

    it('should call querySuggestionsTags', (done) => {
      SearchApiMock.postTagsSuggestionsRoute(200, <GetSuggestedTags>{})
      searchService.querySuggestedTags('aaa', ['aaa']).then((res) => {
        expect(res).toEqual(<any>{})
        done()
      })
      httpBackend.flush()
    })

    it('should call search and then load more', (done) => {
      SearchApiMock.postSearchRoute(200, [<GetSearchRequestResult>{}])
      searchQueryParams.setQuery('asd')
      searchService.search(searchQueryParams)
      searchService.loadMore(searchQueryParams).then((res) => {
        expect(res).toEqual(<any>[{}])
        done()
      })
      httpBackend.flush()
    })

    it('should call search and then call error on load more', () => {
      SearchApiMock.postSearchRoute(200, [<GetSearchRequestResult>{}])
      searchQueryParams.setQuery('asd')
      searchService.search(searchQueryParams)
      const currentOffset = angular.copy(searchQueryParams.getOffset())
      SearchApiMock.postSearchRoute(500, [<GetSearchRequestResult>{}])
      searchService.loadMore(searchQueryParams).catch(() => {
        expect(currentOffset).toEqual(searchQueryParams.getOffset())
      })
      httpBackend.flush()

    })

  })
})
