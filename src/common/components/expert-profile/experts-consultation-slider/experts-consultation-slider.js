(function() {
  /* @ngInject */
  function controller($scope, $state, HelperService) {

    this.imageUrl = (slide) => {
      return slide.previews[0]
    }

    this.controlls = {}

    this.nextSlide = () => {
      $scope.controlls.nextSlide()
    }

    this.prevSlide = () => {
      $scope.controlls.prevSlide()
    }

    this.consultationOwnerImage = (imgToken) => {
      return imgToken !== null ||  imgToken === '' ? HelperService.fileUrlResolver(imgToken) : ''
    }

    return this
  }

  const expertsConsultationSlider = {
    templateUrl: 'components/expert-profile/experts-consultation-slider/experts-consultation-slider.tpl.html',
    bindings: {
      experts: '<',
      title: '@'
    },
    controller: controller,
    controllerAs: '$ctrl'
  }


  angular.module('profitelo.components.expert-profile.experts-consultation-slider', [
    'profitelo.components.interface.slider',
    'profitelo.services.helper',
    'profitelo.services.call',
    'pascalprecht.translate'
  ])
    .component('expertsConsultationSlider', expertsConsultationSlider)

}())