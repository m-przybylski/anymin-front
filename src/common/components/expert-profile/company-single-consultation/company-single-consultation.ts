import * as angular from 'angular'
import urlModule from '../../../services/url/url'
import filtersModule from '../../../filters/filters'
import communicatorModule from '../../communicator/communicator'
import 'common/components/interface/slider/slider'
import 'common/components/expert-profile/experts-consultation-slider/experts-consultation-slider'
import {
  UserService} from '../../../services/user/user.service'
import {ClientCallService} from '../../communicator/call-services/client-call.service';

/* @ngInject */
function controller(clientCallService: ClientCallService, userService: UserService, $state: ng.ui.IStateService): void {

  this.startCall = (): void => {
    userService.getUser().then((accountDetails) => {
      if (accountDetails) {
        clientCallService.callServiceId(this.serviceTagsEmployeesTuple.service.id)
      }
    }).catch(() => {
      $state.go('app.login.account')
    })
  }

  this.$onInit = (): void => {
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
  controller,
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
