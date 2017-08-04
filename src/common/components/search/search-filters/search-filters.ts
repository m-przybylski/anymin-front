import * as angular from 'angular'
import * as _ from 'lodash'
import {Tag} from 'profitelo-api-ng/model/models'
import 'angularjs-slider'
import {IFilterService} from '../../../services/filter/filter.service'
import {SearchService} from '../../../services/search/search.service'
import filtersModule from '../../../filters/filters'
import searchModule from '../../../services/search/search'
import 'common/directives/interface/pro-range-slider/pro-range-slider'
import 'common/directives/pro-tags-slider/pro-tags-slider'
import 'common/directives/interface/pro-switcher/pro-switcher'

export interface ISearchFiltersComponentBindings {
  searchResults: {}[]
  setSearchParams: any
}

interface ISearchFilters {
  sortBy?: {}
  language?: {}
  category?: {}
  onlyAvailable?: boolean
  minPrice?: number
  maxPrice?: number
  profileType?: {}
  tags?: Tag[]
  offset?: number
}

export class SearchFiltersComponentController implements ng.IController, ISearchFiltersComponentBindings {

  public searchFilters: ISearchFilters = {
    onlyAvailable: false,
    tags: []
  }
  public languagesList: {}[]
  public sortList: {}[]
  public categoryList: {}[]
  public showMobileFilters: boolean
  public profileTypeList: {}[]
  public searchResults: {}[]
  public setSearchParams: any

  private static readonly maxMobileWindowWidth: number = 768
  private static readonly defaultMaxPrice: number = 20

  $onInit = (): void => {

  }

  $onChanges = (onChangesObject: any): void => {
    if (onChangesObject.searchResults.currentValue !== onChangesObject.searchResults.previousValue
      && angular.isDefined(this.searchFilters)) {
      this.searchFilters.tags = onChangesObject.searchResults.currentValue.relatedTags
    }
  }
  /* @ngInject */
  constructor(private $filter: IFilterService, private $window: ng.IWindowService,
              searchService: SearchService,
              private $timeout: ng.ITimeoutService, private $scope: ng.IScope) {

    const options = searchService.getAvailableOptions()
      this.languagesList = options.language.map((lng) =>
        ({
          name: (this.$filter('translate')(this.$filter('normalizeTranslationKey')(('SEARCH.LANGUAGE.' + lng.name)))),
          value: lng.value
        }))
      this.sortList = options.sortBy.map((val) => {
        return {
          name: this.$filter('translate')(this.$filter('normalizeTranslationKey')(('SEARCH.SORT_BY.' + val))),
          value: val
        }
      })
      this.categoryList = options.category.map((cat) => {
        return {
          name: this.$filter('translate')(this.$filter('normalizeTranslationKey')(('CATEGORY.' + cat.name))),
          value: cat.value
        }
      })
      this.profileTypeList = options.profileType.map((type) => {
        return {
          name: this.$filter('translate')(this.$filter('normalizeTranslationKey')
                (('SEARCH.PROFILE_TYPE.' + type.name))),
          value: type.value
        }
      })

    searchService.onQueryParamsChange(this.$scope, (params) => {
      this.$timeout(() => {
        this.searchFilters.sortBy = _.find(
          this.sortList, (sort: {value: string, name: string}) => sort.value === params.sortBy)
        this.searchFilters.language = _.find(
          this.languagesList, (language: {value: string, name: string}) => language.value === params.language)
        this.searchFilters.category = _.find(
          this.categoryList, (category: {value: string, name: string}) => category.value === params.category)
        this.searchFilters.profileType = _.find(
          this.profileTypeList,
          (profileType: {value: string, name: string}) => profileType.value === params.profileType)

      })
      this.searchFilters.onlyAvailable = params.onlyAvailable
      this.searchFilters.minPrice = params.minPrice
      this.searchFilters.maxPrice = (params.maxPrice) ? this.maxPriceValue(params.maxPrice) : undefined
    })

  }

  public handleMobileFiltersDisplay = (): boolean => {
    const windowSize = this.$window.innerWidth
    return windowSize <= SearchFiltersComponentController.maxMobileWindowWidth && !this.showMobileFilters
  }

  public showFilters = (): void => {
    this.showMobileFilters = !this.showMobileFilters
  }

  public showMobileFilterButton = (): boolean => {
    const windowSize = this.$window.innerWidth
    return windowSize <= SearchFiltersComponentController.maxMobileWindowWidth
  }

  public onActivityStatusChange = (searchFilters: any): void => {
    const searchQueryParams: ISearchFilters = {}
    searchQueryParams.onlyAvailable = searchFilters
    searchQueryParams.offset = 0
    this.setSearchQueryParamsDebounce(searchQueryParams)
  }

  public onPriceRangeBarUpdate = (minPrice: number, maxPrice: number, _pointerType: any): void => {
    const searchQueryParams: ISearchFilters = {}
    searchQueryParams.maxPrice = maxPrice
    searchQueryParams.minPrice = minPrice
    searchQueryParams.offset = 0
    this.setSearchQueryParamsDebounce(searchQueryParams)
  }

  public updateSortTypeParam = (item: any): void => {
    const searchQueryParams: ISearchFilters = {}
    if (angular.isDefined(item)) {
      searchQueryParams.sortBy = item.value
    }
    searchQueryParams.offset = 0
    this.setSearchQueryParamsDebounce(searchQueryParams)
  }

  public updateLanguageTypeParam = (item: any): void => {
    const searchQueryParams: ISearchFilters = {}
    if (angular.isDefined(item)) {
      searchQueryParams.language = item.value
    }
    searchQueryParams.offset = 0
    this.setSearchQueryParamsDebounce(searchQueryParams)
  }

  public updateTypeListTypeParam = (item: any): void => {
    const searchQueryParams: ISearchFilters = {}
    if (angular.isDefined(item)) {
      searchQueryParams.profileType = item.value
    }
    searchQueryParams.offset = 0
    this.setSearchQueryParamsDebounce(searchQueryParams)
  }

  public updateCategoryTypeParam = (item: any): void => {
    const searchQueryParams: ISearchFilters = {}
    if (angular.isDefined(item)) {
      searchQueryParams.category = item.value
    }
    searchQueryParams.offset = 0
    this.setSearchQueryParamsDebounce(searchQueryParams)
  }

  private maxPriceValue = (maxPrice: number): number => {
    if (angular.isUndefined(maxPrice) || maxPrice === null) {
      return SearchFiltersComponentController.defaultMaxPrice
    } else {
      return maxPrice
    }
  }

  private setSearchQueryParamsDebounce = (...args: Array<any>): void =>
    _.debounce(this.setSearchParams, this.searchDebounceTimeout, {
      'leading': false,
      'trailing': true
    })(args)

  private readonly searchDebounceTimeout = 500

}

class SearchFiltersComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = SearchFiltersComponentController
  template = require('./search-filers.pug')()
  bindings: {[boundProperty: string]: string} = {
    searchResults: '<',
    setSearchParams: '<'
  }
}

angular.module('profitelo.components.search.searchFilters', [
  'rzModule',
  'pascalprecht.translate',
  'profitelo.directives.interface.pro-range-slider',
  'profitelo.directives.pro-tags-slider',
  'profitelo.directives.interface.pro-switcher',
  searchModule,
  filtersModule
])
  .component('searchFilters', new SearchFiltersComponent())
