(function() {
  /* @ngInject */
  function proSearchDropdownController($q, $scope, $state, $element, searchService, categoryService) {

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

    const _deserializeSuggestions = (rawData) => {
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

    const _countSuggestions = (suggestions) => {
      const servicesCount = angular.isDefined(suggestions.services.count) ? suggestions.services.count : 0
      const expertsCount = angular.isDefined(suggestions.experts.count) ? suggestions.experts.count : 0
      const organizationsCount = angular.isDefined(suggestions.organizations.count) ? suggestions.organizations.count : 0
      return suggestions.terms.length + suggestions.tags.length + servicesCount + expertsCount + organizationsCount
    }

    const _updateSuggestions = (searchWord) => {
      if (angular.isDefined(searchWord) && searchWord !== null && searchWord.toString().length >= 3) {
        this.loadingSuggestion = true
        $q.all([
          searchService.suggest(this.ngModel),
          categoryService.getCategorySlugs()
        ]).then((data) => {
          this.suggestions = _deserializeSuggestions(data[0])
          this.suggestionsLength = _countSuggestions(this.suggestions)
          this.categorySlugs = data[1]
          this.lastSearchWord = searchWord
          this.loadingSuggestion = false
        }, () => {
          this.loadingSuggestion = false
        })
      }
    }

    const _searchAction = () => {
      if (this.ngModel && this.ngModel.length >= 3 && this.isFocused) {
        this.isCollapsed = false
        _updateSuggestions(this.ngModel)

      } else {
        this.isCollapsed = true
      }
    }

    const _focusOut = () => {
      this.isFocused = false
      this.isCollapsed = true
    }

    const _searchActionDebounce = _.debounce(_searchAction, 200, {
      'leading': false,
      'trailing': true
    })

    const _focus = () => {
      this.isFocused = true
      this.isCollapsed = false

      if (!this.loadingSuggestion && angular.isDefined(this.ngModel) && this.ngModel !== this.lastSearchWord) {
        _updateSuggestions(this.ngModel)
      }
    }

    const _handleArrowsOnSuggestions = (list, elementObject) => {
      const currentElement = list[elementObject.currentPosition]

      if (elementObject.lastElement >= 0) {
        angular.element(list[elementObject.lastElement]).removeClass('active')
      }

      angular.element(currentElement).addClass('active')
      const dropdownOffset = 300
      $element.find('.dropdown-container').scrollTop(currentElement.offsetTop - angular.element(('.dropdown-container')).height() + dropdownOffset)
      selectedElement.lastElement = elementObject.currentPosition
    }

    const _clearSelectedElement = (list) => {
      $(list[selectedElement.currentPosition]).removeClass('active')
      $element.find('.dropdown-container').scrollTop(0)
      selectedElement.currentPosition = -1
      selectedElement.lastElement = -1
    }

    this.search = () => {
      _focusOut()
      if (angular.isDefined(this.ngModel) && this.ngModel.length > 0) {
        if (selectedElement.currentPosition > -1) {
          $element.find('.dropdown-container .active').triggerHandler('click')
        } else {
          $state.go('app.search-result', {q: this.ngModel, tagId: this.currentTagId})
        }
      }
    }

    this.onFocus = () => {
      _focus()
    }

    this.onFocusOut = () => {
      if (!this.isMouseOverDropdown) {
        _focusOut()
      }
    }

    this.onDropdownMouseLeave = () => {
      this.isMouseOverDropdown = false
    }

    this.onDropdownMouseEnter = () => {
      this.isMouseOverDropdown = true
    }

    this.clearModel = () => {
      this.ngModel = null
      this.currentTagId = null
    }

    this.showResultsCounter = () => {
      return !!this.searchCount && this.searchCount > 0 && this.isCollapsed
    }

    const _setPrimarySuggestion = (search) => {
      if (angular.isDefined(search) && search && !this.isCollapsed && search.length > 2 &&
        !!this.suggestions.tags && this.suggestions.tags.length > 0) {

        this.suggestions.tags.map((tag) => tag.name.toLowerCase()).reverse().forEach((name) => {
          if (name.includes(this.ngModel.toLowerCase())) {
            this.primarySuggestion = name
          }
        })
      } else {
        this.currentTagId = null
        this.primarySuggestion = null
      }
    }

    const _onSearchModelChange = (search) => {
      _setPrimarySuggestion(search)
      _searchActionDebounce(search)
      _clearSelectedElement($element.find('.dropdown-container a'))
    }

    $scope.$watch(() => {
      return this.ngModel
    }, (newValue) => {
      _onSearchModelChange(newValue)
    })

    /* istanbul ignore next */
    const _onUpDownKeysPress = (callback) => {
      listOfSuggestions =  $element.find('.dropdown-container a')
      if (!!this.ngModel && this.ngModel.length > 2 && angular.isFunction(callback)) {
        callback()
      }
    }

    const keyCodes = {
      arrowRight: 39,
      arrowDown: 40,
      arrowUp: 38,
      backspace: 8
    }

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
          _onUpDownKeysPress( () => {
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

        default:
          break
      }
    })

    $element.find('.dropdown-container').perfectScrollbar()

    Object.defineProperty(this, 'open', {
      get: function() {
        return this.open
      },
      set: function(flag) {
        if (angular.isDefined(flag) && flag) {
          _focus()
        } else {
          _focusOut()
        }
      }
    })

    return this
  }

  const proSearchDropdown = {
    transclude: true,
    templateUrl: 'components/pro-search-dropdown/pro-search-dropdown.tpl.html',
    controller:  proSearchDropdownController,
    controllerAs: 'vm',
    bindings: {
      ngModel: '=?',
      searchCount: '=?',
      open: '<'
    }
  }

  angular.module('profitelo.components.pro-search-dropdown', [
    'commonConfig',
    'profitelo.services.search',
    'profitelo.services.categories',
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

}())
