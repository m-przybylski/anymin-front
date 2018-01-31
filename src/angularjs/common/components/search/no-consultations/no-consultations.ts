(function (): void {

  function noConsultationsController(): void {

    return this;
  }

  const noConsultations = {
    transclude: true,
    template: require('./no-consultations.html'),
    controllerAs: 'vm',
    bindings: {
      query: '<'
    },
    controller: [noConsultationsController]
  };

  angular.module('profitelo.components.search.no-consultations', [
    'pascalprecht.translate'
  ])
    .component('noConsultations', noConsultations);
}());
