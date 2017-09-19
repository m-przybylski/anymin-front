import {
  GetInvitation, GetService
} from 'profitelo-api-ng/model/models'
import {InvitationApi, ProfileApi} from 'profitelo-api-ng/api/api'
export interface IInvitationsModalScope extends ng.IScope {
  invitation?: GetInvitation
}
import * as _ from 'lodash'

export class InvitationsModalController implements ng.IController {
  public isFullscreen: boolean = true
  public isNavbar: boolean = true
  public areInvitations: boolean = true

  public companyName?: string
  public logo?: string
  public description?: string
  public services: GetService[] = []

  private invitationId: string

  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel')
    this.$state.go('app.home')

  }
  private acceptedServices: GetService[] = []

  /* @ngInject */
  constructor(private $state: ng.ui.IStateService, private $uibModalInstance: ng.ui.bootstrap.IModalInstanceService,
              private InvitationApi: InvitationApi, $scope: IInvitationsModalScope, ProfileApi: ProfileApi) {
    if ($scope.invitation) {
      this.invitationId = $scope.invitation.id
      ProfileApi.getProfileRoute($scope.invitation.companyId).then((response) => {
        if (response.organizationDetails) {
          this.companyName = response.organizationDetails.name
          this.logo = response.organizationDetails.logo
          this.description = response.organizationDetails.description
        }
      })
      this.areInvitations = true
    }
  }

  public onSelectConsultation = (service: GetService, isUnchecked: boolean): void => {
    if (!isUnchecked) {
      this.acceptedServices.push(service)
    } else {
      _.remove(this.acceptedServices, service)
    }
  }

  public acceptInvitations = (): void => {
    this.services.forEach((service) => {
      if (_.some(this.acceptedServices, service)) {
        this.InvitationApi.postInvitationAcceptRoute(this.invitationId)
        .then((_response) => (this.onEmploymentUpdateDone(service)))
      } else {
        this.InvitationApi.postInvitationRejectRoute(this.invitationId)
        .then((_response) => (this.onEmploymentUpdateDone(service)))
      }
    })
  }

  private onEmploymentUpdateDone = (service: GetService): void => {
    if (_.last(this.services) === service) {
      this.onModalClose()
    }
  }

}
