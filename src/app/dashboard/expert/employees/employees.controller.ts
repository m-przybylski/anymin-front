import {EmploymentApi, ServiceApi} from 'profitelo-api-ng/api/api'
import {GetProfileDetailsWithEmployments, GetServiceWithInvitations, GetInvitation}
  from 'profitelo-api-ng/model/models';
import {UserService} from '../../../../common/services/user/user.service'
import {ModalsService} from '../../../../common/services/modals/modals.service'
import * as _ from 'lodash'

export class DashboardExpertEmployeesController {

  public profilesWithEmployments: GetProfileDetailsWithEmployments[]
  public areEmployeesLoading: boolean = true
  public isEmployeesError: boolean = false
  public arePendingInvitationsLoading: boolean = true
  public isPendingInvitationsError: boolean = false
  public areEmployees: boolean = false
  public arePendingInvitations: boolean = false
  public pendingInvitations: GetInvitation[][]
  public dupa = false
  private userId: string
  private servicesId: string[] = []

  /* @ngInject */
  constructor(private EmploymentApi: EmploymentApi,
              private userService: UserService,
              private modalsService: ModalsService,
              private $log: ng.ILogService,
              private ServiceApi: ServiceApi) {
  }

  $onInit = (): void => {
    this.userService.getUser().then(user => {
      this.userId = user.id
      this.getProfilesWithEmployments()
      this.getServicesInvitations()
    })
  }

  public getProfilesWithEmployments = (): void => {
      this.EmploymentApi.getEmployeesRoute().then(profilesWithEmployments => {
        this.profilesWithEmployments = profilesWithEmployments.filter(profileWithEmployments =>
          profileWithEmployments.expertProfile.id !== this.userId
        )
        this.areEmployees = this.profilesWithEmployments.length > 0
        this.isEmployeesError = false
      }).catch((error) => {
        this.isEmployeesError = true
        this.$log.error('Cannot load data', error)
      }).finally(() => {
        this.areEmployeesLoading = false
      })
  }

  public getServicesInvitations = (): void => {
    this.ServiceApi.getProfileServicesRoute(this.userId).then(services => {
      this.servicesId = services.map(service => service.id)
      this.getServiceWithInvitations(this.servicesId)
      this.isPendingInvitationsError = false
    }).catch((error) => {
      this.arePendingInvitationsLoading = false
      this.isPendingInvitationsError = true
      this.$log.error('Cannot load data', error)
    })
  }

  public openInviteEmployeesModal = (): void => {
    this.modalsService.createExpertInviteEmployeesModal()
  }

  public onDeleteCallback = (): void => {
    this.areEmployees = this.profilesWithEmployments.length - 1 > 0
    this.arePendingInvitations = this.pendingInvitations.length - 1 > 0
  }

  private getServiceWithInvitations = (servicesId: string[]): void => {
    this.ServiceApi.postServiceInvitationsRoute({serviceIds: servicesId}).then(servicesWithInvitations => {
      this.groupInvitations(servicesWithInvitations)
    }).catch((error) => {
      this.isPendingInvitationsError = true
      this.$log.error('Cannot load data', error)
    }).finally(() => {
      this.arePendingInvitationsLoading = false
    })
  }

  private groupInvitations = (servicesWithInvitations: GetServiceWithInvitations[]): void => {
    const invitationsByEmail = _.flatMap(servicesWithInvitations, (service) =>
      service.invitations.filter(invitation => invitation.status === GetInvitation.StatusEnum.NEW &&
        invitation.email !== undefined))
    const groupedByEmail = _.groupBy(invitationsByEmail, e => e.email)
    const invitationsGroupedByEmail = _.values(groupedByEmail)

    const invitationsByMsisdn =  _.flatMap(servicesWithInvitations, (service) =>
      service.invitations.filter(invitation => invitation.status === GetInvitation.StatusEnum.NEW &&
        invitation.msisdn !== undefined))
    const groupedByMsisdn = _.groupBy(invitationsByMsisdn, e => e.msisdn)
    const invitationsGroupedByMsisdn = _.values(groupedByMsisdn)

    this.pendingInvitations = invitationsGroupedByEmail.concat(invitationsGroupedByMsisdn)
    this.arePendingInvitations = this.pendingInvitations.length > 0
  }

}
