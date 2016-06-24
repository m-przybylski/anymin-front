
  function searchService($q, SearchApi) {

    function _suggest(q) {
      let _deferred = $q.defer()

      SearchApi.searchSuggestions({
        q: q
      }).$promise.then((response) => {
        _deferred.resolve(response)
      })

      return _deferred.promise
    }

    return {
      suggest: _suggest
    }
  }


  angular.module('profitelo.services.search', [
    'profitelo.swaggerResources'
  ]).service('searchService', searchService)
