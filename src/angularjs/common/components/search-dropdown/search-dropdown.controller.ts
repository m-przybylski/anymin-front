import { SearchService } from '../../services/search/search.service';
import { keyboardCodes } from '../../classes/keyboard';
import { StateService } from '@uirouter/angularjs';

// tslint:disable:member-ordering
export class SearchDropdownController {

  public suggestions: string[] = [];
  public searchValue?: string;

  private static readonly minimumValidInputValueLength = 3;
  private isFocus = false;
  private dropdown: JQuery;
  private dropdownSelectedItem: JQuery;
  private selectedItemIndex = 0;

  public static $inject = ['$state', 'searchService', '$element', '$document', '$scope', '$log'];

    constructor(private $state: StateService,
              private searchService: SearchService,
              private $element: ng.IRootElementService,
              private $document: ng.IDocumentService,
              private $scope: ng.IScope,
              private $log: ng.ILogService) {
  }

  public $onInit = (): void => {
    this.dropdown = this.$element.find('.suggestion-list');

    this.$document.bind('click', (event) => {
      const isTargetClicked = this.$element.find(event.target).length > 0;
      if (!isTargetClicked) {
        this.isFocus = false;
        this.resetDropdown();
      }
    });

    // tslint:disable-next-line:cyclomatic-complexity
    this.$element.bind('keydown keypress', (event) => {
      const keyCode = event.which || event.keyCode;
      switch (keyCode) {
        case keyboardCodes.arrowDown:
          if (this.isSuggestionsDropdown()) {
            this.onArrowDown();
          }
          break;

        case keyboardCodes.arrowUp:
          if (this.isSuggestionsDropdown()) {
            this.onArrowUp();
          }
          break;

        case keyboardCodes.escape:
          this.onEscape();
          break;

        default:
      }
    });

    this.dropdown.bind('mouseover', (event) => {
      this.resetDropdown();
      this.dropdown.find(event.target.parentElement).addClass('is-focused');
      this.dropdownSelectedItem = this.dropdown.find('.is-focused');
      this.selectedItemIndex = this.dropdown.find('li').index(this.dropdownSelectedItem) + 1;
    });
  }

  public $onDestroy = (): void => {
    this.$element.unbind('keydown keypress');
    this.$document.unbind('click');
    this.dropdown.unbind('mouseover');
  }

  public search = (): void => {
    if (this.searchValue &&  this.searchValue.length >= SearchDropdownController.minimumValidInputValueLength) {
      this.$state.go('app.search-result', {q: this.searchValue});
    }
  }

  public onEnter = (): void => {
    if (this.selectedItemIndex > 0)
      this.searchValue = this.suggestions[this.selectedItemIndex - 1];
    this.search();
  }

  public onChange = (): void => {
    this.resetDropdown();
    if (this.searchValue && this.searchValue.length >= SearchDropdownController.minimumValidInputValueLength) {
      // tslint:disable-next-line:no-non-null-assertion
      this.searchService.querySuggestions(this.searchValue).then((response) => this.suggestions = response!.suggestions,
        (error) => {this.$log.error(error); });
    }
  }

  public onItemSelect = (suggestion: string): void => {
    this.searchValue = suggestion;
    this.search();
  }

  public onFocus = (): void => {
    this.isFocus = true;
  }

  public isSuggestionsDropdown = (): boolean =>
    typeof this.searchValue !== 'undefined'
    && this.searchValue !== ''
    && this.searchValue.length >= SearchDropdownController.minimumValidInputValueLength
    && this.suggestions.length > 0
    && this.isFocus

  private markItemAsSelected = (): void => {
    this.dropdown.find('li').removeClass('is-focused');
    this.dropdownSelectedItem = this.dropdown.find(`li:nth-child(${this.selectedItemIndex})`);
    this.dropdownSelectedItem.addClass('is-focused');
  }

  private resetDropdown = (): void => {
    this.selectedItemIndex = 0;
    this.dropdown.find('li').removeClass('is-focused');
  }

  private onEscape = (): void => {
    this.$element.find('input').blur();
    this.isFocus = false;
    this.$scope.$apply();
    this.resetDropdown();
  }

  private onArrowDown = (): void => {
    if (this.selectedItemIndex < this.suggestions.length) {
      ++this.selectedItemIndex;
    } else {
      this.selectedItemIndex = 1;
    }
    this.markItemAsSelected();
  }

  private onArrowUp = (): void => {
    if (this.selectedItemIndex > 1) {
      --this.selectedItemIndex;
    } else {
      this.selectedItemIndex = this.suggestions.length;
    }
    this.markItemAsSelected();
  }

}
