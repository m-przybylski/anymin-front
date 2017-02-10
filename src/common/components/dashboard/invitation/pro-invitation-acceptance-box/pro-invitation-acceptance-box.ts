namespace profitelo.components.dashboard.invitation.proInvitationAcceptanceBox {

  /* @ngInject */
  import Tag = profitelo.models.Tag
  function controllerFunction($timeout: ng.ITimeoutService, $scope: ng.IScope, EmploymentApi: any) {

    let _isPending = false
    let _rejectTimeout: ng.IPromise<any>

    const _rejectTimeoutTime = 5000

    this.accept = (employmentId: string) => {
      this.isAccepted = true

      if (!_isPending) {
        _isPending = true
        EmploymentApi.postEmploymentsAccept({
          employmentId: employmentId
        }).$promise.then((response: any) => {
          this.employment = response
          _isPending = false
        }, () => {
          _isPending = false
        })
      }
    }

    this.reject = (employmentId: string) => {
      this.isRejected = true

      let _reject = () => {
        if (!_isPending) {
          _isPending = true
          EmploymentApi.postEmploymentsReject({
            employmentId: employmentId
          }).$promise.then((response: any) => {
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
      this.isRejected = false
      this.isAccepted = false

      $timeout.cancel(_rejectTimeout)
      this.rejectTimeoutSet = false
    }

    this.isRejected = false
    this.isAccepted = false
    this.rejectTimeoutSet = false

    this.$onInit = () => {

      $scope.$watch(
        () => this.invitation,
        (newVal) => {
          /* istanbul ignore next if*/
          if (angular.isDefined(newVal)) {
            newVal.details.tagNames = newVal.details.tags.map((tag: Tag) => tag.name)
          }
        }, true)
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

}
