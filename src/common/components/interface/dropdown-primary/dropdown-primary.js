(function() {
  /* @ngInject */
  function controller($document, $scope, $element) {

    const dropdownScroll = angular.element('.dropdown-content')

    this.isOpen = false
    this.isActive = false
    this.activeItem = false

    this.mainPlaceholder = {
      name: this.placeholder,
      value: null
    }

    this.mainListExist = () =>
      angular.isDefined(this.mainList) && this.mainList.length > 0

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
    templateUrl: 'components/interface/dropdown-primary/dropdown-primary.tpl.html',
    controllerAs: '$ctrl',
    transclude: true,
    controller: controller,
    bindings: {
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
  ])
    .component('dropDownPrimary', component)

}())
