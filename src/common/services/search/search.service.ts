module profitelo.services.search {

  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import ICategoryService = profitelo.services.categoryService.ICategoryService

  interface NameValue {
    name: string
    value: string
  }

  export interface ISearchSettings {
    language: Array<NameValue>
    sortBy: Array<string>
    category: Array<NameValue>
    profileType: Array<NameValue>
  }

  export interface ISearchResultRow { // TODO define type properties

  }

  export interface ISearchResults {
    count: number
    offset: number
    results: ISearchResultRow
    relatedTags: Array<Tag>
  }

  export interface ISearchQueryParams {
    q?: string,
    tagId?: string,
    category?: string,
    profileType?: string,
    onlyAvailable?: string,
    sortBy?: string,
    language?: string,
    offset?: number,
    limit?: number,
    minPrice?: number,
    maxPrice?: number,
    areDirty?: boolean
  }

  export interface ISearchService {
    search(query: ISearchQueryParams): ng.IPromise<ISearchResults>
    suggest(q: string): ng.IPromise<any> // TODO add type
    setSearchQueryParams(newQueryParams: ISearchQueryParams): void
    onSearchResults(scope: ng.IScope,
                    callback: (err: string, results: ISearchResults, prevResults: ISearchResults) => void)
    onQueryParamsChange(scope: ng.IScope, cb: (params: ISearchQueryParams) => void)
    getAvailableOptions(): ng.IPromise<ISearchSettings>
    defineQueryProperties(params: ISearchQueryParams): ISearchQueryParams
    parseQueryParams(obj: Object): ISearchQueryParams
  }

  class SearchService implements ISearchService {

    private static _languageOptions = ['pl']
    private static _profileTypeOptions = ['ORG', 'EXP']
    private static _sortingOptions = ['top', 'new', 'price', '-price']
    private static _queryLimit = 20
    private static searchResultsEvent = 'search-results'
    private static queryParamsEvent = 'search-query-params'

    private _searchResults = null
    private _queryParams: ISearchQueryParams = {}
    private _previousQueryParams: ISearchQueryParams = {}

    constructor(private $rootScope: IRootScopeService, private $q: ng.IQService,
                private categoryService: ICategoryService, private SearchApi) {

      this.defineQueryProperties(this._queryParams)
    }

    public defineQueryProperties = (obj) => {
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
            v = SearchService._languageOptions.indexOf(v) !== -1 ? v : undefined
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
          value: 100
        },
        maxPrice: {
          enumerable: true,
          get: function () {
            return this._maxPrice
          },
          set: function (v) {
            v = Math.max(0, Math.min(100, parseInt(v, 10) || 100))
            if (v !== this._maxPrice) {
              this.areDirty = true
              this._maxPrice = v
            }
          }
        }
      })
    }

    public search = (query) => {
      function _maxPriceParser(maxPrice) {
        if (maxPrice === 100) {
          return null
        } else {
          return maxPrice * 100
        }
      }

      return this.SearchApi.search({
        'q': query.q,
        'tag.id': query.tagId,
        'service.category.id': query.category,
        'profile.type': query.profileType,
        'onlyAvailable': query.onlyAvailable,
        'sortBy': query.sortBy,
        'language': query.language,
        'offset': query.offset,
        'limit': SearchService._queryLimit,
        'minPrice': query.minPrice * 100,
        'maxPrice': _maxPriceParser(query.maxPrice)
      }).$promise.then((response) => {
        return {
          count: response.count,
          offset: response.offset,
          results: response.results,
          relatedTags: response.relatedTags
        }
      })
    }

    public suggest = (q: string) => {
      return this.SearchApi.searchSuggestions({
        q: q
      }).$promise
    }

    private _notifyOnSearchResults = (err, results, prevResults) => {
      this.$rootScope.$emit(SearchService.searchResultsEvent, err, results, prevResults)
    }

    private _notifyOnQueryParams = (queryParams) => {
      this.$rootScope.$emit(SearchService.queryParamsEvent, queryParams)
    }

    public onSearchResults = (scope: ng.IScope,
                              callback: (err: string, results: ISearchResults, prevResults: ISearchResults) => void
    ) => {
      scope.$on(
        '$destroy',
        this.$rootScope.$on(SearchService.searchResultsEvent, (_, err, results, prevResults) => {
          return callback(err, results, prevResults)
        })
      )
    }

    public onQueryParamsChange = (scope, callback) => {
      scope.$on(
        '$destroy',
        this.$rootScope.$on(SearchService.queryParamsEvent, (_, results) => {
          return callback(results)
        })
      )
      this._notifyOnQueryParams(this._queryParams)
    }

    private _resolveCategoryId = (params) => {
      const _deferred = this.$q.defer()

      if (angular.isDefined(params.categorySlug) && params.categorySlug) {
        this.categoryService.getCategoryBySlug(params.categorySlug).then((category) => {
          delete params['categorySlug']
          params['category'] = category.id
          _deferred.resolve()
        })
      } else {
        _deferred.resolve()
      }

      return _deferred.promise
    }

    private _isQueryParamsNextPage = (newQuery, oldQuery) => {
      const copyQ1 = angular.copy(newQuery)
      const copyQ2 = angular.copy(oldQuery)

      copyQ1.offset = undefined
      copyQ1.limit = undefined
      copyQ2.offset = undefined
      copyQ2.limit = undefined

      return (angular.equals(copyQ1, copyQ2) && angular.isDefined(newQuery.offset) && angular.isDefined(oldQuery.offset) &&
      (oldQuery.offset + this._previousQueryParams.limit) === newQuery.offset)
    }

    public setSearchQueryParams = (newQueryParams: ISearchQueryParams) => {
      this._resolveCategoryId(newQueryParams).then(() => {
        angular.forEach(Object.keys(this._queryParams), (fieldName) => {
          if (newQueryParams.hasOwnProperty(fieldName)) {
            this._queryParams[fieldName] = newQueryParams[fieldName]
          } else {
            this._queryParams[fieldName] = undefined
          }
        })
        if (angular.isDefined(this._queryParams.areDirty) && this._queryParams.areDirty) {
          if (this._queryParams.q || this._queryParams.tagId || this._queryParams.category) {
            this.search(this._queryParams).then((response) => {
              this._queryParams.areDirty = false
              this._notifyOnQueryParams(this._queryParams)
              if (this._isQueryParamsNextPage(this._queryParams, this._previousQueryParams)) {
                this._notifyOnSearchResults(null, response, this._searchResults)
              } else {
                this._notifyOnSearchResults(null, response, null)
              }
              this._searchResults = response
              this._previousQueryParams = angular.copy(this._queryParams)
            }, (err) => {
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

    public parseQueryParams = (queryParams) => {
      const parsedQueryParams = {}
      this.defineQueryProperties(parsedQueryParams)

      angular.forEach(Object.keys(parsedQueryParams), (fieldName) => {
        if (queryParams.hasOwnProperty(fieldName)) {
          parsedQueryParams[fieldName] = queryParams[fieldName]
        }
      })
      return parsedQueryParams
    }

    public getAvailableOptions = (): ng.IPromise<ISearchSettings> => {
      const options: ISearchSettings = {
        language: [{name: 'all', value: null}].concat(SearchService._languageOptions.map((lng) => {
          return {name: lng, value: lng}
        })),
        sortBy: SearchService._sortingOptions,
        category: [{name: 'all', value: null}],
        profileType: [{name: 'ALL', value: null}, {name: 'ORGANIZATION', value: 'ORG'}, {name: 'EXPERT', value: 'EXP'}]
      }
      return this.categoryService.listTopLevelCategories().then((categories) => {
        options.category = options.category.concat(categories.map((category) => {
          return {
            name: category.slug,
            value: category.id
          }
        }))
        return options
      })
    }
  }

  angular.module('profitelo.services.search', [
    'profitelo.swaggerResources',
    'profitelo.services.categories'
  ]).service('searchService', SearchService)
}

