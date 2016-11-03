(function() {

  /* @ngInject */
  function singleConsultationController($state, HelperService, callService) {

    if (this.consultation.owner.img !== null || this.consultation.owner.img === '') {
      this.profileImage = HelperService.fileUrlResolver(this.consultation.owner.img)
    } else {
      this.profileImage = ''
    }

    this.goToProfile =() => {
      let stateName  = this.consultation.type === 'ORG' ? 'app.company-profile' : 'app.expert-profile'

      $state.go(stateName, { contactId: this.consultation.owner.id, primaryConsultationId: this.consultation.id  })
    }

    this.startCall = () => {
      callService.callServiceId(this.consultation.id)
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
    'profitelo.services.call',
    'profitelo.services.helper',
    'profitelo.filters.object-size-filter',
    'profitelo.services.resolvers.app.service-provider-image-resolver'
  ])
    .component('singleConsultation', singleConsultation)

}())