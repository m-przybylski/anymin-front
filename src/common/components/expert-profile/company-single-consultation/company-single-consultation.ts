namespace profitelo.components.expertProfile.companySingleConsultation {

  import ICallService = profitelo.services.call.ICallService

  /* @ngInject */
  function controller(callService: ICallService) {

    this.startCall = () => {
      callService.callServiceId(this.serviceTagsEmployeesTuple.service.id)
    }

    this.$onInit = () => {
      this.tags = this.serviceTagsEmployeesTuple.tags
      this.experts = this.serviceTagsEmployeesTuple.employees
    }

    return this
  }

  const companySingleConsultation = {
    templateUrl: 'components/expert-profile/company-single-consultation/company-single-consultation.tpl.html',
    replace: true,
    bindings: {
      serviceTagsEmployeesTuple: '<',
      title: '@'
    },
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.expert-profile.company-single-consultation', [
    'profitelo.components.interface.slider',
    'profitelo.services.url',
    'profitelo.filters.money',
    'profitelo.components.expert-profile.experts-consultation-slider',
    'profitelo.services.call',
    'pascalprecht.translate'
  ])
  .component('companySingleConsultation', companySingleConsultation)

}
