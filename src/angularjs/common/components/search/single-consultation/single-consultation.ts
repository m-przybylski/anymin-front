import * as angular from 'angular'
import communicatorModule from '../../communicator/communicator'
import filtersModule from '../../../filters/filters'
import urlModule from '../../../services/url/url'
import './single-consultation.sass'
import {UserService} from '../../../services/user/user.service'
import {ClientCallService} from '../../communicator/call-services/client-call.service';
import {GetSearchRequestResult} from 'profitelo-api-ng/model/models';

export interface ISingleConsultationScope extends ng.IScope {
  isLinkActive: boolean
  consultation: GetSearchRequestResult
}

/* @ngInject */
function singleConsultationController($state: ng.ui.IStateService, clientCallService: ClientCallService,
                                      userService: UserService): void {

  this.isLinkActive = false
  const percentage: number  = 100
  const usageCounter: number = 500

  // TODO Replace mocks by correct values: https://git.contactis.pl/itelo/profitelo/issues/996
  this.rating = percentage
  this.usageCounter = usageCounter

  this.$onInit = (): void => {
    this.serviceName = this.consultation.service.name
    this.ownerName =
      this.consultation.ownerProfile.organizationDetails ? this.consultation.ownerProfile.organizationDetails.name :
        this.consultation.ownerProfile.expertDetails.name
    this.price = this.consultation.service.price
    this.imageToken =
      this.consultation.ownerProfile.organizationDetails  ? this.consultation.ownerProfile.organizationDetails.logo
        : this.consultation.ownerProfile.expertDetails.avatar
  }

  this.goToProfile = (): void => {
    if (!this.isLinkActive) {
      const stateName = this.consultation.ownerProfile.organizationDetails
        ? 'app.company-profile' : 'app.expert-profile'

      $state.go(stateName, {profileId: this.consultation.ownerProfile.id,
        primaryConsultationId: this.consultation.service.id})
    }
  }

  this.onMouseOver = (): void => {
    this.isLinkActive = true
  }

  this.onMouseLeave = (): void => {
    this.isLinkActive = false
  }

  this.startCall = (): void => {
    if (this.isLinkActive) {
      userService.getUser()
      .then(() => clientCallService.callServiceId(this.consultation.service.id),
        () => $state.go('app.login.account'))
    }
  }

  return this
}

const singleConsultation = {
  template: require('./single-consultation.pug'),
  bindings: {
    consultation: '<'
  },
  controller: singleConsultationController
}

angular.module('profitelo.components.search.single-consultation', [
  'ui.router',
  'pascalprecht.translate',
  communicatorModule,
  filtersModule,
  urlModule
])
.component('singleConsultation', singleConsultation)
