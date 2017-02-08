(function() {
  /* @ngInject */
  function showMoreTagsController()  {

    return this
  }

  let proSummaryTag = {
    transclude: true,
    templateUrl:    'components/pro-summary-tag/pro-summary-tag.tpl.html',
    bindings: {
      tags: '<',
      hideMoreTags: '<',
      title: '@'
    },
    controller: showMoreTagsController,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.pro-summary-tag', [
    'pascalprecht.translate'
  ])
  .component('proSummaryTag', proSummaryTag)

}())
