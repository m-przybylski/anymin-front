import * as angular from "angular"
import "./complain-reason/complain-reason"
import "./complain-status/complain-status"

(function() {
  /* @ngInject */
  function controller() {
    this.isComplaint = false

    this.$onInit = () => {
      this.onReasonChange = this.collapseBtn.onWindowResize
    }

    return this
  }

  const component = {
    template: require('./complain.pug')(),
    controller: controller,
    controllerAs: '$ctrl',
    bindings: {
      onComplainOpen: '<'
    },
    require: {
      collapseBtn: '^collapseBtn'
    }
  }

  angular.module('profitelo.components.dashboard.client.activities.modals.consultation-details.complain', [
    'pascalprecht.translate',
    'profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-status',
    'profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-reason'
  ])
    .component('clientComplain', component)
}())

