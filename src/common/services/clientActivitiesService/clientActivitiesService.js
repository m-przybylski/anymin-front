(function() {
  function clientActivitiesService($q, $rootScope, ViewsApi, User) {

    let _queryParams = {},
        _activityTypeOptions = ['SERVICE_USAGE_EVENT', 'FINANCIAL_TRANSACTION'],
        _activityTypeSetByUser = false

    const _defineQueryProperties = (obj) => {
      return Object.defineProperties(obj, {
        areDirty: {
          enumerable: false,
          writable: true,
          value: undefined
        },

        _activityType: {
          enumerable: false,
          writable: true,
          value: undefined
        },
        activityType: {
          enumerable: true,
          get: function() {
            return this._activityType
          },
          set: function(v) {
            v = _activityTypeOptions.indexOf(v) !== -1 ? String(v) : undefined
            if (v !== this._activityType) {
              this.areDirty = true
              this._activityType = v
              if (!_activityTypeSetByUser && this._activityType !== _activityTypeOptions[0]) {
                _activityTypeSetByUser = false
              }
            }
            if (this._activityType === _activityTypeOptions[0] && !_activityTypeSetByUser) {
              _activityTypeSetByUser = true
            }
          }
        },

        _profileId: {
          enumerable: false,
          writable: true,
          value: undefined
        },
        profileId: {
          enumerable: true,
          get: function() {
            return this._profileId
          },
          set: function(v) {
            v = v ? String(v) : undefined
            if (v !== this._profileId) {
              this.areDirty = true
              this._profileId = v
              this._activityType = _activityTypeOptions[0]
              if (!this._profileId && !this._serviceId && !_activityTypeSetByUser) {
                this._activityType = undefined
              }
              if (this._activityType === _activityTypeOptions[1]) {
                this._activityType = _activityTypeOptions[0]
              }
            } else {
              if (this._activityType === _activityTypeOptions[1]) {
                this._profileId = undefined
              }
            }
          }
        },

        _serviceId: {
          enumerable: false,
          writable: true,
          value: undefined
        },
        serviceId: {
          enumerable: true,
          get: function() {
            return this._serviceId
          },
          set: function(v) {
            v = v ? String(v) : undefined
            if (v !== this._serviceId) {
              this.areDirty = true
              this._serviceId = v
              this._activityType = _activityTypeOptions[0]
              if (!this._serviceId  && !this._profileId && !_activityTypeSetByUser) {
                this._activityType = undefined
              }
              if (this._activityType === _activityTypeOptions[1]) {
                this._serviceId = undefined
              }
              if (this._activityType === _activityTypeOptions[1]) {
                this._activityType = _activityTypeOptions[0]
              }

            } else {
              if (this._activityType === _activityTypeOptions[1]) {
                this._serviceId = undefined
              }
            }
          }
        },

        _dateFrom: {
          enumerable: false,
          writable: true,
          value: undefined
        },
        dateFrom: {
          enumerable: true,
          get: function() {
            return this._dateFrom
          },
          set: function(v) {
            if (v !== this._dateFrom) {
              this.areDirty = true
              this._dateFrom = v
            }
          }
        },

        _dateTo: {
          enumerable: false,
          writable: true,
          value: undefined
        },
        dateTo: {
          enumerable: true,
          get: function() {
            return this._dateTo
          },
          set: function(v) {
            if (v !== this._dateTo) {
              this.areDirty = true
              this._dateTo = v
            }
          }
        },

        _limit: {
          enumerable: false,
          writable: true,
          value: undefined
        },
        limit: {
          enumerable: true,
          get: function() {
            return this._limit
          },
          set: function(v) {
            v = v ? Number(v) : undefined
            if (v !== this._limit) {
              this.areDirty = true
              this._limit = v
            }
          }
        },

        _offset: {
          enumerable: false,
          writable: true,
          value: undefined
        },
        offset: {
          enumerable: true,
          get: function() {
            return this._offset
          },
          set: function(v) {
            v = v ? Number(v) : undefined
            if (v !== this._offset) {
              this.areDirty = true
              this._offset = v
            }
          }
        }

      })
    }

    _defineQueryProperties(_queryParams)

    const _queryLimit = 10

    const activitiesResultsEvent = 'activities-results'
    const queryParamsEvent = 'activities-query-params'

    function _notifyOnActivitiesResults(err, results, prevResults) {
      $rootScope.$emit(activitiesResultsEvent, err, results, prevResults)
    }

    function _notifyOnQueryParams(queryParams) {
      $rootScope.$emit(queryParamsEvent, queryParams)
    }

    function _subscribeForActivitiesResults(scope, callback) {
      scope.$on(
        '$destroy',
        $rootScope.$on(activitiesResultsEvent, (_, err, results, prevResults) => { return callback(err, results, prevResults) })
      )
    }

    function _subscribeForQueryParams(scope, callback) {
      scope.$on(
        '$destroy',
        $rootScope.$on(queryParamsEvent, (_, results) => { return callback(results) })
      )
      _notifyOnQueryParams(_queryParams)
    }

    const _getMoreResults = () => {
      _queryParams['offset'] += _queryLimit
      _queryParams['limit'] += _queryLimit
      _searchClientActivities(_queryParams).then(_handleClientActivitiesResponse, _handleClientActivitiesResponseError)
    }

    const _setClientActivitiesParam = (filterObject) => {
      if (filterObject && typeof filterObject === 'object') {

        angular.forEach(Object.keys(_queryParams), (fieldName) => {
          if (filterObject.hasOwnProperty(fieldName)) {
            _queryParams[fieldName] = filterObject[fieldName]
          } else {
            _queryParams[fieldName] = void 0
          }
        })

        _queryParams['offset'] = 0
        _queryParams['limit'] = _queryLimit
        _searchClientActivities(_queryParams).then((response) => {
          _notifyOnQueryParams(_queryParams)
          _notifyOnActivitiesResults(null, response, null)
        }, (error) =>
          $q.reject(error))
      } else {
        return $q.reject({
          errorMessage: 'Expect parameter to exist and to be an object'
        })
      }
    }

    const _handleClientActivitiesResponse = (response) => {
      return {
        activities: response.activities,
        activityTypes: response.activityTypes,
        balance: response.balance,
        expertServiceTuples: response.expertServiceTuples
      }
    }

    const _handleClientActivitiesResponseError = (error) =>
      $q.reject(error)


    const _searchClientActivities = (queryParam) =>
      ViewsApi.getDashboardClientActivities(queryParam).$promise


    const _resolve = () => {
      _queryParams['offset'] = '0'
      _queryParams['limit'] = _queryLimit
      return _searchClientActivities(_queryParams).then(_handleClientActivitiesResponse, _handleClientActivitiesResponseError)
    }

    return {
      resolve: _resolve,
      setClientActivitiesParam: _setClientActivitiesParam,
      getMoreResults: _getMoreResults,
      onQueryParamsChange: _subscribeForQueryParams,
      onActivitiesResults: _subscribeForActivitiesResults
    }
  }

  angular.module('profitelo.services.client-activities-service', [
    'profitelo.swaggerResources',
    'c7s.ng.userAuth'
  ])
    .service('clientActivitiesService', clientActivitiesService)


}())
