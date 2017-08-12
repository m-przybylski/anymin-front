import * as angular from 'angular'
import 'angular-mocks'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {SearchService} from '../../common/services/search/search.service'
import './search-result'
import 'common/services/search/search'
import searchResultPageModule from './search-result'
import searchModule from '../../common/services/search/search'
import {PromiseService} from '../../common/services/promise/promise.service'
import {SearchResultController} from './search-result.controller'

describe('Unit tests: search-result>', () => {
  describe('Testing Controller: SearchResultController', () => {

    let $scope: ng.IScope
    let SearchResultController: SearchResultController
    let state: ng.ui.IStateService

    let promiseService: PromiseService = <PromiseService>{
      setMinimalDelay: {}
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', '')
      $provide.value('promiseService', promiseService)
    }))

    beforeEach(() => {
      angular.mock.module(searchResultPageModule)
      angular.mock.module(searchModule)

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService,
              searchService: SearchService) => {
        $scope = $rootScope.$new()

        state = <ng.ui.IStateService>{
          params: {},
          current: {
            name: 'app.search-result'
          },
          go: (_x: string) => {},
          transitionTo: (_a: string, _b: string) => {}
        }

        SearchResultController = $controller<SearchResultController>('searchResultController', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: state,
          promiseService: promiseService,
          searchService: searchService,
        })

      })
    })

    it('should exsist', () => {
      expect(!!SearchResultController).toBe(true)
    })

    it('should call load more results', () => {
      spyOn(SearchResultController, 'loadMoreResults')
      SearchResultController.onLoadMoreError()
      expect(SearchResultController.loadMoreResults).toHaveBeenCalled()
    })

    it('should stop isSearchLoading after calling onInit', () => {
      SearchResultController.$onInit()
      expect(SearchResultController.isSearchLoading).toBe(false)
    })

    it('should stop isMoreResultsLoading after calling loadMoreResults', () => {
      SearchResultController.loadMoreResults()
      expect(SearchResultController.isMoreResultsLoading).toBe(false)
    })

  })
})
