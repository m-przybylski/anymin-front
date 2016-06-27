(function() {

  let proSummaryTag = {
    templateUrl:    'components/pro-summary-tag/pro-summary-tag.tpl.html',
    bindings: {
      tags: '<'
    }
  }

  angular.module('profitelo.components.pro-summary-tag', [
    'pascalprecht.translate'
  ])
  .component('proSummaryTag', proSummaryTag)

}())