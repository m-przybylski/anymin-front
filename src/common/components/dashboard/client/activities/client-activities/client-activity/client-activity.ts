module profitelo.components.dashboard.client.activities.clientActivity {

  import IHelperService = profitelo.services.helper.IHelperService
  import IModalsService = profitelo.services.modals.IModalsService

  interface IClientActivityComponentBindings {
    activity: ClientActivity
  }

  class ClientActivityComponentController implements ng.IController, IClientActivityComponentBindings {

    activity: ClientActivity
    isCallActivity: boolean
    imageUrl: string

    /* @ngInject */
    constructor(private helperService: IHelperService, private modalsService: IModalsService) {
    }

    $onInit = () => {
      this.isCallActivity = !!this.activity.sueProfileServiceTuple

      if (angular.isDefined(this.activity) && this.activity.sueProfileServiceTuple &&
        this.activity.sueProfileServiceTuple.profile.expertDetails.avatar &&
        this.activity.sueProfileServiceTuple.profile.expertDetails.avatar !== null) {
        this.imageUrl = this.helperService.fileUrlResolver(this.activity.sueProfileServiceTuple.profile.expertDetails.avatar)
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
    controllerAs: '$ctrl'
    bindings: {
      activity: '<'
    }
  }

  angular.module('profitelo.components.dashboard.client.activities.client-activity', [
    'pascalprecht.translate',
    'profitelo.services.helper',
    'profitelo.filters.money',
    'profitelo.services.modals',
    'profitelo.components.complaints.status'
  ])
    .component('clientActivity', new ClientActivityComponent)
}