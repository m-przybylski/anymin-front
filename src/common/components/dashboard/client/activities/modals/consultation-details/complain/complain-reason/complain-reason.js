(function() {
  /* @ngInject */
  function controller(modalsService) {
    this.isRadioActive = false

    this.showComplainReasonModal = () => {
      modalsService.createClientComplainReportModal()
    }

    this.complaintReasons = [
      {id: 'id2value', isDescriptive: true, name: 'DASHBOARD.CLIENT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.REASON_INCOPENTENT_EXPERT', description: 'descripiondescripiondescripiondescripion'},
      {id: 'id3value', isDescriptive: false, name: 'DASHBOARD.CLIENT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.REASON_RUDE_EXPERT', description: 'Rude descripion'},
      {id: 'id4value', isDescriptive: true, name: 'DASHBOARD.CLIENT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.REASON_TECHNICAL_PROBLEMS', description: 'Technical descripion'},
      {id: 'id5value', isDescriptive: true, name: 'DASHBOARD.CLIENT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.REASON_OTHER', description: 'Other reason description'}
    ]

    this.isSelected = (item) => {
      return this.isRadioActive === item
    }

    this.isRadioSelected = (item) => {
      this.isRadioActive = item
    }

    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/activities/modals/consultation-details/complain/complain-reason/complain-reason.tpl.html',
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-reason', [
    'pascalprecht.translate',
    'profitelo.services.modals',
    'profitelo.components.interface.radio-text',
    'profitelo.components.interface.radio',

  ])
    .component('clientComplainReason', component)
}())

