(function() {

  /* @ngInject */
  function singleConsultationController(AppServiceProviderImageResolver) {

    AppServiceProviderImageResolver.resolve(this.consultation.owner.img).then((res) => {
      this.profileImage = res
    })

    return this
  }

  let singleConsultation = {
    transclude: true,
    templateUrl:    'components/search/single-consultation/single-consultation.tpl.html',
    bindings: {
      consultation: '<'
    },
    controllerAs: 'vm',
    controller: singleConsultationController
  }

  angular.module('profitelo.components.search.single-consultation', [
    'pascalprecht.translate',
    'profitelo.filters.object-size-filter',
    'profitelo.services.resolvers.app.service-provider-image-resolver'
  ])
    .component('singleConsultation', singleConsultation)

}())