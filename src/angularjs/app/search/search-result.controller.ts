import {
  GetSearchRequestResult
} from 'profitelo-api-ng/model/models'
import {SearchService} from '../../common/services/search/search.service'
import {SearchQueryParams} from '../../common/services/search/search-query-params'
import {PromiseService} from '../../common/services/promise/promise.service'
import {ErrorHandlerService} from '../../common/services/error-handler/error-handler.service'
import {StateService, StateParams} from '@uirouter/angularjs'

export class SearchResultController {

  private static readonly minimalLoaderDelay: number = 500
  public stateParams: StateParams
  public searchResults: GetSearchRequestResult[]
  public tags: string[]
  public isMoreResults: boolean = true
  public isMoreResultsLoading: boolean = false
  public isLoadMoreError: boolean = false
  public isSearchLoading: boolean = true
  private searchQueryParams: SearchQueryParams

  static $inject = ['errorHandler', 'searchService', 'promiseService', '$state'];

    constructor(private errorHandler: ErrorHandlerService,
              private searchService: SearchService,
              private promiseService: PromiseService,
              $state: StateService) {

    this.searchQueryParams = new SearchQueryParams
    this.stateParams = $state.params
  }

  $onInit = (): void => {
    if (this.stateParams.q) {
      this.setSearchQueryParams()
      this.promiseService.setMinimalDelay(
        this.searchService.search(this.searchQueryParams), SearchResultController.minimalLoaderDelay
      ).then((values) => {
        this.onSearchSucceed(values)
      }, (error) => {
        this.errorHandler.handleServerError(error)
      }).finally(() => {
        this.isSearchLoading = false
      })
    } else {
      this.isSearchLoading = false
    }
  }

  private onSearchSucceed = (searchResults: GetSearchRequestResult[]): void => {
    this.searchResults = searchResults
    this.searchService.querySuggestedTags(this.searchQueryParams.getQuery(), this.searchQueryParams.getTags())
    .then((response) => this.tags = response.tags)
  }

  private setSearchQueryParams = (): void => {
    this.searchQueryParams.setQuery(this.stateParams.q)
    this.searchQueryParams.setLanguages(this.stateParams.languages || [])
    this.searchQueryParams.setPrice(this.stateParams.maxPrice ? [{
      // TODO Wait for backend: https://git.contactis.pl/itelo/profitelo/issues/999
      currency: 'PLN',
      max: Number(this.stateParams.maxPrice),
      min: Number(this.stateParams.minPrice)
    }] : [])
    this.searchQueryParams.setServiceType(this.stateParams.serviceType)
    this.searchQueryParams.setTags(this.stateParams.tags || [])
  }

  private checkIsPossibleToGetMoreResults = (): boolean =>
    this.isMoreResults && !this.isMoreResultsLoading && this.searchResults && this.searchResults.length > 0

  public onLoadMoreError = (): void => {
    this.isLoadMoreError = false
    this.loadMoreResults()
  }

  public loadMoreResults = (): void => {
    if (this.checkIsPossibleToGetMoreResults()) {
      this.isMoreResultsLoading = true
      this.searchService.loadMore(this.searchQueryParams).then((response) => {
        this.isMoreResults = !(response.length === 0)
        this.searchResults.concat(response)
      }).catch(() => {
        this.isLoadMoreError = true
      }).finally(() => {
        this.isMoreResultsLoading = false
      })
    }
  }
}
