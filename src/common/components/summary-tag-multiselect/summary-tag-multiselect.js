(function() {
  /* @ngInject */
  function controller($scope) {
    let checkedTagsArray = []

    $scope.chooseTag = (tag) => {
      if (checkedTagsArray.indexOf(tag) === -1) {
        checkedTagsArray.push(tag)
      } else {
        checkedTagsArray.splice(checkedTagsArray.indexOf(tag), 1)
      }
      this.onSelectChange = (checkedTagsArray) => {
        
      }
    }

    $scope.isChecked = (tag) => {
      if (checkedTagsArray.indexOf(tag) > -1) {
        return true
      }
      return false
    }

    return this
  }

  const summaryTagMultiselectComponent = {
    transclude: true,
    templateUrl: 'components/summary-tag-multiselect/summary-tag-multiselect.tpl.html',
    bindings: {
      tags: '<',
      title: '@',
      onSelectChange: "<"
    },
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.summary-tag-multiselect', [
    'pascalprecht.translate'
  ])
    .component('summaryTagMultiselectComponent', summaryTagMultiselectComponent)

}())
