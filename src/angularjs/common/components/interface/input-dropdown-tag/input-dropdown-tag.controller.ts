// tslint:disable:curly
import * as angular from 'angular';
import { InputDropdownTagComponentBindings } from './input-dropdown-tag';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { keyboardCodes } from '../../../classes/keyboard';

export interface IDropdownItem {
  name: string;
  value: string;
}

export interface IDropdownInputDictionary {
  [key: string]: string;
}

// tslint:disable:member-ordering
export class InputDropdownTagComponentController implements InputDropdownTagComponentBindings {
  public isOpen = false;
  public isActive = false;
  public label: string;
  public placeholder: string;
  public dictionary: IDropdownInputDictionary;
  public dropdownList: IDropdownItem[] = [];
  public hintLabel = '';
  public selectedItems: IDropdownItem[] = [];
  public selectedItemsValue: string[] = [];
  public filteredItems: IDropdownItem[] = [];
  public selectedItemNumber = 0;
  public dropdownScroll: JQuery;

  public filterInputText = '';
  public isFocus = false;
  public isDirty = false;

  private dropdownSelectedItem: JQuery;
  private dropdown: JQuery = this.$element.find('.dropdown-list');
  private static readonly dividerOnHalf = 2;

  public $onInit = (): void => {
    for (const key in this.dictionary) {
      if (this.dictionary.hasOwnProperty(key)) {
        this.dropdownList.push({
          name: this.dictionary[key],
          value: key
        });
      }
    }

    this.selectedItemsValue.forEach((selectItemValue) => {
      _.remove(this.dropdownList, (object) => object.value === selectItemValue);
      this.selectedItems.push({
        name: this.dictionary[selectItemValue],
        value: selectItemValue
      });
    });
  }

  public static $inject = ['$document', '$scope', '$element', '$filter'];

    constructor(private $document: ng.IDocumentService, private  $scope: ng.IScope,
              private $element: ng.IRootElementService, private $filter: ng.IFilterService) {

    this.dropdownScroll = this.$element.find('.dropdown-content');

    this.$document.bind('click', (event) => {
      const ifTargetClicked = this.$element.find(event.target).length > 0;
      if (!ifTargetClicked) {
        this.isOpen = false;
      }
      $scope.$digest();
    });

    this.$scope.$watch(() => this.filterInputText, () => {
      if (this.filterInputText.length > 0) {
        this.isOpen = true;
      } else {
        this.isOpen = false;
      }
      this.filterItems();
      this.dropdownScroll.scrollTop(0);
    });

    this.dropdownScroll.perfectScrollbar();

    // tslint:disable-next-line:cyclomatic-complexity
    $element.bind('keydown keypress', (event) => {
      const keyCode = event.which || event.keyCode;

      switch (keyCode) {
        case keyboardCodes.arrowDown:
          event.preventDefault();
          this.filterItems();

          if (this.filteredItems && this.selectedItemNumber < this.filteredItems.length && this.isOpen)
            this.selectedItemNumber++;

          if (this.isOpen) {
            this.onArrowItemSelect();
            this.dropdownScroll.scrollTop(this.dropdownSelectedItem[0]
                .offsetTop - (this.dropdown.height() / InputDropdownTagComponentController.dividerOnHalf -
                  this.dropdownSelectedItem[0].clientHeight));
          }

          break;

        case keyboardCodes.arrowUp:
          event.preventDefault();
          this.filterItems();

          if (this.selectedItemNumber > 1 && this.isOpen)
            this.selectedItemNumber--;

          if (this.isOpen) {
            this.onArrowItemSelect();
            this.dropdownScroll.scrollTop(this.dropdownSelectedItem[0]
                .offsetTop - (this.dropdown.height() / InputDropdownTagComponentController.dividerOnHalf -
                  this.dropdownSelectedItem[0].clientHeight));
          }

          break;

        default:
      }
    });
  }

  public mainListExist = (): boolean =>
  angular.isDefined(this.dropdownList) && this.dropdownList.length > 0

  public inputClick = (): void => {
    this.isOpen = false;
    this.dropdownScroll.scrollTop(0);
  }

  public deleteSelectedItem = (item: IDropdownItem, index: number): void => {
    this.selectedItems.splice(index, 1);
    this.selectedItemsValue.splice(index, 1);
    this.dropdownList.push(item);
    this.filterItems();
    this.isDirty = true;
  }

  public onMainItemSelect = (item: IDropdownItem, index: number): void => {
    this.selectedItems.push(item);
    this.isOpen = false;
    this.selectedItemsValue.push(item.value);
    this.dropdownList.splice(index, 1);
    this.isFocus = false;
    this.clearInput();
  }

  public onFocus = (): void => {
    this.isFocus = true;
    this.isDirty = true;
  }
  public onBlur = (): void => {
    this.isFocus = false;
    this.isDirty = true;
  }

  public onArrowItemSelect = (): IDropdownItem => {
    this.dropdown.find('li').removeClass('is-focused');
    this.dropdownSelectedItem = this.dropdown.find(`li:nth-child(${this.selectedItemNumber})`);
    this.dropdownSelectedItem.addClass('is-focused');
    this.isFocus = false;
    return this.filteredItems[this.selectedItemNumber - 1];
  }

  public onClickEnter = (): void => {
    if (this.filteredItems && this.filteredItems.length > 0 && this.selectedItemNumber !== 0) {
      this.selectedItems.push(this.onArrowItemSelect());
      this.selectedItemsValue.push(this.onArrowItemSelect().value);

      _.remove(this.dropdownList, (object) => object === this.onArrowItemSelect());

      this.filterItems();
      this.onArrowItemSelect();
      this.isOpen = false;
      this.clearInput();
    }

    this.selectedItemNumber = 0;
  }

  private clearInput = (): void => {
    this.filterInputText = '';
  }

  private filterItems = (): void => {
    this.filteredItems = this.$filter('filter')(this.dropdownList, this.filterInputText);

    if (this.filteredItems && this.selectedItemNumber > this.filteredItems.length)
      this.selectedItemNumber = this.filteredItems.length;
  }
}
