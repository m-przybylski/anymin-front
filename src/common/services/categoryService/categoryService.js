function categoryService($q, CategoryApi) {

  let _fetched = false
  let _categoryList = []
  let _categoryMap = {}
  let _topLevelCategories = []
  let _categorySlugs = {}

  function _resolveCategories() {
    let _deferred = $q.defer()

    if (_fetched) {
      _deferred.resolve()
    } else {
      CategoryApi.listCategories().$promise.then(response => {
        _fetched = true
        _categoryList = response.map(category => { category.id = category.id.toString(); return category })
        angular.forEach(_categoryList, category => {
          _categoryMap[category.id] = category
          if (category.parentCategoryId === null) {
            _categorySlugs[category.id] = category.slug
            _topLevelCategories.push(category)
          }
        })
        angular.forEach(_categoryList, category => {
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
    return _resolveCategories().then(() => { return _categoryList })
  }

  function _listTopLevelCategories() {
    return _resolveCategories().then(() => { return _topLevelCategories })
  }

  function _getCategorySlugs() {
    return _resolveCategories().then(() => { return _categorySlugs })
  }

  function _getCategoryBySlug(slug) {
    return _resolveCategories().then(() => {
      let result = []
      angular.forEach(_categorySlugs, (categorySlug, categoryId) => {
        if (slug === categorySlug) {
          result = _categoryMap[categoryId]
        }
      })
      return result
    })
  }

  return {
    listCategories: _listCategories,
    listTopLevelCategories: _listTopLevelCategories,
    getCategorySlugs: _getCategorySlugs,
    getCategoryBySlug: _getCategoryBySlug
  }
}


angular.module('profitelo.services.categories', [
  'profitelo.swaggerResources'
]).service('categoryService', categoryService)
