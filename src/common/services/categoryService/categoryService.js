function categoryService($q, CategoryApi) {

  let _fetched = false
  let _categories = []
  let _categorySlugs = {}

  function _resolveCategories() {
    let _deferred = $q.defer()

    if (_fetched) {
      _deferred.resolve()
    } else {
      CategoryApi.listCategories().$promise.then((response) => {
        _fetched = true
        _categories = response
        angular.forEach(_categories, (category) => {
          if (category.parentCategoryId === null) {
            _categorySlugs[category.id] = category.slug
          }
        })
        angular.forEach(_categories, (category) => {
          if (category.parentCategoryId !== null) {
            _categorySlugs[category.id] = _categorySlugs[category.parentCategoryId] + '.' + category.slug
          }
        })
        _deferred.resolve()
      })
    }

    return _deferred.promise
  }

  function _listCategories() {
    return _resolveCategories().then(() => { return _categories })
  }

  function _getCategorySlugs() {
    return _resolveCategories().then(() => { return _categorySlugs })
  }

  return {
    listCategories: _listCategories,
    getCategorySlugs: _getCategorySlugs
  }
}


angular.module('profitelo.services.categories', [
  'profitelo.swaggerResources'
]).service('categoryService', categoryService)
