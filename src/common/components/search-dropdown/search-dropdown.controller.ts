import {SearchService} from '../../services/search/search.service'
import {keyboardCodes} from '../../classes/keyboard'
export class SearchDropdownController {

  public suggestions: string[] = []
  public searchValue?: string
  public isFocus: boolean = false
  public activeItem: string = ''

  private static readonly minimumInputLength: number = 2

  /* @ngInject */
  constructor(private $state: ng.ui.IStateService,
              private searchService: SearchService) {
  }

  public search = (): void => {
    if (this.searchValue &&  this.searchValue.length > SearchDropdownController.minimumInputLength) {
      this.$state.go('app.search-result', {q: this.searchValue})
    }
  }

  public onKeyPress = (event: KeyboardEvent): void => {
    switch (event.keyCode) {
      case keyboardCodes.arrowDown:
        event.preventDefault()
        break
      case keyboardCodes.arrowUp:
        event.preventDefault()
        break
    }
  }

  public showSuggestionsDropdown = (): boolean =>
    typeof this.searchValue !== 'undefined'
    && this.searchValue !== ''
    && this.searchValue.length > SearchDropdownController.minimumInputLength
    && this.suggestions.length > 0
    && this.isFocus

  public isSelected = (currentSuggestion: string): boolean => this.activeItem === currentSuggestion

  public onChange = (): void => {
    if (this.searchValue && this.searchValue.length > SearchDropdownController.minimumInputLength) {
      this.searchService.querySuggestions(this.searchValue).then((response) => this.suggestions = response.queries)
    }
  }

  public onFocus = (): void => {
    this.isFocus = true
  }

  public onBlur = (): void => {
    this.isFocus = false
  }
}
