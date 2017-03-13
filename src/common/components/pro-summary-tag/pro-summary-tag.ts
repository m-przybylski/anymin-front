(function() {
  /* @ngInject */
  function showMoreTagsController()  {

    return this
  }

  let proSummaryTag = {
    transclude: true,
    template: require('./pro-summary-tag.jade')(),
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
