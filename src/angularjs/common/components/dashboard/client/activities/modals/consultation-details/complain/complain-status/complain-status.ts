// tslint:disable:no-invalid-this
// tslint:disable:no-import-side-effect
import * as angular from 'angular';
import '../../../../../../../../components/complaints/status/status';

(function (): void {

  function controller(): void {

    return this;
  }

  const component = {
    template: require('./complain-status.html'),
    controller: [controller],
    controllerAs: '$ctrl',
    bindings: {
      complainMessage: '@'
    }
  };

  angular.module(
    'profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-status', [
      'pascalprecht.translate',
      'profitelo.components.complaints.status'
    ])
    .component('clientComplainStatus', component);
}());
