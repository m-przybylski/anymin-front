(function() {
  /*@ngInject*/
  function controllerFunction($scope, EmploymentApi, DialogService, AppServiceProviderImageResolver) {

    let _isPending = false

    this.accept = (employmentId) => {

      if (!_isPending) {
        _isPending = true
        EmploymentApi.postEmploymentsAccept({
          employmentId: employmentId
        }).$promise.then((res) => {
          _isPending = false
        }, () => {
          _isPending = false
        })
      }

    }

    this.reject = (employmentId) => {


      ((id) => {
        let _employmentId = id

        this.postEmploymentsReject = () => {
          if (!_isPending) {
            _isPending = true
            EmploymentApi.postEmploymentsReject({
              employmentId: _employmentId
            }).$promise.then((res) => {
              _isPending = false
            }, () => {
              _isPending = false
            })
          }
        }
        
      })(employmentId)

      DialogService.openDialog({
        scope: $scope,
        controller: 'proInvitationAcceptanceBoxModalController',
        templateUrl: 'components/dashboard/invitation/pro-invitation-acceptance-box/pro-invitation-acceptance-box-modal-controller.tpl.html'
      })



    }

    return this

  }

  let proInvitationAcceptanceBox = {
    templateUrl: 'components/dashboard/invitation/pro-invitation-acceptance-box/pro-invitation-acceptance-box.tpl.html',
    restrict: 'E',
    replace: true,
    bindings: {
      invitation: '<'
    },
    controller: controllerFunction,
    controllerAs: 'vm'
  }


  angular.module('profitelo.components.dashboard.invitation.pro-invitation-acceptance-box', [
    'profitelo.components.pro-summary-tag',
    'profitelo.directives.interface.pro-input',
    'profitelo.components.dashboard.invitation.pro-invitation-acceptance-box-modal-controller',
    'profitelo.swaggerResources',
    'profitelo.services.dialog-service'
  ])
    .component('proInvitationAcceptanceBox', proInvitationAcceptanceBox)

}())
