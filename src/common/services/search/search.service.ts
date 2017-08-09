/* tslint:disable:  typedef */
/* tslint:disable:  no-magic-numbers */
/* tslint:disable:  object-literal-shorthand */
/* tslint:disable:  arrow-return-shorthand */

import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {SearchResult} from 'profitelo-api-ng/model/models'
import {SearchApi} from 'profitelo-api-ng/api/api'

export interface INameValue {
  name: string
  value: string | null
}

export interface ISearchSettings {
  language: INameValue[]
  sortBy: string[]
  category: INameValue[]
  profileType: INameValue[]
}

export interface ISearchResultRow { // TODO define type properties
  id: string
}

export interface ISearchQueryParams {
  q?: string,
  tagId?: string,
  category?: string,
  profileType?: string,
  onlyAvailable?: boolean,
  sortBy?: string,
  language?: string,
  offset?: number,
  limit?: number,
  minPrice?: number,
  maxPrice?: number,
  areDirty?: boolean,
  categorySlug?: string
}

export class SearchService {

  private static languageOptions = ['pl']
  private static _profileTypeOptions = ['ORG', 'EXP']
  private static _sortingOptions = ['top', 'new', 'price', '-price']
  private static _queryLimit = 20
  private static searchResultsEvent = 'search-results'
  private static queryParamsEvent = 'search-query-params'

  private _searchResults: SearchResult
  private _queryParams: ISearchQueryParams = {}
  private _previousQueryParams: ISearchQueryParams = {}

  /* @ngInject */
  constructor(private $rootScope: IRootScopeService, private $q: ng.IQService,
              private SearchApi: SearchApi) {

    this.defineQueryProperties(this._queryParams)
  }

  public defineQueryProperties = (obj: any) => {
    return Object.defineProperties(obj, {
      areDirty: {
        enumerable: false,
        writable: true,
        value: undefined
      },

      _q: {
        enumerable: false,
        writable: true,
        value: undefined
      },
      q: {
        enumerable: true,
        get: function () {
          return this._q
        },
        set: function (v) {
          v = v ? String(v) : undefined
          if (v !== this._q) {
            this.areDirty = true
            this._q = v
          }
        }
      },

      _tagId: {
        enumerable: false,
        writable: true,
        value: undefined
      },
      tagId: {
        enumerable: true,
        get: function () {
          return this._tagId
        },
        set: function (v) {
          v = v ? String(v) : undefined
          if (v !== this._tagId) {
            this.areDirty = true
            this._tagId = v
          }
        }
      },

      _category: {
        enumerable: false,
        writable: true,
        value: undefined
      },
      category: {
        enumerable: true,
        get: function () {
          return this._category
        },
        set: function (v) {
          v = v ? String(v) : undefined
          if (v !== this._category) {
            this.areDirty = true
            this._category = v
          }
        }
      },

      _profileType: {
        enumerable: false,
        writable: true,
        value: undefined
      },
      profileType: {
        enumerable: true,
        get: function () {
          return this._profileType
        },
        set: function (v) {
          v = SearchService._profileTypeOptions.indexOf(v) !== -1 ? v : undefined
          if (v !== this._profileType) {
            this.areDirty = true
            this._profileType = v
          }
        }
      },

      _onlyAvailable: {
        enumerable: false,
        writable: true,
        value: false
      },
      onlyAvailable: {
        enumerable: true,
        get: function () {
          return this._onlyAvailable
        },
        set: function (v) {
          v = v === 'true' || v === true
          if (v !== this._onlyAvailable) {
            this.areDirty = true
            this._onlyAvailable = v
          }
        }
      },

      _sortBy: {
        enumerable: false,
        writable: true,
        value: SearchService._sortingOptions[0]
      },
      sortBy: {
        enumerable: true,
        get: function () {
          return this._sortBy
        },
        set: function (v) {
          v = SearchService._sortingOptions.indexOf(v) !== -1 ? v : SearchService._sortingOptions[0]
          if (v !== this._sortBy) {
            this.areDirty = true
            this._sortBy = v
          }
        }
      },

      _language: {
        enumerable: false,
        writable: true,
        value: undefined
      },
      language: {
        enumerable: true,
        get: function () {
          return this._language
        },
        set: function (v) {
          v = SearchService.languageOptions.indexOf(v) !== -1 ? v : undefined
          if (v !== this._language) {
            this.areDirty = true
            this._language = v
          }
        }
      },

      _offset: {
        enumerable: false,
        writable: true,
        value: 0
      },
      offset: {
        enumerable: true,
        get: function () {
          return this._offset
        },
        set: function (v) {
          v = Math.max(0, parseInt(v, 10) || 0)
          if (v !== this._offset) {
            this.areDirty = true
            this._offset = v
          }
        }
      },

      _limit: {
        enumerable: false,
        writable: true,
        value: SearchService._queryLimit
      },
      limit: {
        enumerable: true,
        get: function () {
          return this._limit
        },
        set: function (v) {
          v = Math.max(0, parseInt(v, 10) || SearchService._queryLimit)
          if (v !== this._limit) {
            this.areDirty = true
            this._limit = v
          }
        }
      },

      _minPrice: {
        enumerable: false,
        writable: true,
        value: 0
      },
      minPrice: {
        enumerable: true,
        get: function () {
          return this._minPrice
        },
        set: function (v) {
          v = Math.max(0, Math.min(100, parseInt(v, 10) || 0))
          if (v !== this._minPrice) {
            this.areDirty = true
            this._minPrice = v
          }
        }
      },

      _maxPrice: {
        enumerable: false,
        writable: true,
        value: 20
      },
      maxPrice: {
        enumerable: true,
        get: function () {
          return this._maxPrice
        },
        set: function (v) {
          v = Math.max(0, Math.min(100, parseInt(v, 10) || 20))
          if (v !== this._maxPrice) {
            this.areDirty = true
            this._maxPrice = v
          }
        }
      }
    })
  }

  public search = (query: ISearchQueryParams): ng.IPromise<SearchResult> => {
    function _maxPriceParser(maxPrice?: number) {
      if (maxPrice === 20) {
        return undefined
      } else {
        return (maxPrice) ? maxPrice * 100 : undefined
      }
    }

    const onlyAvailableString: string = (query.onlyAvailable) ? query.onlyAvailable.toString() : 'false'

    return this.SearchApi.searchRoute(
      query.q, undefined, undefined, undefined, query.tagId, query.profileType, onlyAvailableString,
      query.sortBy, query.language, (query.minPrice) ? query.minPrice * 100 :
                                                       query.minPrice, _maxPriceParser(query.maxPrice),
      query.offset, SearchService._queryLimit,
    )
  }

  public suggest = (q: string) => {
    return this.SearchApi.postQueriesSuggestionsRoute({query: q})
  }

  private _notifyOnSearchResults = (err: any, results: SearchResult | null, prevResults: SearchResult | null) => {
    this.$rootScope.$emit(SearchService.searchResultsEvent, err, results, prevResults)
  }

  private _notifyOnQueryParams = (queryParams: ISearchQueryParams) => {
    this.$rootScope.$emit(SearchService.queryParamsEvent, queryParams)
  }

  public onSearchResults = (scope: ng.IScope,
                            callback: (err: string, results: SearchResult, prevResults: SearchResult) => void) => {
    scope.$on(
      '$destroy',
      this.$rootScope.$on(SearchService.searchResultsEvent, (_, err, results, prevResults) => {
        return callback(err, results, prevResults)
      })
    )
  }

  public onQueryParamsChange = (scope: ng.IScope, callback: (results: ISearchQueryParams) => void) => {
    scope.$on(
      '$destroy',
      this.$rootScope.$on(SearchService.queryParamsEvent, (_, results) => {
        return callback(results)
      })
    )
    this._notifyOnQueryParams(this._queryParams)
  }

  private _resolveCategoryId = (_params: ISearchQueryParams) => {
    const _deferred = this.$q.defer()

    _deferred.resolve()

    return _deferred.promise
  }

  private _isQueryParamsNextPage = (newQuery: ISearchQueryParams, oldQuery: ISearchQueryParams) => {
    const copyQ1 = angular.copy(newQuery)
    const copyQ2 = angular.copy(oldQuery)

    copyQ1.offset = undefined
    copyQ1.limit = undefined
    copyQ2.offset = undefined
    copyQ2.limit = undefined

    return (angular.equals(copyQ1, copyQ2) && typeof(newQuery.offset) !== 'undefined' &&
    typeof(oldQuery.offset) !== 'undefined' && this._previousQueryParams.limit &&
    (oldQuery.offset + this._previousQueryParams.limit) === newQuery.offset)
  }

  public setSearchQueryParams = (newQueryParams: ISearchQueryParams) => {
    this._resolveCategoryId(newQueryParams).then(() => {
      angular.forEach(Object.keys(this._queryParams), (fieldName: string) => {
        if (newQueryParams.hasOwnProperty(fieldName)) {
          (<any>this._queryParams)[fieldName] = (<any>newQueryParams)[fieldName]
        } else {
          (<any>this._queryParams)[fieldName] = undefined
        }
      })
      if (angular.isDefined(this._queryParams.areDirty) && this._queryParams.areDirty) {
        if (this._queryParams.q || this._queryParams.tagId || this._queryParams.category) {
          this.search(this._queryParams).then((response: SearchResult) => {
            this._queryParams.areDirty = false
            this._notifyOnQueryParams(this._queryParams)
            if (this._isQueryParamsNextPage(this._queryParams, this._previousQueryParams)) {
              this._notifyOnSearchResults(null, response, this._searchResults)
            } else {
              this._notifyOnSearchResults(null, response, null)
            }
            this._searchResults = response
            this._previousQueryParams = angular.copy(this._queryParams)
          }, (err: any) => {
            if (this._isQueryParamsNextPage(this._queryParams, this._previousQueryParams)) {
              this._notifyOnSearchResults(err, null, this._searchResults)
            } else {
              this._notifyOnSearchResults(err, null, null)
            }
          })
        }
      } else {
        this._notifyOnQueryParams(this._queryParams)
        this._notifyOnSearchResults(null, this._searchResults, null)
      }
    })
  }

  public parseQueryParams = (queryParams: ISearchQueryParams) => {
    const parsedQueryParams = {}
    this.defineQueryProperties(parsedQueryParams)

    angular.forEach(Object.keys(parsedQueryParams), (fieldName) => {
      if (queryParams.hasOwnProperty(fieldName)) {
        (<any>parsedQueryParams)[fieldName] = (<any>queryParams)[fieldName]
      }
    })
    return parsedQueryParams
  }

  public getAvailableOptions = (): ISearchSettings => {

    const options: ISearchSettings = {
      language: [<INameValue>{name: 'all', value: null}].concat(
        SearchService.languageOptions.map((lng) => ({name: lng, value: lng}))),
      sortBy: SearchService._sortingOptions,
      category: [{name: 'all', value: null}],
      profileType: [{name: 'ALL', value: null}, {name: 'ORGANIZATION', value: 'ORG'}, {name: 'EXPERT', value: 'EXP'}]
    }

    return options
  }
}
