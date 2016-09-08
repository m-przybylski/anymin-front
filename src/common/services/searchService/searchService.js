
  function searchService($rootScope, $q, SearchApi, categoryService) {

    let
      _languageOptions = ['pl'],
      _profileTypeOptions = ['ORG', 'EXP'],
      _sortingOptions = ['top', 'new', 'price', '-price'],
      _searchResults,
      _queryParams = {}

    Object.defineProperties(_queryParams, {
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
        get: function() {
          return this._q
        },
        set: function(v) {
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
        get: function() {
          return this._tagId
        },
        set: function(v) {
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
        get: function() {
          return this._category
        },
        set: function(v) {
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
        get: function() {
          return this._profileType
        },
        set: function(v) {
          v = _profileTypeOptions.indexOf(v) !== -1 ? v : undefined
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
        get: function() {
          return this._onlyAvailable
        },
        set: function(v) {
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
        value: _sortingOptions[0]
      },
      sortBy: {
        enumerable: true,
        get: function() {
          return this._sortBy
        },
        set: function(v) {
          v = _sortingOptions.indexOf(v) !== -1 ? v : _sortingOptions[0]
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
        get: function() {
          return this._language
        },
        set: function(v) {
          v = _languageOptions.indexOf(v) !== -1 ? v : undefined
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
        get: function() {
          return this._offset
        },
        set: function(v) {
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
        value: 42
      },
      limit: {
        enumerable: true,
        get: function() {
          return this._limit
        },
        set: function(v) {
          v = Math.max(0, parseInt(v, 10) || 42)
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
        get: function() {
          return this._minPrice
        },
        set: function(v) {
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
        get: function() {
          return this._maxPrice
        },
        set: function(v) {
          v = Math.max(0, Math.min(100, parseInt(v, 10) || 100))
          if (v !== this._maxPrice) {
            this.areDirty = true
            this._maxPrice = v
          }
        }
      }
    })

    function _search(query) {
      let _deferred = $q.defer()

      SearchApi.search({
        'q': query.q,
        // 'service.name': query.serviceName,
        // 'profile.name': query.profileName,
        // 'profile.desc': query.profileDesc,
        'tag.id': query.tagId,
        'service.category.id': query.category,
        'profile.type': query.profileType,
        'onlyAvailable': query.onlyAvailable,
        'sortBy': query.sortBy,
        'language': query.language,
        'offset': query.offset,
        'limit': query.limit,
        'minPrice': query.minPrice,
        'maxPrice': query.maxPrice
      }).$promise.then((response) => {
        _deferred.resolve({
          count: response.count,
          offset: response.offset,
          results: response.results
        })
      })

      return _deferred.promise
    }

    function _suggest(q) {
      let _deferred = $q.defer()

      SearchApi.searchSuggestions({
        q: q
      }).$promise.then((response) => {
        _deferred.resolve(response)
      })

      return _deferred.promise
    }

    const searchResultsEvent = 'search-results'
    const queryParamsEvent = 'search-query-params'

    function _notifyOnSearchResults(results) {
      $rootScope.$emit(searchResultsEvent, results)
    }

    function _notifyOnQueryParams(queryParams) {
      $rootScope.$emit(queryParamsEvent, queryParams)
    }

    function _subscribeForSearchResults(scope, callback) {
      scope.$on(
        '$destroy',
        $rootScope.$on(searchResultsEvent, (_, results) => { return callback(results) })
      )
      if (_searchResults) {
        _notifyOnSearchResults(_searchResults)
      }
    }

    function _subscribeForQueryParams(scope, callback) {
      scope.$on(
        '$destroy',
        $rootScope.$on(queryParamsEvent, (_, results) => { return callback(results) })
      )
      _notifyOnQueryParams(_queryParams)
    }

    function _resolveCategoryId(params) {
      let _deferred = $q.defer()

      if (params.categorySlug) {
        categoryService.getCategoryBySlug(params.categorySlug).then((category) => {
          delete params['categorySlug']
          params['category'] = category.id
          _deferred.resolve()
        })
      } else {
        _deferred.resolve()
      }

      return _deferred.promise
    }

    function _setSearchQueryParams(newQueryParams) {
      _resolveCategoryId(newQueryParams).then(() => {
        angular.forEach(Object.keys(_queryParams), (fieldName) => {
          if (newQueryParams.hasOwnProperty(fieldName)) {
            _queryParams[fieldName] = newQueryParams[fieldName]
          }
        })
        if (angular.isDefined(_queryParams.areDirty) && _queryParams.areDirty) {
          _queryParams.areDirty = false
          _notifyOnQueryParams(_queryParams)
          if (_queryParams.q || _queryParams.serviceName || _queryParams.profileName ||
              _queryParams.tagId || _queryParams.category) {
            _search(_queryParams).then((response) => {
              _searchResults = response
              _notifyOnSearchResults(response)
            })
          }
        }
      })
    }

    function _getAvailableOptions() {
      const options = {
        language: _languageOptions,
        sortBy: _sortingOptions,
        category: [{name: 'all', value: null}]
      }
      return categoryService.listTopLevelCategories().then((categories) => {
        options.category = options.category.concat(categories.map((category) => {
          return {
            name: category.slug,
            value: category.id
          }
        }))
        return options
      })
    }

    return {
      search: _search,
      suggest: _suggest,
      setSearchQueryParams: _setSearchQueryParams,
      onSearchResults: _subscribeForSearchResults,
      onQueryParamsChange: _subscribeForQueryParams,
      getAvailableOptions: _getAvailableOptions
    }
  }


  angular.module('profitelo.services.search', [
    'profitelo.swaggerResources',
    'profitelo.services.categories'
  ]).service('searchService', searchService)
