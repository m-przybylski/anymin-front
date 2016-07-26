(function() {

  /* @ngInject */
  function controllerFunction($timeout, EmploymentApi) {

    const _rejectTimeoutTime = 5000

    let _isPending = false
    let _rejectTimeout
    let headerStatus = $(".box-header")

    this.rejectTimeoutSet = false

    this.accept = (employmentId) => {
      headerStatus.addClass("is-accepted")

      if (!_isPending) {
        _isPending = true
        EmploymentApi.postEmploymentsAccept({
          employmentId: employmentId
        }).$promise.then((response) => {
          this.employment = response
          _isPending = false
        }, () => {
          _isPending = false
        })
      }

    }

    this.reject = (employmentId) => {
      headerStatus.addClass("is-rejected")

      let _reject = () => {
        if (!_isPending) {
          _isPending = true
          EmploymentApi.postEmploymentsReject({
            employmentId: employmentId
          }).$promise.then((response) => {
            this.employment = response
            _isPending = false
            this.rejectTimeoutSet = false
          }, () => {
            _isPending = false
            this.rejectTimeoutSet = false
          })
        }
      }

      _rejectTimeout = $timeout(() => {
        _reject()
      }, _rejectTimeoutTime)

      this.rejectTimeoutSet = true

    }

    this.abortRejection = () => {
      headerStatus.removeClass("is-rejected")

      $timeout.cancel(_rejectTimeout)
      this.rejectTimeoutSet = false
    }

    return this

  }

  let proInvitationAcceptanceBox = {
    templateUrl: 'components/dashboard/invitation/pro-invitation-acceptance-box/pro-invitation-acceptance-box.tpl.html',
    restrict: 'E',
    replace: true,
    bindings: {
      invitation: '<',
      employment: '<'
    },
    controller: controllerFunction,
    controllerAs: 'vm'
  }


  angular.module('profitelo.components.dashboard.invitation.pro-invitation-acceptance-box', [
    'profitelo.components.pro-summary-tag',
    'profitelo.swaggerResources'
  ])
    .component('proInvitationAcceptanceBox', proInvitationAcceptanceBox)

}())
