import {
  IDropdownItem, IPrimaryDropdownListElement, IDropdownPrimaryComponentBindings,
  IFilterBy
} from './dropdown-primary';
import { keyboardCodes } from '../../../classes/keyboard';
import * as angular from 'angular';
// tslint:disable:member-ordering
// tslint:disable:strict-type-predicates
export class DropdownPrimaryComponentController implements ng.IController, IDropdownPrimaryComponentBindings {

  public isOpen = false;
  public isClosed = false;
  public isActive = false;
  public activeItem: IDropdownItem;
  public label: string;
  public inputPlaceholder: string;
  public name: string;
  public placeholder: string;
  public mainList: IPrimaryDropdownListElement[];
  public onSelectMain: (item: IDropdownItem) => void;
  public selectedItem: IDropdownItem;
  public mainPlaceholder: IDropdownItem;
  public callback?: (item: IDropdownItem) => {};
  public filterBy: IFilterBy = {
    name: ''
  };
  public isValid: boolean;
  public validationText: string;
  public isSubmitted: boolean;
  private dropdown: JQuery = this.$element.find('.dropdown-list');
  private dropdownSelectedItem: JQuery;
  public selectedItemNumber = 0;
  private dropdownScrollContainerElement: JQuery;
  private static readonly dividerOnHalf = 2;

  public $onInit = (): void => {
    this.mainPlaceholder = {
      name: this.placeholder,
      value: null
    };

    this.dropdown = this.$element.find('.dropdown-list');
    this.dropdownScrollContainerElement = this.$element.find('.dropdown-content');
    this.$document.bind('click', (event) => {
      const ifTargetClicked = this.$element.find(event.target).length > 0;
      if (!ifTargetClicked) {
        this.isOpen = false;
      }
      this.filterBy.name = '';
      this.$scope.$apply();
    });
    this.dropdownScrollContainerElement.perfectScrollbar();

    // tslint:disable-next-line:cyclomatic-complexity
    this.$element.bind('keydown keypress', (event) => {
      const keyCode = event.which || event.keyCode;
      switch (keyCode) {
        case keyboardCodes.arrowDown:
          if (this.isOpen && this.selectedItemNumber < this.mainList.length) {
            event.preventDefault();
            this.onArrowItemSelect(++this.selectedItemNumber);
          }
          break;

        case keyboardCodes.arrowUp:
          if (this.isOpen && this.selectedItemNumber > 1) {
            event.preventDefault();
            this.onArrowItemSelect(--this.selectedItemNumber);
          }
          break;

        case keyboardCodes.enter:
          this.onMainItemSelect(this.mainList[this.selectedItemNumber - 1]);
          event.preventDefault();
          break;

        default:
      }
    });
  }

  public $onDestroy = (): void => {
    this.$element.unbind('keydown keypress');
  }

  public static $inject = ['$document', '$scope', '$element'];

    constructor(private $document: ng.IDocumentService,
              private $scope: ng.IScope,
              private $element: ng.IRootElementService) {
  }

  public onArrowItemSelect = (selectedItemIndex: number): void => {
    this.dropdown.find('li').removeClass('is-focused');
    this.dropdownSelectedItem = this.dropdown.find(`li:nth-child(${selectedItemIndex})`);
    this.dropdownSelectedItem.addClass('is-focused');
    if (this.dropdownSelectedItem[0]) {
      this.dropdownScrollContainerElement
      .scrollTop(this.dropdownSelectedItem[0].offsetTop - (this.dropdown.height() /
        DropdownPrimaryComponentController.dividerOnHalf - this.dropdownSelectedItem[0].clientHeight));
    }
  }

  private clearDropdown = (): void => {
    this.selectedItemNumber = 0;
    this.dropdown.find('li').removeClass('is-focused');
  }

  public mainListExist = (): boolean =>
  angular.isDefined(this.mainList) && this.mainList.length > 0

  public toggleDropdown = (): void => {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.clearDropdown();
    }
  }

  public isSelected = (item: IDropdownItem): boolean =>
  this.selectedItem === item

  public onMainItemSelect = (item: IDropdownItem): void => {
    this.activeItem = item;
    this.onItemChecked(item);

    if (this.onSelectMain && typeof this.onSelectMain === 'function') {
      this.onSelectMain(item);
    }
  }

  private onItemChecked = (item: IDropdownItem): void => {
    this.isOpen = !this.isOpen;
    this.isActive = !!item.value;
    this.selectedItem = item;
  }
}
