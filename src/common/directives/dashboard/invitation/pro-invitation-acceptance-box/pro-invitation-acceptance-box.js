(function() {

    function controllerFunction(EmploymentApi) {

      let _isPending = false

      this.accept = (employmentId) => {

        if (!_isPending) {
          _isPending = true
          EmploymentApi.postEmploymentsAccept({
            employmentId: 1
          }).$promise.then((res) => {
            _isPending = false
            console.log(res)
          }, () => {
            _isPending = false
          })
        }

      }

      this.reject = (employmentId) => {

        if (!_isPending) {
          _isPending = true
          EmploymentApi.postEmploymentsReject({
            employmentId: 1
          }).$promise.then((res) => {
            _isPending = false
            console.log(res)
          }, () => {
            _isPending = false
          })
        }

      }

      return this

    }

  controllerFunction.$inject = ['EmploymentApi']


  let proInvitationAcceptanceBox = {
      templateUrl: 'directives/dashboard/invitation/pro-invitation-acceptance-box/pro-invitation-acceptance-box.tpl.html',
      restrict: 'E',
      replace: true,
      bindings: {
        invitation: '<'
      },
      controller: controllerFunction
    }


  angular.module('profitelo.directives.dashboard.invitation.pro-invitation-acceptance-box', [
    'profitelo.components.pro-summary-tag',
    'profitelo.directives.interface.pro-input',
    'profitelo.swaggerResources'
  ])
    .component('proInvitationAcceptanceBox', proInvitationAcceptanceBox)

}())
