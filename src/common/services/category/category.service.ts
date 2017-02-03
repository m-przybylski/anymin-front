import Category = profitelo.models.Category

namespace profitelo.services.categoryService {

  export interface ICategoryService {
    listCategories(): ng.IPromise<Array<Category>>
    listTopLevelCategories(): ng.IPromise<Array<Category>>
    getCategorySlugs(): ng.IPromise<{[id: string]: string}>
    getCategoryBySlug(slug: string): ng.IPromise<Category>
  }

  class CategoryService implements ICategoryService {

    private fetched: boolean
    private categoryList: Array<Category> = []
    private categoryMap = {}
    private topLevelCategories: Array<Category> = []
    private categorySlugs = {}

    constructor(private $q: ng.IQService, private CategoryApi) {
      this.fetched = false
      this.categoryList = []
      this.categoryMap = {}
      this.topLevelCategories = []
      this.categorySlugs = {}
    }

    public listCategories = (): ng.IPromise<Array<Category>> => {
      return this.resolveCategories().then(() => this.categoryList)
    }

    public listTopLevelCategories = (): ng.IPromise<Array<Category>> => {
      return this.resolveCategories().then(() => this.topLevelCategories)
    }

    public getCategorySlugs = (): ng.IPromise<{[id: string]: string}> => {
      return this.resolveCategories().then(() => this.categorySlugs)
    }

    public getCategoryBySlug = (slug: string): ng.IPromise<Category | null> => {
      return this.resolveCategories().then(() => {
        let result: Category | null = null
        angular.forEach(this.categorySlugs, (categorySlug, categoryId) => {
          if (slug === categorySlug) {
            result = this.categoryMap[categoryId]
          }
        })
        return result
      })
    }

    private resolveCategories = () => {
      let _deferred = this.$q.defer()

      if (this.fetched) {
        _deferred.resolve()
      } else {
        this.CategoryApi.listCategories().$promise.then(response => {
          this.fetched = true
          this.categoryList = response.map(category => {
            category.id = category.id.toString();
            return category
          })
          angular.forEach(this.categoryList, category => {
            this.categoryMap[category.id] = category
            if (category.parentCategoryId === null) {
              this.categorySlugs[category.id] = category.slug
              this.topLevelCategories.push(category)
            }
          })
          angular.forEach(this.categoryList, category => {
            if (typeof category.parentCategoryId !== 'undefined' && category.parentCategoryId !== null) {
              this.categorySlugs[category.id] = this.categorySlugs[category.parentCategoryId] + '.' + category.slug
            }
          })
          _deferred.resolve()
        })
      }

      return _deferred.promise
    }
  }

  angular.module('profitelo.services.categories', [
    'profitelo.swaggerResources'
  ]).service('categoryService', CategoryService)
}
