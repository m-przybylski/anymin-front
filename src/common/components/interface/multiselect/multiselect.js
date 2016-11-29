(function() {
  /* @ngInject */
  function controller() {
    const checkedTagsArray = []

    this.toggleItem = (item) => {
      if (checkedTagsArray.indexOf(item) === -1) {
        checkedTagsArray.push(item)
      } else {
        checkedTagsArray.splice(checkedTagsArray.indexOf(item), 1)
      }
      this.onSelectChange(checkedTagsArray)
    }

    this.isChecked = (item) => {
      return (checkedTagsArray.indexOf(item) > -1)
    }

    return this
  }

  const component = {
    templateUrl: 'components/interface/multiselect/multiselect.tpl.html',
    bindings: {
      items: '<',
      field: '@',
      title: '@',
      onSelectChange: '<'
    },
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.interface.multiselect', [
    'pascalprecht.translate'
  ])
    .component('multiselect', component)

}())
