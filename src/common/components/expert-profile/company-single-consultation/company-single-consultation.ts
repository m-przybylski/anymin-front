import * as angular from "angular"
import {CallService} from "../../communicator/call.service"
import urlModule from "../../../services/url/url"
import filtersModule from "../../../filters/filters"
import communicatorModule from "../../communicator/communicator"
import "common/components/interface/slider/slider"
import "common/components/expert-profile/experts-consultation-slider/experts-consultation-slider"

/* @ngInject */
function controller(callService: CallService) {

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
  template: require('./company-single-consultation.pug')(),
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
  urlModule,
  filtersModule,
  'profitelo.components.expert-profile.experts-consultation-slider',
  communicatorModule,
  'pascalprecht.translate'
])
  .component('companySingleConsultation', companySingleConsultation)
