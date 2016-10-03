(function() {

  /* @ngInject */
  function noConsultationsController() {

    return this
  }

  const noConsultations = {
    transclude: true,
    templateUrl: 'components/search/no-consultations/no-consultations.tpl.html',
    controllerAs: 'vm',
    bindings: {
      query: '<'
    },
    controller: noConsultationsController
  }

  angular.module('profitelo.components.search.no-consultations', [
    'pascalprecht.translate'
  ])
    .component('noConsultations', noConsultations)
}())