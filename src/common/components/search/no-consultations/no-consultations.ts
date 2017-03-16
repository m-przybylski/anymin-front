(function() {

  /* @ngInject */
  function noConsultationsController() {

    return this
  }

  const noConsultations = {
    transclude: true,
    template: require('./no-consultations.pug')(),
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
