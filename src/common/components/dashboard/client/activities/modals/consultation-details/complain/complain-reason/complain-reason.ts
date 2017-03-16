import * as angular from "angular"
import {ModalsService} from "../../../../../../../../services/modals/modals.service"
import "../../../../../../../../components/interface/radio-text/radio-text"
import "../../../../../../../../components/interface/radio/radio"
import "../../../../../../../../services/modals/modals"

/* @ngInject */
function controller(modalsService: ModalsService) {
  this.isRadioActive = false

  this.showComplainReasonModal = () => {
    if (angular.isFunction(this.onComplainOpen)) {
      this.onComplainOpen()
    }
    modalsService.createClientComplainReportModal()
  }

  this.complaintReasons = [
    {
      id: 'id2value',
      isDescriptive: true,
      name: 'DASHBOARD.CLIENT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.REASON_INCOPENTENT_EXPERT',
      description: 'descripiondescripiondescripiondescripion'
    },
    {
      id: 'id3value',
      isDescriptive: false,
      name: 'DASHBOARD.CLIENT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.REASON_RUDE_EXPERT',
      description: 'Rude descripion'
    },
    {
      id: 'id4value',
      isDescriptive: true,
      name: 'DASHBOARD.CLIENT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.REASON_TECHNICAL_PROBLEMS',
      description: 'Technical descripion'
    },
    {
      id: 'id5value',
      isDescriptive: true,
      name: 'DASHBOARD.CLIENT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.REASON_OTHER',
      description: 'Other reason description'
    }
  ]

  this.isSelected = (item: any) => {
    return this.isRadioActive === item
  }

  this.isRadioSelected = (item: any) => {
    this.onReasonChange()
    this.isRadioActive = item
  }

  return this
}

const component = {
  template: require('./complain-reason.pug')(),
  controller: controller,
  controllerAs: '$ctrl',
  bindings: {
    onReasonChange: '<',
    onComplainOpen: '<'
  }
}

angular.module('profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-reason', [
  'pascalprecht.translate',
  'profitelo.services.modals',
  'profitelo.components.interface.radio-text',
  'profitelo.components.interface.radio',

])
  .component('clientComplainReason', component)
