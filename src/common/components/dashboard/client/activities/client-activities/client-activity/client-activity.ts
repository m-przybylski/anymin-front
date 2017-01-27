namespace profitelo.components.dashboard.client.activities.clientActivity {

  import IUrlService = profitelo.services.helper.IUrlService
  import IModalsService = profitelo.services.modals.IModalsService
  import ClientActivity = profitelo.models.ClientActivity

  interface IClientActivityComponentBindings {
    activity: ClientActivity
  }

  class ClientActivityComponentController implements ng.IController, IClientActivityComponentBindings {

    public activity: ClientActivity
    public isCallActivity: boolean
    public imageUrl: string

    /* @ngInject */
    constructor(private urlService: IUrlService, private modalsService: IModalsService) {
    }

    $onInit() {
      this.isCallActivity = !!this.activity.sueProfileServiceTuple

      if (angular.isDefined(this.activity) && this.activity.sueProfileServiceTuple &&
        this.activity.sueProfileServiceTuple.profile.expertDetails.avatar &&
        this.activity.sueProfileServiceTuple.profile.expertDetails.avatar !== null) {
        this.imageUrl = this.urlService.resolveFileUrl(this.activity.sueProfileServiceTuple.profile.expertDetails.avatar)
      } else {
        this.imageUrl = null
      }
    }

    public openActivityDescription = () => {
      const sueId = this.activity.sueProfileServiceTuple.serviceUsageEvent.id
      this.modalsService.createClientSUEActivityDetailsModal(sueId)
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