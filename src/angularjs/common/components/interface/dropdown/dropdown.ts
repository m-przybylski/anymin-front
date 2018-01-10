(function (): void {

  function controller($document: ng.IDocumentService, $scope: ng.IScope, $element: ng.IRootElementService): void {

    this.$onInit = (): void => {
      this.mainPlaceholder = {
        name: this.placeholder,
        value: null
      }
    }

    const dropdownScroll: any = angular.element('.dropdown-content')
    this.isOpen = false
    this.isActive = false

    this.activeItem = false

    this.mainListExist = (): boolean =>
      angular.isDefined(this.mainList) && this.mainList.length > 0

    this.isSecondaryListExist = (): boolean =>
      angular.isDefined(this.secondaryList) && this.secondaryList.length > 0

    this.toggleDropdown = (): void => {
      this.isOpen = !this.isOpen
    }

    const onItemChecked = (item: any): void => {
      this.isOpen = !this.isOpen
      this.isActive = item.value
      this.selectedItem = item
    }

    this.isSelected = (item: any): boolean => this.activeItem === item

    this.onMainItemSelect = (item: any): void => {
      this.activeItem = item
      onItemChecked(item)
      this.onSelectMain(item)
    }

    this.onSecondaryItemSelect = (item: any): void => {
      this.activeItem = item
      onItemChecked(item)
      this.onSelectSecond(item)
    }

    dropdownScroll.perfectScrollbar()

    $document.bind('click', (event) => {
      const ifTargetClicked = $element.find(event.target).length > 0
      if (!ifTargetClicked) {
        this.isOpen = false
      }
      this.filterBy.name = ''
      $scope.$apply()
    })

    this.filterBy = {
      name: ''
    }

    return this
  }

  const component = {
    template: require('./dropdown.html'),
    controllerAs: '$ctrl',
    transclude: true,
    controller: ['$document', '$scope', '$element', controller],
    bindings: {
      label: '@',
      inputPlaceholder: '@',
      name: '@',
      mainListLabelOnSecondaryExist: '@',
      placeholder: '@',
      mainListLabel: '@',
      mainList: '<',
      secondaryList: '<',
      onSelectMain: '<',
      onSelectSecond: '<',
      selectedItem: '<'
    }

  }

  angular.module('profitelo.components.interface.dropdown', [
    'pascalprecht.translate'
  ])
  .component('dropdownInput', component)

}())
