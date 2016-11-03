(function() {

  /* @ngInject */
  function controller($scope, $state, HelperService, callService) {

    this.imageUrl = (slide) => {
      return slide.previews[0]
    }

    this.controlls = {}

    this.nextSlide = function() {
      $scope.controlls.nextSlide()
    }

    this.prevSlide = function() {
      $scope.controlls.prevSlide()
    }

    this.consultationOwnerImage = (imgToken) => {
      return imgToken !== null ||  imgToken === '' ? HelperService.fileUrlResolver(imgToken) : ''
    }

    this.goToProfile = (consultation) => {
      const stateName  = consultation.type === 'ORG' ? 'app.company-profile' : 'app.expert-profile'

      $state.go(stateName, { contactId: consultation.owner.id, primaryConsultationId: consultation.id  })
    }

    return this
  }

  const similarExpertsSlider = {
    templateUrl: 'components/expert-profile/similar-experts-slider/similar-experts-slider.tpl.html',
    restrict: 'E',
    replace: true,
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
    'profitelo.services.call',
    'pascalprecht.translate'
  ])
    .component('similarExpertsSlider', similarExpertsSlider)

}())
