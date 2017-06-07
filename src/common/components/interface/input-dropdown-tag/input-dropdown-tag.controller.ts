import * as angular from 'angular'
import {InputDropdownTagComponentBindings} from './input-dropdown-tag'
import * as _ from 'lodash'

export interface IDropdownItem {
  name: string
  value: string
}

export interface IDropdownInputDictionary {
  [key: string]: string
}

export class InputDropdownTagComponentController implements InputDropdownTagComponentBindings {
  public isOpen: boolean = false
  public isActive: boolean = false
  public label: string
  public placeholder: string
  public dictionary: IDropdownInputDictionary
  public dropdownList: Array<IDropdownItem> = []
  public hintLabel: string = ''
  public selectedItems: Array<IDropdownItem> = []
  public selectedItemsValue: Array<string> = []
  public filteredItems: Array<IDropdownItem> = []
  public selectedItemNumber: number = 0
  public dropdownScroll: JQuery

  public filterInputText: string
  public isFocus: boolean = false
  public isDirty: boolean = false

  private keyCodes = {
    arrowDown: 40,
    arrowUp: 38
  }

  private dropdownSelectedItem: JQuery
  private dropdown: JQuery = this.$element.find('.dropdown-list')

  $onInit = () => {
    for (const key in this.dictionary) {
      if (this.dictionary.hasOwnProperty(key)) {
        this.dropdownList.push({
          name: this.dictionary[key],
          value: key
        })
      }
    }

    this.selectedItemsValue.forEach((selectItemValue) => {
      _.remove(this.dropdownList, (object) => {
        return object.value === selectItemValue
      })
      this.selectedItems.push({
        name: this.dictionary[selectItemValue],
        value: selectItemValue
      })
    })

  }

  /* @ngInject */
  constructor(private $document: ng.IDocumentService, private  $scope: ng.IScope,
              private $element: ng.IRootElementService, private $filter: ng.IFilterService) {

    this.dropdownScroll = this.$element.find('.dropdown-content')

    this.$document.bind('click', (event) => {
      const ifTargetClicked = this.$element.find(event.target).length > 0
      if (!ifTargetClicked) {
        this.isOpen = false
      }
    })

    this.$scope.$watch(() => {
      return this.filterInputText
    }, () => {
      this.filterItems()
      this.dropdownScroll.scrollTop(0)
    })

    this.dropdownScroll.perfectScrollbar()

    $element.bind('keydown keypress', (event) => {
      const keyCode = event.which || event.keyCode

      switch (keyCode) {
        case this.keyCodes.arrowDown:
          event.preventDefault()
          this.filterItems()

          if (this.filteredItems && this.selectedItemNumber < this.filteredItems.length)
            this.selectedItemNumber++

          this.onArrowItemSelect()
          this.isOpen = true
          this.dropdownScroll.scrollTop(this.dropdownSelectedItem[0].offsetTop - (this.dropdown.height() / 2 - this.dropdownSelectedItem[0].clientHeight))

          break

        case this.keyCodes.arrowUp:
          event.preventDefault()
          this.filterItems()

          if (this.selectedItemNumber > 1)
            this.selectedItemNumber--

          this.onArrowItemSelect()
          this.isOpen = true
          this.dropdownScroll.scrollTop(this.dropdownSelectedItem[0].offsetTop - (this.dropdown.height() / 2 - this.dropdownSelectedItem[0].clientHeight))

          break

        default:
          break
      }
    })
  }

  public mainListExist = (): boolean =>
  angular.isDefined(this.dropdownList) && this.dropdownList.length > 0

  public inputClick = () => {
    this.isOpen = true
    this.dropdownScroll.scrollTop(0)
  }

  public deleteSelectedItem = (item: IDropdownItem, index: number): void => {
    this.selectedItems.splice(index, 1)
    this.selectedItemsValue.splice(index, 1)
    this.dropdownList.push(item)
    this.filterItems()
    this.isDirty = true
  }

  public onMainItemSelect = (item: IDropdownItem, index: number): void => {
    this.selectedItems.push(item)
    this.isOpen = false
    this.selectedItemsValue.push(item.value)
    this.dropdownList.splice(index, 1)

    this.clearInput()
  }

  public onFocus = () => {
    this.isFocus = true
    this.isDirty = true
  }

  public onBlur = () => {
    this.isFocus = false
  }

  public onArrowItemSelect = () => {
    this.dropdown.find('li').removeClass('is-focused')
    this.dropdownSelectedItem = this.dropdown.find('li:nth-child(' + (this.selectedItemNumber) + ')')
    this.dropdownSelectedItem.addClass('is-focused')

    return this.filteredItems[this.selectedItemNumber - 1]
  }

  public onClickEnter = (): void => {
    if (this.filteredItems && this.filteredItems.length > 0 && this.selectedItemNumber !== 0) {
      this.selectedItems.push(this.onArrowItemSelect())
      this.selectedItemsValue.push(this.onArrowItemSelect().value)

      _.remove(this.dropdownList, (object) => {
        return object === this.onArrowItemSelect()
      })

      this.filterItems()
      this.onArrowItemSelect()
      this.isOpen = false
      this.clearInput()
    }

    this.selectedItemNumber = 0
  }

  private clearInput = () => {
    this.filterInputText = ''
  }

  private filterItems = (): void => {
    this.filteredItems = this.$filter('filter')(this.dropdownList, this.filterInputText)

    if (this.filteredItems && this.selectedItemNumber > this.filteredItems.length)
      this.selectedItemNumber = this.filteredItems.length
  }
}
