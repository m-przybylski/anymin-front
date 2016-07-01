(function() {
  function singleConsultation() {
    function linkFunction(scope, element, attrs) {

    }


    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/search/single-consultation/single-consultation.tpl.html',
      scope: {
      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.search.single-consultation', [])
    .directive('singleConsultation', singleConsultation)
}())