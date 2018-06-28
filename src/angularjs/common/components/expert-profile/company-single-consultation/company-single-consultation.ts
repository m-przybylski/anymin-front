// tslint:disable:no-implicit-dependencies
import * as angular from 'angular';
import urlModule from '../../../services/url/url';
import filtersModule from '../../../filters/filters';
import communicatorModule from '../../communicator/communicator';
import 'angularjs/common/components/interface/slider/slider';
import 'angularjs/common/components/expert-profile/experts-consultation-slider/experts-consultation-slider';
import {
  UserService } from '../../../services/user/user.service';

function controller(userService: UserService, $location: ng.ILocationService): void {

  this.startCall = (): void => {
    userService.getUser().then((accountDetails) => {
      if (accountDetails) {
        alert('Sorry, not implemented');
      }
    }).catch(() => {
      $location.path('/login');
    });
  };

  this.$onInit = (): void => {
    this.tags = this.serviceTagsEmployeesTuple.tags;
    this.experts = this.serviceTagsEmployeesTuple.employees;
  };

  return this;
}

const companySingleConsultation = {
  template: require('./company-single-consultation.html'),
  bindings: {
    serviceTagsEmployeesTuple: '<',
    title: '@'
  },
  controller: ['userService', '$location', controller],
  controllerAs: '$ctrl'
};

angular.module('profitelo.components.expert-profile.company-single-consultation', [
  'profitelo.components.interface.slider',
  urlModule,
  filtersModule,
  'profitelo.components.expert-profile.experts-consultation-slider',
  communicatorModule,
  'pascalprecht.translate'
])
.component('companySingleConsultation', companySingleConsultation);
