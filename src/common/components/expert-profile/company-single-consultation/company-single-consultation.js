(function() {

  /* @ngInject */
  function controller(HelperService) {

    this.consultationOwnerImage = (imgToken) => {
      return imgToken !== null ||  imgToken === '' ? HelperService.fileUrlResolver(imgToken) : ''
    }
    
    this.tags = this.service.details.tags

    // Mock data:
    this.consultation = {}
    this.consultation.timeAverage = Math.floor((Math.random() * 10) + 1)

    return this
  }

  const companySingleConsultation = {
    templateUrl: 'components/expert-profile/company-single-consultation/company-single-consultation.tpl.html',
    replace: true,
    bindings: {
      service: '<',
      title: '@'
    },
    controller: controller,
    controllerAs: '$ctrl'
  }


  angular.module('profitelo.components.expert-profile.company-single-consultation', [
    'profitelo.components.interface.slider',
    'profitelo.services.helper',
    'profitelo.components.expert-profile.experts-consultation-slider',
    'profitelo.services.call',
    'pascalprecht.translate'
  ])
    .component('companySingleConsultation', companySingleConsultation)

}())
