(function () {

  /* @ngInject */
  function singleConsultationController($state, urlService, callService) {
    this.isLinkActive = true

    this.$onInit = () => {
      this.consultation.price = {
        amount: this.consultation.price,
        currency: 'PLN'
      }

      if (!!this.consultation.owner.img && this.consultation.owner.img !== null) {
        this.profileImage = urlService.resolveFileUrl(this.consultation.owner.img)
      } else {
        this.profileImage = null
      }
    }

    this.onMouseOver = () => {
      this.isLinkActive = false
    }

    this.onMouseLeave = () => {
      this.isLinkActive = true
    }

    this.goToProfile = () => {
      if (this.isLinkActive) {
        const stateName = this.consultation.owner.type === 'ORG' ? 'app.company-profile' : 'app.expert-profile'
        $state.go(stateName, {profileId: this.consultation.owner.id, primaryConsultationId: this.consultation.id})
      }
    }

    this.startCall = () => {
      callService.callServiceId(this.consultation.id)
    }

    return this
  }

  let singleConsultation = {
    transclude: true,
    templateUrl: 'components/search/single-consultation/single-consultation.tpl.html',
    bindings: {
      consultation: '<'
    },
    controllerAs: 'vm',
    controller: singleConsultationController
  }

  angular.module('profitelo.components.search.single-consultation', [
    'pascalprecht.translate',
    'profitelo.services.call',
    'profitelo.filters.money',
    'profitelo.services.url',
    'profitelo.filters.object-size-filter',
    'profitelo.resolvers.service-provider-image'
  ])
  .component('singleConsultation', singleConsultation)

}())