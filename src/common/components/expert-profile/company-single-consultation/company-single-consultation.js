(function() {

  /* @ngInject */
  function controller(HelperService) {

    this.tags = this.service.details.tags
    this.experts = this.service.details.employees
    
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
