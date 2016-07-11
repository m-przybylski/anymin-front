(function() {

  let singleConsultation = {
    transclude: true,
    templateUrl:    'components/search/single-consultation/single-consultation.tpl.html',
    bindings: {
    }
  }

  angular.module('profitelo.components.search.single-consultation', [
    'pascalprecht.translate'
  ])
    .component('singleConsultation', singleConsultation)

}())