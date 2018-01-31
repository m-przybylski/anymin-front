import * as angular from 'angular';
import './complain-reason/complain-reason';
import './complain-status/complain-status';

(function (): void {

  function controller(): void {
    this.isComplaint = false;

    this.$onInit = (): void => {
      this.onReasonChange = this.collapseBtn.onWindowResize;
    };

    return this;
  }

  const component = {
    template: require('./complain.html'),
    controller: [controller],
    controllerAs: '$ctrl',
    bindings: {
      onComplainOpen: '<'
    },
    require: {
      collapseBtn: '^collapseBtn'
    }
  };

  angular.module('profitelo.components.dashboard.client.activities.modals.consultation-details.complain', [
    'pascalprecht.translate',
    'profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-status',
    'profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-reason'
  ])
    .component('clientComplain', component);
}());
