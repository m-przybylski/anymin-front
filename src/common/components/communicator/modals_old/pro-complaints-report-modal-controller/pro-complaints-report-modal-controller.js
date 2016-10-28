(function() {

  function proComplaintsReportModalController($scope, $uibModalInstance, $state) {

    this.goToSearchList = () => {
      $uibModalInstance.dismiss('cancel')
      $state.go('app.dashboard.start')
    }


    return this
  }



  angular.module('profitelo.components.communicator.modals.pro-complaints-report-modal-controller', [
    'profitelo.swaggerResources',
    'profitelo.services.service-provider-state',
    'ui.bootstrap'

  ])
    .controller('proComplaintsReportModalController', proComplaintsReportModalController)


}())
