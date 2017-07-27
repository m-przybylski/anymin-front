import * as angular from 'angular'
import * as _ from 'lodash'
import {Tag} from 'profitelo-api-ng/model/models'
import {SearchService} from '../../services/search/search.service'
import './term-suggestions/term-suggestions'
import './organization-suggestions/organization-suggestions'
import './tag-suggestions/tag-suggestions'
import './service-suggestions/service-suggestions'
import './expert-suggestions/expert-suggestions'

interface ISuggestions {
  services: any
  experts: any
  organizations: any
  terms: any[]
  tags: Tag[]
}

/* @ngInject */
function proSearchDropdownController($scope: ng.IScope, $state: ng.ui.IStateService,
                                     $element: ng.IRootElementService,
                                     searchService: SearchService): void {

  this.isCollapsed = true
  this.isFocused = false
  this.isMouseOverDropdown = false
  this.categorySlugs = {}
  this.currentTagId = null
  this.suggestions = {
    terms: [],
    tags: [],
    services: {},
    experts: {},
    organizations: {}
  }
  this.primarySuggestion = ''
  this.suggestionsLength = 0

  this.loadingSuggestion = false
  this.lastSearchWord = ''
  let listOfSuggestions = $element.find('.dropdown-container a')

  /* istanbul ignore next */
  const _onUpDownKeysPress = (callback: () => void): void => {
    listOfSuggestions = $element.find('.dropdown-container a')
    if (!!this.ngModel && this.ngModel.length > 2 && angular.isFunction(callback)) {
      callback()
    }
  }

  this.$onInit = (): void => {
    Object.defineProperty(this, 'open', {
      get: function (): void {
        return this.open
      },
      set: function (flag): void {
        if (angular.isDefined(flag) && flag) {
          _focus()
        } else {
          _focusOut()
        }
      }

    })
  }

  const keyCodes = {
    arrowRight: 39,
    arrowDown: 40,
    arrowUp: 38,
    backspace: 8,
    escape: 27
  }

  const _deserializeSuggestions = (rawData: any): ISuggestions => {
    const result = {
      terms: [],
      tags: [],
      services: {},
      experts: {},
      organizations: {}
    }
    if (angular.isUndefined(rawData)) {
      return result
    }
    if (angular.isDefined(rawData.terms)) {
      result.terms = rawData.terms
    }
    if (angular.isDefined(rawData.tags)) {
      result.tags = rawData.tags
    }
    if (angular.isDefined(rawData.services)) {
      result.services = rawData.services
    }
    if (angular.isDefined(rawData.experts)) {
      result.experts = rawData.experts
    }
    if (angular.isDefined(rawData.organizations)) {
      result.organizations = rawData.organizations
    }
    return result
  }

  const selectedElement = {
    currentPosition: -1,
    lastElement: -1
  }

  const _countSuggestions = (suggestions: ISuggestions): number => {
    const servicesCount = angular.isDefined(suggestions.services.count) ? suggestions.services.count : 0
    const expertsCount = angular.isDefined(suggestions.experts.count) ? suggestions.experts.count : 0
    const organizationsCount = angular.isDefined(suggestions.organizations.count) ? suggestions.organizations.count : 0
    return suggestions.terms.length + suggestions.tags.length + servicesCount + expertsCount + organizationsCount
  }

  const _updateSuggestions = (searchWord: string): void => {
    if (angular.isDefined(searchWord) && searchWord !== null && searchWord.toString().length >= 3) {
      this.loadingSuggestion = true
      searchService.suggest(this.ngModel).then((data) => {
        this.suggestions = _deserializeSuggestions(data)
        this.suggestionsLength = _countSuggestions(this.suggestions)
        this.categorySlugs = []
        this.lastSearchWord = searchWord
        this.loadingSuggestion = false
      }, () => {
        this.loadingSuggestion = false
      })
    }
  }

  const _searchAction = (): void => {
    if (this.ngModel && this.ngModel.length >= 3 && this.isFocused) {
      this.isCollapsed = false
      _updateSuggestions(this.ngModel)

    } else {
      this.isCollapsed = true
    }
  }

  const _focusOut = (): void => {
    this.isFocused = false
    this.isCollapsed = true

    if (angular.isDefined(this.maskSearch)) {
      this.maskSearch = true
    }
  }

  const _searchActionDebounce = _.debounce(_searchAction, 200, {
    'leading': false,
    'trailing': true
  })

  const _focus = (): void => {
    this.isFocused = true
    this.isCollapsed = false

    if (!this.loadingSuggestion && angular.isDefined(this.ngModel) && this.ngModel !== this.lastSearchWord) {
      _updateSuggestions(this.ngModel)
    }
  }

  const _handleArrowsOnSuggestions = (list: any, elementObject: any): void => {
    const currentElement = list[elementObject.currentPosition]

    if (elementObject.lastElement >= 0) {
      angular.element(list[elementObject.lastElement]).removeClass('active')
    }

    angular.element(currentElement).addClass('active')
    const dropdownOffset = 300
    $element.find('.dropdown-container')
      .scrollTop(currentElement.offsetTop - angular.element(('.dropdown-container')).height() + dropdownOffset)
    selectedElement.lastElement = elementObject.currentPosition
  }

  const _clearSelectedElement = (list: any): void => {
    $(list[selectedElement.currentPosition]).removeClass('active')
    $element.find('.dropdown-container').scrollTop(0)
    selectedElement.currentPosition = -1
    selectedElement.lastElement = -1
  }

  this.search = (): void => {
    _focusOut()
    if (angular.isDefined(this.ngModel) && this.ngModel !== null && this.ngModel.length > 0) {
      if (selectedElement.currentPosition > -1) {
        $element.find('.dropdown-container .active').triggerHandler('click')
      } else {
        $state.go('app.search-result', {q: this.ngModel, tagId: this.currentTagId})
      }
    }
  }

  this.onFocus = (): void => {
    _focus()
  }

  this.onFocusOut = (): void => {
    if (!this.isMouseOverDropdown) {
      _focusOut()
    }
  }

  this.onDropdownMouseLeave = (): void => {
    this.isMouseOverDropdown = false
  }

  this.onDropdownMouseEnter = (): void => {
    this.isMouseOverDropdown = true
  }

  this.clearModel = (): void => {
    this.ngModel = null
    this.currentTagId = null
  }

  this.showResultsCounter = (): boolean => {
    return !!this.searchCount && this.searchCount > 0 && this.isCollapsed
  }

  const _setPrimarySuggestion = (search: string): void => {
    this.primarySuggestion = null
    if (angular.isDefined(search) && search && !this.isCollapsed && search.length > 2 &&
      !!this.suggestions.tags && this.suggestions.tags.length > 0) {

      this.suggestions.tags.map((tag: Tag) => tag.name.toLowerCase()).reverse().forEach((name: string) => {
        if (name.includes(this.ngModel.toLowerCase())) {
          this.primarySuggestion = name
        }
      })
    } else {
      this.currentTagId = null
      this.primarySuggestion = null
    }
  }

  const _onSearchModelChange = (search: any): void => {
    _setPrimarySuggestion(search)
    _searchActionDebounce()
    _clearSelectedElement($element.find('.dropdown-container a'))
  }

  $scope.$watch(() => {
    return this.ngModel
  }, (newValue) => {
    _onSearchModelChange(newValue)
  })

  /* istanbul ignore next */
  $element.bind('keydown keypress', (event) => {
    const keyCode = event.which || event.keyCode
    switch (keyCode) {
      case keyCodes.arrowRight:
        if (this.primarySuggestion !== null) {
          this.ngModel = this.primarySuggestion
          this.currentTagId = this.suggestions.tags[0].id
          $scope.$digest()
        }
        break

      case keyCodes.backspace:
        this.currentTagId = null
        break

      case keyCodes.arrowDown:
        event.preventDefault()
        _onUpDownKeysPress(() => {
          if (selectedElement.currentPosition <= listOfSuggestions.length - 2) {
            ++selectedElement.currentPosition
            _handleArrowsOnSuggestions(listOfSuggestions, selectedElement)
          }
        })
        break

      case keyCodes.arrowUp:
        event.preventDefault()
        _onUpDownKeysPress(() => {
          if (selectedElement.currentPosition > 0) {
            --selectedElement.currentPosition
            _handleArrowsOnSuggestions(listOfSuggestions, selectedElement)
          } else {
            _clearSelectedElement(listOfSuggestions)
          }
        })
        break

      case keyCodes.escape:
        event.preventDefault()
        $element.find('.main-input').blur()
        _focusOut()
        $scope.$digest()
        break

      default:
        break
    }
  })

  $element.find('.dropdown-container').perfectScrollbar()

  return this
}

const proSearchDropdown = {
  transclude: true,
  template: require('./pro-search-dropdown.pug')(),
  controller: proSearchDropdownController,
  controllerAs: 'vm',
  bindings: {
    ngModel: '=?',
    searchCount: '=?',
    open: '<',
    maskSearch: '=?'
  }
}

angular.module('profitelo.components.pro-search-dropdown', [
  'commonConfig',
  'profitelo.services.search',
  'ui.router',
  'profitelo.components.interface.preloader',
  'profitelo.filters.normalize-translation-key-filter',
  'profitelo.components.pro-search-dropdown.term-suggestions',
  'profitelo.components.pro-search-dropdown.organization-suggestions',
  'profitelo.components.pro-search-dropdown.tag-suggestions',
  'profitelo.components.pro-search-dropdown.service-suggestions',
  'profitelo.components.pro-search-dropdown.expert-suggestions'
])
  .component('proSearchDropdown', proSearchDropdown)
