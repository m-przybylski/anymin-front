import * as angular from 'angular'
import {UrlService} from '../../../services/url/url.service'
import {CallService} from '../../communicator/call.service'
import communicatorModule from '../../communicator/communicator'
import filtersModule from '../../../filters/filters'
import urlModule from '../../../services/url/url'
import './single-consultation.sass'
import {UserService} from '../../../services/user/user.service'

/* @ngInject */
function singleConsultationController($state: ng.ui.IStateService, urlService: UrlService,
                                      callService: CallService, userService: UserService) {
  this.isLinkActive = true

  this.$onInit = () => {
    this.consultation.price = {
      amount: this.consultation.price * 1.23, // FIXME after ux tests
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
      $state.go(stateName, {profileId: this.consultation.owner.id, primaryConsultationId: this.consultation.id})
    }
  }

  this.startCall = () => {
    userService.getUser()
    .then(() => callService.callServiceId(this.consultation.id),
      () => $state.go('app.login.account'))
  }

  return this
}

const singleConsultation = {
  template: require('./single-consultation.pug')(),
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
