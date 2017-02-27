namespace profitelo.components.interface.dropdownPrimary {

  interface IDropdownItem {
    name: string
    value: Object | null
  }

  interface IDropdownPrimaryComponentBindings {
    label: string
    inputPlaceholder: string
    name: string
    placeholder: string
    mainList: Array<Object>
    onSelectMain: Function
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
    public mainList: Array<IPrimaryDropdownListElement>
    public onSelectMain: Function
    public selectedItem: IDropdownItem
    public mainPlaceholder: IDropdownItem

    public filterBy: IFilterBy = {
      name: ''
    }

    $onInit = () => {
      this.mainPlaceholder = {
        name: this.placeholder,
        value: null
      }
    }

    /* @ngInject */
    constructor(private $document: ng.IDocumentService, private  $scope: ng.IScope,
                private $element: ng.IRootElementService) {

      this.$document.bind('click', (event) => {
        let ifTargetClicked = this.$element.find(event.target).length > 0
        if (!ifTargetClicked) {
          this.isOpen = false
        }
        this.filterBy.name = ''
        this.$scope.$apply()
      })

      this.dropdownScroll.perfectScrollbar()

    }

    public mainListExist = (): boolean =>
    angular.isDefined(this.mainList) && this.mainList.length > 0

    public toggleDropdown = (): void => {
      this.isOpen = !this.isOpen
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

    private dropdownScroll = angular.element('.dropdown-content')
  }

  class DropdownPrimaryComponent implements ng.IComponentOptions {
    controller: ng.Injectable<ng.IControllerConstructor> = DropdownPrimaryComponentController
    templateUrl: string = 'components/interface/dropdown-primary/dropdown-primary.tpl.html'
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
}

