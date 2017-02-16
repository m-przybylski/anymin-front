namespace profitelo.components.search.searchFilters {

  import IFilterService = profitelo.services.filter.IFilterService
  import Tag = profitelo.models.Tag
  import ISearchService = profitelo.services.search.ISearchService

  export interface ISearchFiltersComponentBindings {
    searchResults: Array<Object>
    setSearchParams: Function
  }

  interface ISearchFilters {
    sortBy?: Object
    language?: Object
    category?: Object
    onlyAvailable?: boolean
    minPrice?: number
    maxPrice?: number
    profileType?: Object
    tags?: Array<Tag>
    offset?: number
  }

  export class SearchFiltersComponentController implements ng.IController, ISearchFiltersComponentBindings {

    public searchFilters: ISearchFilters = {
      onlyAvailable: false,
      tags: []
    }
    public languagesList: Array<Object>
    public sortList: Array<Object>
    public categoryList: Array<Object>
    public showMobileFilters: boolean
    public profileTypeList: Array<Object>
    public searchResults: Array<Object>
    public setSearchParams: Function

    $onInit = () => {

    }

    $onChanges = (onChangesObject: any) => {
      if (onChangesObject.searchResults.currentValue !== onChangesObject.searchResults.previousValue
        && angular.isDefined(this.searchFilters)) {
        this.searchFilters.tags = onChangesObject.searchResults.currentValue.relatedTags
      }
    }
    /* @ngInject */
    constructor(private $filter: IFilterService, private $window: ng.IWindowService,
                searchService: ISearchService, private lodash: _.LoDashStatic,
                private $timeout: ng.ITimeoutService, private $scope: ng.IScope) {

      searchService.getAvailableOptions().then((options) => {
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
            name: this.$filter('translate')(this.$filter('normalizeTranslationKey')(('SEARCH.PROFILE_TYPE.' + type.name))),
            value: type.value
          }
        })
      })

      searchService.onQueryParamsChange(this.$scope, (params) => {
        this.$timeout(() => {
          this.searchFilters.sortBy = this.lodash.find(
            this.sortList, (sort: {value: string, name: string}) => sort.value === params.sortBy)
          this.searchFilters.language = this.lodash.find(
            this.languagesList, (language: {value: string, name: string}) => language.value === params.language)
          this.searchFilters.category = this.lodash.find(
            this.categoryList, (category: {value: string, name: string}) => category.value === params.category)
          this.searchFilters.profileType = this.lodash.find(
            this.profileTypeList, (profileType: {value: string, name: string}) => profileType.value === params.profileType)

        })
        this.searchFilters.onlyAvailable = params.onlyAvailable
        this.searchFilters.minPrice = params.minPrice
        this.searchFilters.maxPrice = (params.maxPrice) ? this.maxPriceValue(params.maxPrice) : undefined
      })

    }

    public handleMobileFiltersDisplay = () => {
      const windowSize = this.$window.innerWidth
      return windowSize < 768 && !this.showMobileFilters
    }

    public showFilters = () => {
      this.showMobileFilters = !this.showMobileFilters
    }

    public showMobileFilterButton = () => {
      const windowSize = this.$window.innerWidth
      return windowSize < 768
    }

    public onActivityStatusChange = (searchFilters: any) => {
      const searchQueryParams: ISearchFilters = {}
      searchQueryParams.onlyAvailable = searchFilters
      searchQueryParams.offset = 0
      this.setSearchQueryParamsDebounce(searchQueryParams)
    }

    public onPriceRangeBarUpdate = (minPrice: number, maxPrice: number, _pointerType: any) => {
      const searchQueryParams: ISearchFilters = {}
      searchQueryParams.maxPrice = maxPrice
      searchQueryParams.minPrice = minPrice
      searchQueryParams.offset = 0
      this.setSearchQueryParamsDebounce(searchQueryParams)
    }

    public updateSortTypeParam = (item: any) => {
      const searchQueryParams: ISearchFilters = {}
      if (angular.isDefined(item)) {
        searchQueryParams.sortBy = item.value
      }
      searchQueryParams.offset = 0
      this.setSearchQueryParamsDebounce(searchQueryParams)
    }

    public updateLanguageTypeParam = (item: any) => {
      const searchQueryParams: ISearchFilters = {}
      if (angular.isDefined(item)) {
        searchQueryParams.language = item.value
      }
      searchQueryParams.offset = 0
      this.setSearchQueryParamsDebounce(searchQueryParams)
    }

    public updateTypeListTypeParam = (item: any) => {
      const searchQueryParams: ISearchFilters = {}
      if (angular.isDefined(item)) {
        searchQueryParams.profileType = item.value
      }
      searchQueryParams.offset = 0
      this.setSearchQueryParamsDebounce(searchQueryParams)
    }

    public updateCategoryTypeParam = (item: any) => {
      const searchQueryParams: ISearchFilters = {}
      if (angular.isDefined(item)) {
        searchQueryParams.category = item.value
      }
      searchQueryParams.offset = 0
      this.setSearchQueryParamsDebounce(searchQueryParams)
    }

    private maxPriceValue = (maxPrice: number) => {
      if (angular.isUndefined(maxPrice) || maxPrice === null) {
        return 100
      } else {
        return maxPrice
      }
    }

    private setSearchQueryParamsDebounce = (...args: Array<any>) =>
      this.lodash.debounce(this.setSearchParams, this.searchDebounceTimeout, {
        'leading': false,
        'trailing': true
      })(args)

    private readonly searchDebounceTimeout = 500

  }

  class SearchFiltersComponent implements ng.IComponentOptions {
    controller: ng.Injectable<ng.IControllerConstructor> = SearchFiltersComponentController
    templateUrl: string = 'components/search/search-filters/search-filers.tpl.html'
    bindings: {[boundProperty: string]: string} = {
      searchResults: '<',
      setSearchParams: '<'
    }
  }

  angular.module('profitelo.components.search.searchFilters', [
    'profitelo.directives.interface.pro-range-slider',
    'rzModule',
    'ngLodash',
    'pascalprecht.translate',
    'profitelo.directives.pro-tags-slider',
    'profitelo.directives.interface.pro-switcher',
    'profitelo.services.search',
    'profitelo.services.categories',
    'profitelo.filters.normalize-translation-key-filter'
  ])
  .component('searchFilters', new SearchFiltersComponent())
}
