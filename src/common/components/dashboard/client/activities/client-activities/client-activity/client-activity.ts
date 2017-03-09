import modalsModule from "../../../../../../services/modals/modals"
import * as angular from "angular"
import {GetActivity} from "../../../../../../api/model/GetActivity"
import {ModalsService} from "../../../../../../services/modals/modals.service"
import {UrlService} from "../../../../../../services/url/url.service"
import urlModule from "../../../../../../services/url/url"
import filtersModule from "../../../../../../filters/filters"
import "common/components/complaints/status/status"

interface IClientActivityComponentBindings {
  activity: GetActivity
}

class ClientActivityComponentController implements ng.IController, IClientActivityComponentBindings {

  public activity: GetActivity
  public isCallActivity: boolean
  public imageUrl: string | null

  /* @ngInject */
  constructor(private urlService: UrlService, private modalsService: ModalsService, private $log: ng.ILogService) {
  }

  $onInit() {
    this.isCallActivity = !!this.activity.sueProfileServiceTuple

    if (angular.isDefined(this.activity) && this.activity.sueProfileServiceTuple &&
      this.activity.sueProfileServiceTuple.profile.expertDetails &&
      this.activity.sueProfileServiceTuple.profile.expertDetails.avatar) {
      this.imageUrl = this.urlService.resolveFileUrl(this.activity.sueProfileServiceTuple.profile.expertDetails.avatar)
    } else {
      this.imageUrl = null
    }
  }

  public openActivityDescription = () => {

    if (this.isCallActivity) {
      const sueId = this.activity.sueProfileServiceTuple!.serviceUsageEvent.id
      if (sueId) {
        this.modalsService.createClientSUEActivityDetailsModal(sueId)
      }
      else {
        this.$log.error('Activity SUE is undefined')
      }
    } else {
      this.modalsService.createClientChargeDetailsModal(<any>this.activity.financialOperation)
    }

  }
}

class ClientActivityComponent implements ng.IComponentOptions {
  template = require('./client-activity.jade')()
  controller: ng.Injectable<ng.IControllerConstructor> = ClientActivityComponentController
  controllerAs: string = '$ctrl'
  bindings: {[boundProperty: string]: string} = {
    activity: '<'
  }
}

angular.module('profitelo.components.dashboard.client.activities.client-activity', [
  'pascalprecht.translate',
  urlModule,
  filtersModule,
  modalsModule,
  'profitelo.components.complaints.status'
])
  .component('clientActivity', new ClientActivityComponent())
