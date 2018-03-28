import { EmploymentApi, ServiceApi } from 'profitelo-api-ng/api/api';
import {
  GetServiceWithInvitations, GetInvitation
}
  from 'profitelo-api-ng/model/models';
import { UserService } from '../../../../common/services/user/user.service';
import { ModalsService } from '../../../../common/services/modals/modals.service';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { GetProfileDetailsWithEmployments, GetServiceWithEmployees } from '@anymind-ng/api';
import { GetEmployment } from '@anymind-ng/api/model/getEmployment';

// tslint:disable:member-ordering

export class DashboardExpertEmployeesController {

  public profilesWithEmployments: GetProfileDetailsWithEmployments[];
  public areEmployeesLoading = true;
  public isGetEmployeesError = false;
  public arePendingInvitationsLoading = true;
  public isPendingInvitationsError = false;
  public areEmployees = false;
  public arePendingInvitations = false;
  public pendingInvitations: GetInvitation[][];

  private userId: string;
  private servicesId: string[] = [];
  private pendingInvitationsCount: number;
  private emoloyeesCount: number;

  public static $inject = ['EmploymentApi', 'userService', 'modalsService', '$log', 'ServiceApi'];

  constructor(private EmploymentApi: EmploymentApi,
              private userService: UserService,
              private modalsService: ModalsService,
              private $log: ng.ILogService,
              private ServiceApi: ServiceApi) {
  }

  public $onInit = (): void => {
    this.userService.getUser().then(user => {
      this.userId = user.id;
      this.getProfilesWithEmployments();
      this.getServicesInvitations();
    });
  }

  public getProfilesWithEmployments = (): void => {
    this.EmploymentApi.getEmployeesRoute().then(profilesWithEmployments => {

      const employeesServicesList = _.flatMap(profilesWithEmployments, (employments) =>
        _.flatMap(employments.employments, (serviceId) =>
          serviceId.serviceId
        )
      );

      this.ServiceApi.postServiceWithEmployeesRoute({serviceIds: employeesServicesList})
        .then((res: GetServiceWithEmployees[]) => {
          this.profilesWithEmployments = profilesWithEmployments.filter(profileWithEmployments =>
            profileWithEmployments.expertProfile.id !== this.userId
          );

          this.profilesWithEmployments.map((profilesWithEmployment: GetProfileDetailsWithEmployments) =>
            profilesWithEmployment.employments =
              profilesWithEmployment.employments.map((employee: GetEmployment) => {
                const serviceWithEmployees = _.find(res, (serviceWithEmployee: GetServiceWithEmployees) =>
                  serviceWithEmployee.serviceDetails.id === employee.serviceId);

                if (serviceWithEmployees) {
                  return {
                    id: employee.id,
                    serviceId: employee.serviceId,
                    profileId: employee.profileId,
                    createdAt: employee.createdAt,
                    serviceName: serviceWithEmployees.serviceDetails.name
                  };
                } else {
                  return {
                    id: employee.id,
                    serviceId: employee.serviceId,
                    profileId: employee.profileId,
                    createdAt: employee.createdAt
                  };
                }
              }
            ));

          this.emoloyeesCount = this.profilesWithEmployments.length;
          this.areEmployees = this.emoloyeesCount > 0;
          this.isGetEmployeesError = false;
        }).catch((error) => {
        this.isGetEmployeesError = true;
        this.$log.error('Cannot load data', error);
      });
    }).catch((error) => {
      this.isGetEmployeesError = true;
      this.$log.error('Cannot load data', error);
    }).finally(() => {
      this.areEmployeesLoading = false;
    });
  }

  public getServicesInvitations = (): void => {
    this.arePendingInvitationsLoading = true;
    this.ServiceApi.getProfileServicesRoute(this.userId).then(services => {
      this.servicesId = services.map(service => service.id);
      this.postServiceWithInvitations(this.servicesId);
      this.isPendingInvitationsError = false;
    }).catch((error) => {
      this.arePendingInvitationsLoading = false;
      this.isPendingInvitationsError = true;
      this.$log.error('Cannot load data', error);
    });
  }

  public openInviteEmployeesModal = (): void => {
    this.modalsService.createExpertInviteEmployeesModal(this.getServicesInvitations);
  }

  public onDeleteInvitationsCallback = (): void => {
    this.pendingInvitationsCount -= 1;
    this.arePendingInvitations = this.pendingInvitationsCount > 0;
  }

  public onDeleteEmploymentsCallback = (): void => {
    this.emoloyeesCount -= 1;
    this.areEmployees = this.emoloyeesCount > 0;
  }

  public isNoResultsInformation = (): boolean =>
    this.areEmployees || this.arePendingInvitations || this.isGetEmployeesError || this.isPendingInvitationsError

  private postServiceWithInvitations = (servicesId: string[]): void => {
    this.ServiceApi.postServiceInvitationsRoute({serviceIds: servicesId}).then(servicesWithInvitations => {
      this.groupInvitations(servicesWithInvitations);
    }).catch((error) => {
      this.isPendingInvitationsError = true;
      this.$log.error('Cannot load data', error);
    }).finally(() => {
      this.arePendingInvitationsLoading = false;
    });
  }

  private groupInvitations = (servicesWithInvitations: GetServiceWithInvitations[]): void => {
    const invitationsByEmail = _.flatMap(servicesWithInvitations, (service) =>
      service.invitations.filter(invitation => invitation.status === GetInvitation.StatusEnum.NEW &&
        invitation.email !== undefined));
    const groupedByEmail = _.groupBy(invitationsByEmail, e => e.email);
    const invitationsGroupedByEmail = _.values(groupedByEmail);

    const invitationsByMsisdn = _.flatMap(servicesWithInvitations, (service) =>
      service.invitations.filter(invitation => invitation.status === GetInvitation.StatusEnum.NEW &&
        invitation.msisdn !== undefined));
    const groupedByMsisdn = _.groupBy(invitationsByMsisdn, e => e.msisdn);
    const invitationsGroupedByMsisdn = _.values(groupedByMsisdn);

    this.pendingInvitations = invitationsGroupedByEmail.concat(invitationsGroupedByMsisdn);
    this.pendingInvitationsCount = this.pendingInvitations.length;
    this.arePendingInvitations = this.pendingInvitationsCount > 0;
  }

}
