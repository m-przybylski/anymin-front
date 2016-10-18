(function() {

  /* @ngInject */
  function singleConsultationController(CommonSettingsService, currentCallSessionService) {

    if (this.consultation.owner.img !== null || this.consultation.owner.img === '') {
      this.profileImage = CommonSettingsService.links.imageUrl.replace('%s', this.consultation.owner.img)
    } else {
      this.profileImage = ''
    }

    this.startCall = () => {
      currentCallSessionService.setSession()
    }

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
    'profitelo.services.current-call-state',
    'profitelo.services.commonSettings',
    'profitelo.filters.object-size-filter',
    'profitelo.services.resolvers.app.service-provider-image-resolver'
  ])
    .component('singleConsultation', singleConsultation)

}())