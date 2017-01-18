(function () {

  /* @ngInject */
  function controller($scope, $state, helperService) {

    this.$onInit = () => {
      this.areControllsVisible = this.consultations.length > 3
    }

    this.nextSlide = () => {
      $scope.controlls.nextSlide()
    }

    this.prevSlide = () => {
      $scope.controlls.prevSlide()
    }

    this.consultationOwnerImage = (imgToken) => {
      return imgToken !== null || imgToken === '' ? helperService.fileUrlResolver(imgToken) : false
    }

    this.goToProfile = (consultation) => {
      const stateName = consultation.owner.type === 'ORG' ? 'app.company-profile' : 'app.expert-profile'
      $state.go(stateName, {profileId: consultation.owner.id, primaryConsultationId: consultation.id})
    }

    return this
  }

  const similarExpertsSlider = {
    templateUrl: 'components/expert-profile/similar-experts-slider/similar-experts-slider.tpl.html',
    bindings: {
      consultations: '<',
      title: '@'
    },
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.expert-profile.similar-experts-slider', [
    'profitelo.components.interface.slider',
    'profitelo.services.helper',
    'pascalprecht.translate'
  ])
  .component('similarExpertsSlider', similarExpertsSlider)

}())
