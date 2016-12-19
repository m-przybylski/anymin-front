(function() {
  /* @ngInject */
  function controller($document, $scope, $element) {

    const dropdownScroll = angular.element('.dropdown-content')

    this.isOpen = false
    this.isActive = false

    this.toggleDropdown = () => {
      this.isOpen = !this.isOpen
    }

    const onItemChecked = (item) => {
      this.isOpen = !this.isOpen
      this.isActive = item.value
      this.selectedItem = item
    }

    this.mainPlaceholder = {
      name: this.placeholder,
      value: void 0
    }

    this.onMainItemSelect = (item) => {
      onItemChecked(item)
      this.onSelectMain(item)
    }

    this.onSecondaryItemSelect = (item) => {
      onItemChecked(item)
      this.onSelectSecond(item)
    }

    dropdownScroll.perfectScrollbar()

    $document.bind('click', (event) => {
      let ifTargetClicked = $element.find(event.target).length > 0
      if (!ifTargetClicked) {
        this.isOpen = false
      }
      $scope.$apply()
    })

    this.filterBy = {
      name: ""
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


  angular.module('profitelo.components.interface.dropdown', [
  ])
    .component('dropDown', component)

}())
