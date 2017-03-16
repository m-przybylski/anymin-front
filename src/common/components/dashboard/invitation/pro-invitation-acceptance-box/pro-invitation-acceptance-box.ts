import * as angular from "angular"
import apiModule from "profitelo-api-ng/api.module"
import {EmploymentApi} from "profitelo-api-ng/api/api"
import {Tag} from "profitelo-api-ng/model/models"

  function controllerFunction($timeout: ng.ITimeoutService, $scope: ng.IScope, EmploymentApi: EmploymentApi) {

    let _isPending = false
    let _rejectTimeout: ng.IPromise<any>

    const _rejectTimeoutTime = 5000

    this.accept = (employmentId: string) => {
      this.isAccepted = true

      if (!_isPending) {
        _isPending = true
        EmploymentApi.postEmploymentsAcceptRoute(employmentId).then((response) => {
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
          EmploymentApi.postEmploymentsRejectRoute(employmentId).then((response) => {
            this.employment = response
            _isPending = false
            this.rejectTimeoutSet = false
          }, (_err) => {
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
          if (angular.isDefined(newVal)) {
            newVal.details.tagNames = newVal.details.tags.map((tag: Tag) => tag.name)
          }
        }, true)
    }

    return this
  }

  let proInvitationAcceptanceBox = {
    template: require('./pro-invitation-acceptance-box.pug')(),
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
    apiModule
  ])
  .component('proInvitationAcceptanceBox', proInvitationAcceptanceBox)
