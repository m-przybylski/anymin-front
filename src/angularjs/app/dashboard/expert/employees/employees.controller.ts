import { ServiceApi } from 'profitelo-api-ng/api/api';
import { GetServiceWithEmployees } from 'profitelo-api-ng/model/models';
import {
  GetServiceWithInvitations, GetInvitation
}
  from 'profitelo-api-ng/model/models';
import { UserService } from '../../../../common/services/user/user.service';
import { ModalsService } from '../../../../common/services/modals/modals.service';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { ErrorHandlerService } from '../../../../common/services/error-handler/error-handler.service';

// tslint:disable:member-ordering

export interface IEmployee {
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  services: {
    serviceName: string;
    isFreelance: boolean;
  }[];
  employmentsId: string[];
}

export class DashboardExpertEmployeesController {

  public areEmployeesLoading = true;
  public isGetEmployeesError = false;
  public isGetServicesError = false;
  public arePendingInvitationsLoading = true;
  public isPendingInvitationsError = false;
  public areEmployees = false;
  public arePendingInvitations = false;
  public pendingInvitations: GetInvitation[][];
  public employees: IEmployee[] = [];

  private userId: string;
  private servicesId: string[] = [];
  private pendingInvitationsCount: number;
  private employeesCount: number;

  public static $inject = ['userService', 'modalsService', '$log', 'ServiceApi', 'errorHandler'];

  constructor(private userService: UserService,
              private modalsService: ModalsService,
              private $log: ng.ILogService,
              private ServiceApi: ServiceApi,
              private errorHandler: ErrorHandlerService) {
  }

  public $onInit = (): void => {
    this.userService.getUser().then(user => {
      this.userId = user.id;
      this.getServices();
    });
  }

  public getServices = (): void => {
    this.isGetServicesError = false;
    this.ServiceApi.getProfileServicesRoute(this.userId)
      .then(services => {
        this.servicesId = services.map(service => service.id);
        this.postServiceWithInvitations(this.servicesId);
        this.postServicesEmployees(this.servicesId);
      })
      .catch((error) => {
        this.errorHandler.handleServerError(error,
          'Can not load services', 'DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.PROFILE.GET_DATA_ERROR_MESSAGE');
        this.areEmployeesLoading = false;
        this.arePendingInvitationsLoading = false;
        this.isGetServicesError = true;
      });
  }

  public openInviteEmployeesModal = (): void => {
    this.modalsService.createExpertInviteEmployeesModal(this.getServices);
  }

  public onDeleteInvitationsCallback = (): void => {
    this.pendingInvitationsCount -= 1;
    this.arePendingInvitations = this.pendingInvitationsCount > 0;
  }

  public onDeleteEmploymentsCallback = (): void => {
    this.employeesCount -= 1;
    this.areEmployees = this.employeesCount > 0;
  }

  public isNoResultsInformation = (): boolean =>
    this.areEmployees || this.arePendingInvitations || this.isGetEmployeesError || this.isPendingInvitationsError

  private postServiceWithInvitations = (servicesId: string[]): void => {
    this.isPendingInvitationsError = false;
    this.ServiceApi.postServiceInvitationsRoute({serviceIds: servicesId}).then(servicesWithInvitations => {
      this.groupInvitations(servicesWithInvitations);
    }).catch((error) => {
      this.isPendingInvitationsError = true;
      this.$log.error('Cannot load data', error);
    }).finally(() => {
      this.arePendingInvitationsLoading = false;
    });
  }

  private postServicesEmployees = (servicesId: string[]): void => {
    this.isGetEmployeesError = false;
    this.ServiceApi.postServiceWithEmployeesRoute({serviceIds: servicesId})
      .then(servicesWithEmployees => {
        this.isGetEmployeesError = false;
        this.onPostServiceWithEmployees(servicesWithEmployees);
      })
      .catch((error) => {
        this.isGetEmployeesError = true;
        this.$log.error('Cannot load data', error);
      })
      .finally(() => {
        this.areEmployeesLoading = false;
      });
  }

  private onPostServiceWithEmployees = (servicesWithEmployees: GetServiceWithEmployees[]): void => {
    servicesWithEmployees.forEach(serviceWithEmployees => {
      serviceWithEmployees.employeesDetails.forEach(employment => {
        const employee = this.employees.find(e => e.employeeId === employment.employeeProfile.id);
        if (!employee) {
          this.employees.push({
            employeeId: employment.employeeProfile.id,
            employeeName: employment.employeeProfile.name,
            employeeAvatar: employment.employeeProfile.avatar,
            services: [{
              serviceName: serviceWithEmployees.serviceDetails.name,
              isFreelance: serviceWithEmployees.serviceDetails.isFreelance
            }],
            employmentsId: [employment.id]
          });
        } else {
          employee.services.push({
            serviceName: serviceWithEmployees.serviceDetails.name,
            isFreelance: serviceWithEmployees.serviceDetails.isFreelance
          });
          employee.employmentsId.push(employment.id);
        }
      });
    });
    this.employeesCount = this.employees.length;
    this.areEmployees = this.employeesCount > 0;
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
