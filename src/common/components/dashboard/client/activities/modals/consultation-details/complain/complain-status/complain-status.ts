import * as angular from "angular"
import "../../../../../../../../components/complaints/status/status"

(function() {
  /* @ngInject */
  function controller() {

    return this
  }

  const component = {
    template: require('./complain-status.pug')(),
    controller: controller,
    controllerAs: '$ctrl',
    bindings: {
      complainMessage: '@'
    }
  }

  angular.module('profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-status', [
    'pascalprecht.translate',
    'profitelo.components.complaints.status'
  ])
    .component('clientComplainStatus', component)
}())

