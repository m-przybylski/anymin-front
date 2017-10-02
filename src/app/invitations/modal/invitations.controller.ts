import {
  GetInvitation, GetServiceWithInvitations, GetServiceTags, Tag, GetProfileWithServicesInvitations
} from 'profitelo-api-ng/model/models'
import {InvitationApi, ServiceApi} from 'profitelo-api-ng/api/api'
export interface IInvitationsModalScope extends ng.IScope {
  invitation?: GetInvitation,
  profileWithServicesInvitations?: GetProfileWithServicesInvitations
}
import * as _ from 'lodash'
import {UserService} from '../../../common/services/user/user.service'
import {LocalStorageWrapper} from '../../../common/classes/local-storage-wrapper/localStorageWrapper'

export interface IGetServiceWithInvitationsAndTags extends GetServiceWithInvitations {
  tags?: Tag[]
}

export class InvitationsModalController implements ng.IController {
  public isFullscreen: boolean = true
  public isNavbar: boolean = true
  public areInvitations: boolean = true

  public companyName?: string
  public logo?: string
  public description?: string
  public services: IGetServiceWithInvitationsAndTags[] = []
  public isLoading: boolean = true
  public isDisabled: boolean = false
  private servicesTags: GetServiceTags[] = []

  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel')
    if (this.$scope.invitation) this.$state.go('app.home')
  }
  private acceptedServices: GetServiceWithInvitations[] = []

  /* @ngInject */
  constructor(private $state: ng.ui.IStateService,
              private $uibModalInstance: ng.ui.bootstrap.IModalInstanceService,
              private InvitationApi: InvitationApi,
              private userService: UserService,
              private ServiceApi: ServiceApi,
              private $scope: IInvitationsModalScope,
              private $q: ng.IQService,
              private $log: ng.ILogService) {
    if ($scope.profileWithServicesInvitations) {
      this.setInvitationData($scope.profileWithServicesInvitations)
    }

    if (this.services && this.services.length > 0) this.areInvitations = true
  }

  private setInvitationData = (profileWithServicesInvitations?: GetProfileWithServicesInvitations): void => {
    if (profileWithServicesInvitations && profileWithServicesInvitations.organizationDetails) {
      this.companyName = profileWithServicesInvitations.organizationDetails.name
      this.logo = profileWithServicesInvitations.organizationDetails.logo
      this.description = profileWithServicesInvitations.organizationDetails.description

      this.services = profileWithServicesInvitations.services.filter((service) =>
      service.invitations[0].status === GetInvitation.StatusEnum.NEW)

      this.ServiceApi.postServicesTagsRoute({
        serviceIds: this.services.map((service) => service.id)
      }).then((serviceTags) => {
        this.servicesTags = serviceTags
      })

      this.getServicesTags(this.services)
      this.isLoading = false
    }
  }

  public onSelectConsultation = (service: GetServiceWithInvitations, isUnchecked: boolean): void => {
    if (!isUnchecked) {
      this.acceptedServices.push(service)
    } else {
      _.remove(this.acceptedServices, service)
    }
  }

  public processInvitationState = (): void => {
    this.userService.getUser().then((user) => {
      if (user.isExpert) {
        this.postInvitationsState(this.services)
      } else if (this.acceptedServices && this.acceptedServices.length > 0) {
        this.rejectInvitations(this.services, this.redirectToWizards)
      } else {
        this.rejectInvitations(this.services, this.onModalClose)
      }
    })
  }

  public getServicesTags = (services: IGetServiceWithInvitationsAndTags[]): void => {
    services.forEach((service) => {
      const serviceTags = _.find(this.servicesTags, (serviceTags) => service.id === serviceTags.serviceId)
      if (serviceTags) {
        service.tags = serviceTags.tags
      }
    })
  }

  private postInvitationsState = (services: GetServiceWithInvitations[]): void => {
    services.forEach((service) => {
      if (_.some(this.acceptedServices, service)) {
        this.InvitationApi.postInvitationAcceptRoute(service.invitations[0].id)
        .then((_response) => (this.onEmploymentUpdateDone(service)))
      } else {
        this.InvitationApi.postInvitationRejectRoute(service.invitations[0].id)
        .then((_response) => (this.onEmploymentUpdateDone(service)))
      }
    })
  }

  private rejectInvitations = (services: GetServiceWithInvitations[], callback: () => void): void => {
    this.isDisabled = true
    const rejectedServices = services.filter((service) => !_.some(this.acceptedServices, service))
    if (rejectedServices && rejectedServices.length > 0)
      this.$q.all(rejectedServices.map((service) =>
        this.InvitationApi.postInvitationRejectRoute(service.invitations[0].id)))
      .then(callback)
      .catch((error) => {
        this.$log.error(error)
      })
      .finally(() => {
        this.isDisabled = false
      })
    else
      callback()
  }

  private redirectToWizards = (): void => {
    LocalStorageWrapper.setItem('accepted-consultations', JSON.stringify(this.acceptedServices))
    this.$state.go('app.wizard.create-profile.expert')
    this.$uibModalInstance.dismiss('cancel')
  }

  private onEmploymentUpdateDone = (service: GetServiceWithInvitations): void => {
    if (_.last(this.services) === service) {
      this.onModalClose()
    }
  }

}
