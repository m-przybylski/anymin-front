(function () {
  /* @ngInject */
  function controller($document: ng.IDocumentService, $scope: ng.IScope, $element: ng.IRootElementService) {

    this.$onInit = () => {
      this.mainPlaceholder = {
        name: this.placeholder,
        value: null
      }
    }

    const dropdownScroll: any = angular.element('.dropdown-content')
    this.isOpen = false
    this.isActive = false

    this.activeItem = false

    this.mainListExist = () =>
      angular.isDefined(this.mainList) && this.mainList.length > 0

    this.isSecondaryListExist = () =>
      angular.isDefined(this.secondaryList) && this.secondaryList.length > 0

    this.toggleDropdown = () => {
      this.isOpen = !this.isOpen
    }

    const onItemChecked = (item) => {
      this.isOpen = !this.isOpen
      this.isActive = item.value
      this.selectedItem = item
    }

    this.isSelected = (item) => {
      return this.activeItem === item
    }

    this.onMainItemSelect = (item) => {
      this.activeItem = item
      onItemChecked(item)
      this.onSelectMain(item)
    }

    this.onSecondaryItemSelect = (item) => {
      this.activeItem = item
      onItemChecked(item)
      this.onSelectSecond(item)
    }

    dropdownScroll.perfectScrollbar()

    $document.bind('click', (event) => {
      let ifTargetClicked = $element.find(event.target).length > 0
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
    templateUrl: 'components/interface/dropdown/dropdown.tpl.html',
    controllerAs: '$ctrl',
    transclude: true,
    controller: controller,
    bindings: {
      label: '@',
      inputPlaceholder: '@',
      name: '@',
      placeholder: '@',
      mainList: '<',
      secondaryList: '<',
      onSelectMain: '<',
      onSelectSecond: '<',
      selectedItem: '<'
    }

  }

  angular.module('profitelo.components.interface.dropdown', [])
  .component('dropdownInput', component)

}())
