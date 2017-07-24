import * as angular from 'angular'
import 'angular-mocks'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {SearchService} from '../../common/services/search/search.service'
import {SearchUrlService} from '../../common/services/search-url/search-url.service'
import './search-result'
import 'common/services/search/search'

describe('Unit tests: search-result>', () => {
  describe('Testing Controller: SearchResultController', () => {

    let $scope: any
    let SearchResultController: any
    let location: ng.ILocationService
    let searchUrlService: SearchUrlService
    let state: ng.ui.IStateService

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', '')
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.controller.search-result')
      angular.mock.module('profitelo.services.search')

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $timeout: ng.ITimeoutService,
              searchService: SearchService) => {
        $scope = $rootScope.$new()
        location = <ng.ILocationService>{
          search: (): object => {
            return {}
          }
        }

        state = <ng.ui.IStateService>{
          current: {
            name: 'app.search-result'
          },
          go: (_x: any): object => {
            return {}
          },
          transitionTo: (_a: any, _b: any): object => {
            return {}
          }
        }

        searchService = <SearchService>{
          onSearchResults: (_$scope, cb: () => void): void => {
            cb()
          },

          setSearchQueryParams: (_params): void => {

          },

          onQueryParamsChange: (_scope, cb): void => {
            cb(angular.extend(location.search(), {q: 'prawo'}))
          }
        }

        searchUrlService = <any> {
          parseParamsForUrl: (): object => {
            return {}
          }
        }

        SearchResultController = $controller('SearchResultController', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: state,
          $$timeout: $timeout,
          searchService: searchService,
          $location: location,
          searchUrlService: searchUrlService
        })

      })
    })

    it('should exsist', () => {
      expect(!!SearchResultController).toBe(true)
    })

    it('should loade more on click', () => {
      SearchResultController.searchResults = {
        count: 10,
        results: [
          {},
          {}
        ]
      }
      SearchResultController.loadMoreOnClick()
      expect(SearchResultController.isLoadMoreLoading).toBe(true)
      expect(SearchResultController.isLoadMoreError).toBe(false)
    })

    it('should loade more on scroll', () => {
      SearchResultController.searchResults = {
        count: 10,
        results: [
          {},
          {}
        ]
      }
      SearchResultController.loadMoreOnScroll()
      expect(SearchResultController.isLoadMoreLoading).toBe(true)
      expect(SearchResultController.isLoadMoreError).toBe(false)
    })
  })
})
