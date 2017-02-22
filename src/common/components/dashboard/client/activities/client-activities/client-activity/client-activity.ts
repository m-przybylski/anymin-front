namespace profitelo.components.dashboard.client.activities.clientActivity {

  import IUrlService = profitelo.services.helper.IUrlService
  import IModalsService = profitelo.services.modals.IModalsService
  import GetActivity = profitelo.api.GetActivity

  interface IClientActivityComponentBindings {
    activity: GetActivity
  }

  class ClientActivityComponentController implements ng.IController, IClientActivityComponentBindings {

    public activity: GetActivity
    public isCallActivity: boolean
    public imageUrl: string | null

    /* @ngInject */
    constructor(private urlService: IUrlService, private modalsService: IModalsService, private $log: ng.ILogService) {
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
        this.modalsService.createClientChargeDetailsModal(this.activity.financialOperation)
      }

    }
  }

  class ClientActivityComponent implements ng.IComponentOptions {
    templateUrl: string = 'components/dashboard/client/activities/client-activities/client-activity/client-activity.tpl.html'
    controller: ng.Injectable<ng.IControllerConstructor> = ClientActivityComponentController
    controllerAs: string = '$ctrl'
    bindings: {[boundProperty: string]: string} = {
      activity: '<'
    }
  }

  angular.module('profitelo.components.dashboard.client.activities.client-activity', [
    'pascalprecht.translate',
    'profitelo.services.url',
    'profitelo.filters.money',
    'profitelo.services.modals',
    'profitelo.components.complaints.status'
  ])
  .component('clientActivity', new ClientActivityComponent())
}
