(function() {
  /* @ngInject */
  function controller() {
    const checkedTagsArray = []
    let isMultiselectDisable = false

    this.disableMultiselect = () => {
      angular.element('.tag-list').addClass('disable')
      isMultiselectDisable = true
    }

      if (angular.isDefined(this.selectedItems) && this.selectedItems.length > 0) {
        _.forEach(this.selectedItems, (selectedTag) => {
          checkedTagsArray.push((_.find(this.items, (item : any) => item.id === selectedTag.id)))
        })
      }

    if (angular.isDefined(this.selectedItems) && this.selectedItems.length > 0) {
      this.disableMultiselect()
    }

    this.toggleItem = (item) => {
      if (!isMultiselectDisable) {
        if (checkedTagsArray.indexOf(item) === -1) {
          checkedTagsArray.push(item)
        } else {
          checkedTagsArray.splice(checkedTagsArray.indexOf(item), 1)
        }
        this.onSelectChange(checkedTagsArray)
      }
    }

    this.isChecked = (item) => {
      return (checkedTagsArray.indexOf(item) > -1)
    }

    return this
  }

  const component = {
    templateUrl: 'components/interface/multiselect/multiselect.tpl.html',
    bindings: {
      disableMultiselect: '=?',
      items: '<',
      onSelectChange: '<',
      selectedItems: '<',
      field: '@',
      title: '@'
    },
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.interface.multiselect', [
    'pascalprecht.translate'
  ])
    .component('multiselect', component)

}())
