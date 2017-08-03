import * as angular from 'angular'
import {KeyboardKeyCodes} from '../../../classes/keyboard-key-codes'
interface IDropdownItem {
  name: string
  value: {} | null
}

interface IDropdownPrimaryComponentBindings {
  label: string
  inputPlaceholder: string
  name: string
  placeholder: string
  mainList: {}[]
  onSelectMain: (item: IDropdownItem) => void
  selectedItem: IDropdownItem
}

export interface IPrimaryDropdownListElement {
  name: string
  value: any
}

interface IFilterBy {
  name: string
}

class DropdownPrimaryComponentController implements ng.IController, IDropdownPrimaryComponentBindings {

  public isOpen: boolean = false
  public isActive: boolean = false
  public activeItem: IDropdownItem
  public label: string
  public inputPlaceholder: string
  public name: string
  public placeholder: string
  public mainList: IPrimaryDropdownListElement[]
  public onSelectMain: (item: IDropdownItem) => void
  public selectedItem: IDropdownItem
  public mainPlaceholder: IDropdownItem
  public filterBy: IFilterBy = {
    name: ''
  }
  private dropdown: JQuery = this.$element.find('.dropdown-list')
  private dropdownSelectedItem: JQuery
  public selectedItemNumber: number = 0
  private dropdownScrollContainerElement: JQuery
  private static readonly dividerOnHalf: number = 2

  $onInit = (): void => {
    this.mainPlaceholder = {
      name: this.placeholder,
      value: null
    }

    this.dropdown = this.$element.find('.dropdown-list')
    this.dropdownScrollContainerElement = this.$element.find('.dropdown-content')
    this.$document.bind('click', (event) => {
      const ifTargetClicked = this.$element.find(event.target).length > 0
      if (!ifTargetClicked) {
        this.isOpen = false
      }
      this.filterBy.name = ''
      this.$scope.$apply()
    })
    this.dropdownScrollContainerElement.perfectScrollbar()

    this.$element.bind('keydown keypress', (event) => {
      const keyCode = event.which || event.keyCode
      switch (keyCode) {
        case KeyboardKeyCodes.keyCodes.arrowDown:
          if (this.isOpen && this.selectedItemNumber < this.mainList.length) {
            event.preventDefault()
            this.onArrowItemSelect(++this.selectedItemNumber)
          }
          break

        case KeyboardKeyCodes.keyCodes.arrowUp:
          if (this.isOpen && this.selectedItemNumber > 1) {
            event.preventDefault()
            this.onArrowItemSelect(--this.selectedItemNumber)
          }
          break

        case KeyboardKeyCodes.keyCodes.enter:
          this.onMainItemSelect(this.mainList[this.selectedItemNumber - 1])
          event.preventDefault()
          break

        default:
          break
      }
    })
  }

  $onDestroy = (): void => {
    this.$element.unbind('keydown keypress')
  }

  /* @ngInject */
  constructor(private $document: ng.IDocumentService,
              private $scope: ng.IScope,
              private $element: ng.IRootElementService) {
  }

  public onArrowItemSelect = (selectedItemIndex: number): void => {
    this.dropdown.find('li').removeClass('is-focused')
    this.dropdownSelectedItem = this.dropdown.find('li:nth-child(' + (selectedItemIndex) + ')')
    this.dropdownSelectedItem.addClass('is-focused')
    if (this.dropdownSelectedItem[0]) {
      this.dropdownScrollContainerElement
      .scrollTop(this.dropdownSelectedItem[0].offsetTop - (this.dropdown.height() /
        DropdownPrimaryComponentController.dividerOnHalf - this.dropdownSelectedItem[0].clientHeight))
    }
  }

  private clearDropdown = (): void => {
    this.selectedItemNumber = 0
    this.dropdown.find('li').removeClass('is-focused')
  }

  public mainListExist = (): boolean =>
  angular.isDefined(this.mainList) && this.mainList.length > 0

  public toggleDropdown = (): void => {
    this.isOpen = !this.isOpen
    if (this.isOpen) {
      this.clearDropdown()
    }
  }

  public isSelected = (item: IDropdownItem): boolean =>
  this.activeItem === item

  public onMainItemSelect = (item: IDropdownItem): void => {
    this.activeItem = item
    this.onItemChecked(item)

    if (this.onSelectMain && typeof this.onSelectMain === 'function') {
      this.onSelectMain(item)
    }
  }

  private onItemChecked = (item: IDropdownItem): void => {
    this.isOpen = !this.isOpen
    this.isActive = !!item.value
    this.selectedItem = item
  }
}

class DropdownPrimaryComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = DropdownPrimaryComponentController
  template = require('./dropdown-primary.pug')()
  bindings: {[boundProperty: string]: string} = {
    label: '@',
    inputPlaceholder: '@',
    name: '@',
    placeholder: '@',
    mainList: '<',
    onSelectMain: '<',
    selectedItem: '<'
  }
}

angular.module('profitelo.components.interface.dropdown-primary', [
  'pascalprecht.translate'
])
.component('dropdownPrimary', new DropdownPrimaryComponent)
