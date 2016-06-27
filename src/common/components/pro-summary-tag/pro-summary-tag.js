(function() {

  let proSummaryTag = {
    transclude: true,
    templateUrl:    'components/pro-summary-tag/pro-summary-tag.tpl.html',
    bindings: {
      tags: '<',
      title: '@'
    }
  }

  angular.module('profitelo.components.pro-summary-tag', [
    'pascalprecht.translate'
  ])
  .component('proSummaryTag', proSummaryTag)

}())