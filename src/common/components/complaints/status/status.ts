(function() {
  /* @ngInject */
  function controller() {
    this.isStatusAccepted = true
    this.isStatusInProgress = false
    this.isStatusReported = false
    this.isStatusRejected = false

    return this
  }

  const component = {
    templateUrl: 'components/complaints/status/status.tpl.html',
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.complaints.status', [
    'pascalprecht.translate'
  ])
    .component('status', component)
}())
