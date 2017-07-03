import {
  GetProfileWithServicesEmployments,
  GetServiceWithEmployments, GetEmployment
} from 'profitelo-api-ng/model/models'
import {EmploymentApi} from 'profitelo-api-ng/api/api'
export interface IInvitationsModalScope extends ng.IScope {
  profileWithServiceEmployments?: GetProfileWithServicesEmployments
}
import * as _ from 'lodash'

export class InvitationsModalController implements ng.IController {
  public isFullscreen: boolean = true
  public isNavbar: boolean = true
  public areInvitations: boolean = true

  public companyName?: string
  public logo?: string
  public description?: string
  public services: GetServiceWithEmployments[] = []

  public onModalClose = () => {
    this.$uibModalInstance.dismiss('cancel')
    this.$state.go('app.home')

  }
  private acceptedServices: GetServiceWithEmployments[] = []

  /* @ngInject */
  constructor(private $state: ng.ui.IStateService, private $uibModalInstance: ng.ui.bootstrap.IModalInstanceService,
              private EmploymentApi: EmploymentApi, $scope: IInvitationsModalScope) {
    if ($scope.profileWithServiceEmployments && $scope.profileWithServiceEmployments.organizationDetails) {
      $scope.profileWithServiceEmployments.services.forEach((service) => {
        if (service.employments[0].status === GetEmployment.StatusEnum.NEW) {
          this.services.push(service)
        }
      })
      this.companyName = $scope.profileWithServiceEmployments.organizationDetails.name
      this.logo = $scope.profileWithServiceEmployments.organizationDetails.logo
      this.description = $scope.profileWithServiceEmployments.organizationDetails.description
    }
    this.areInvitations = !!($scope.profileWithServiceEmployments && this.services.length > 0)
  }

  public onSelectConsultation = (service: GetServiceWithEmployments, isUnchecked: boolean) => {
    if (!isUnchecked) {
      this.acceptedServices.push(service)
    } else {
      _.remove(this.acceptedServices, service)
    }
  }

  public acceptInvitations = () => {
    this.services.forEach((service) => {
      if (_.some(this.acceptedServices, service)) {
        this.EmploymentApi.postEmploymentsAcceptRoute(service.employments[0].id)
        .then((_response) => (this.onEmploymentUpdateDone(service)))
      } else {
        this.EmploymentApi.postEmploymentsRejectRoute(service.employments[0].id)
        .then((_response) => (this.onEmploymentUpdateDone(service)))
      }
    })
  }

  private onEmploymentUpdateDone = (service: GetServiceWithEmployments) => {
    if (_.last(this.services) === service) {
      this.onModalClose()
    }
  }

}
