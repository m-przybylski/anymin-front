import * as angular from 'angular'
import {Category} from 'profitelo-api-ng/model/models'
import {CategoryApi} from 'profitelo-api-ng/api/api'

export class CategoryService {

  private fetched: boolean
  private categoryList: Array<Category> = []
  private categoryMap: {[key: string]: Category} = {}
  private topLevelCategories: Array<Category> = []
  private categorySlugs: {[key: string]: string} = {}

  /* @ngInject */
  constructor(private $q: ng.IQService, private CategoryApi: CategoryApi) {
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
      this.CategoryApi.listCategoriesRoute().then((response) => {
        this.fetched = true
        this.categoryList = response.map(category => {
          category.id = String(category.id)
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
