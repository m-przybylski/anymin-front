(function() {
  /* @ngInject */
  function controller($scope, urlService) {
    this.areControllsVisible = false

    this.expertsArray = []
    this.expertsArray = this.expertsArray.concat(this.experts)
    
    if (this.expertsArray.length > 4) {
      this.areControllsVisible = true
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
        return urlService.resolveFileUrl(token)
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
    'profitelo.services.url',
    'pascalprecht.translate'
  ])
    .component('expertsConsultationSlider', expertsConsultationSlider)

}())