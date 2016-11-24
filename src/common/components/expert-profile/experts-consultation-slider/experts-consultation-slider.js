(function() {
  /* @ngInject */
  function controller($scope, HelperService) {
    this.areControllsVisible = false

    if (this.experts.length <= 4) {
      this.areControllsVisible = false
    }

    this.controlls = {}

    this.nextSlide = () => {
      $scope.controlls.nextSlide()
    }

    this.prevSlide = () => {
      $scope.controlls.prevSlide()
    }
    
    this.expertImage = (token) => {
      if (!!token && token !== null) {
        return HelperService.fileUrlResolver(token)
      } 
      
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
    'pascalprecht.translate'
  ])
    .component('expertsConsultationSlider', expertsConsultationSlider)

}())