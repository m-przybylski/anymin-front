(function() {
  /* @ngInject */
  function controller(modalsService) {

    this.showConsultationDetails = () => {
      modalsService.createClientConversationSummaryModal()
    }


    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/activities/last-activities/last-activities-list/last-activities-list.tpl.html',
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.client.activities.last-activities.last-activities-list', [
    'pascalprecht.translate',
    'profitelo.services.modals',
    'profitelo.components.complaints.status'
  ])
    .component('clientLastActivitiesList', component)
}())
