import * as angular from "angular"
import {UrlService} from "../../../services/url/url.service"
import {CallService} from "../../communicator/call.service"
import communicatorModule from "../../communicator/communicator"
import filtersModule from "../../../filters/filters"
import urlModule from "../../../services/url/url"

/* @ngInject */
function singleConsultationController($state: ng.ui.IStateService, urlService: UrlService,
                                      callService: CallService) {
  this.isLinkActive = true

  this.$onInit = () => {
    this.consultation.price = {
      amount: this.consultation.price,
      currency: 'PLN'
    }

    if (!!this.consultation.owner.img && this.consultation.owner.img !== null) {
      this.profileImage = urlService.resolveFileUrl(this.consultation.owner.img)
    } else {
      this.profileImage = null
    }
  }

  this.onMouseOver = () => {
    this.isLinkActive = false
  }

  this.onMouseLeave = () => {
    this.isLinkActive = true
  }

  this.goToProfile = () => {
    if (this.isLinkActive) {
      const stateName = this.consultation.owner.type === 'ORG' ? 'app.company-profile' : 'app.expert-profile'
      console.log(stateName)
      $state.go(stateName, {profileId: this.consultation.owner.id, primaryConsultationId: this.consultation.id})
    }
  }

  this.startCall = () => {
    callService.callServiceId(this.consultation.id)
  }

  return this
}

let singleConsultation = {
  template: require('./single-consultation.jade')(),
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
