import * as angular from 'angular'
import {UrlService} from '../../../services/url/url.service'
import communicatorModule from '../../communicator/communicator'
import filtersModule from '../../../filters/filters'
import urlModule from '../../../services/url/url'
import './single-consultation.sass'
import {UserService} from '../../../services/user/user.service'
import {ClientCallService} from '../../communicator/call-services/client-call.service';

/* @ngInject */
function singleConsultationController($state: ng.ui.IStateService, urlService: UrlService,
                                      clientCallService: ClientCallService, userService: UserService): void {
  this.isLinkActive = true

  this.$onInit = (): void => {
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

  this.onMouseOver = (): void => {
    this.isLinkActive = false
  }

  this.onMouseLeave = (): void => {
    this.isLinkActive = true
  }

  this.goToProfile = (): void => {
    if (this.isLinkActive) {
      const stateName = this.consultation.owner.type === 'ORG' ? 'app.company-profile' : 'app.expert-profile'
      $state.go(stateName, {profileId: this.consultation.owner.id, primaryConsultationId: this.consultation.id})
    }
  }

  this.startCall = (): void => {
    userService.getUser()
    .then(() => clientCallService.callServiceId(this.consultation.id),
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
