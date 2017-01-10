(function() {
  /* @ngInject */
  function controller(HelperService, modalsService) {

    this.$onInit = () => {
      this.isCallActivity = !!this.activity.sueProfileServiceTuple

      if (angular.isDefined(this.activity) && this.activity.sueProfileServiceTuple &&
          this.activity.sueProfileServiceTuple.profile.expertDetails.avatar &&
          this.activity.sueProfileServiceTuple.profile.expertDetails.avatar !== null) {
        this.imageUrl = HelperService.fileUrlResolver(this.activity.sueProfileServiceTuple.profile.expertDetails.avatar)
      } else {
        this.imageUrl = null
      }
    }

    this.openActivityDescription = () => {
      modalsService.createClientSUEActivityDetailsModal(this.activity.sueProfileServiceTuple.serviceUsageEvent.id)
    }

    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/activities/client-activities/client-activity/client-activity.tpl.html',
    controller: controller,
    controllerAs: '$ctrl',
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
    .component('clientActivity', component)
}())
