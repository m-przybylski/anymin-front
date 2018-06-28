// tslint:disable:prefer-method-signature
// tslint:disable:no-shadowed-variable
// tslint:disable:no-any
// tslint:disable:newline-before-return
// tslint:disable:deprecation
import { InvitationApi, ServiceApi } from 'profitelo-api-ng/api/api';
import { GetService, PostInvitations, PostInvitation } from 'profitelo-api-ng/model/models';
import { UserService } from '../../../../../../services/user/user.service';
import { ErrorHandlerService } from '../../../../../../services/error-handler/error-handler.service';

export interface IExpertInviteEmployeesControllerScope extends ng.IScope {
  onModalCloseCallback: () => void;
}

// tslint:disable:member-ordering
export class ExpertInviteEmployeesController implements ng.IController {

  public services: GetService[] = [];
  public invitationsInputValue: string[] = [];
  public isSubmitted = false;
  public isSendingRequest = false;
  public isLoading = true;
  public isError = false;
  public isCheckboxVisible = false;

  private invitations: PostInvitation[] = [];
  private selectedServices: GetService[] = [];

  public static $inject = ['$uibModalInstance', 'InvitationApi', 'userService', 'ServiceApi', '$log',
    'errorHandler', '$scope'];

    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private InvitationApi: InvitationApi,
              private userService: UserService,
              private ServiceApi: ServiceApi,
              private $log: ng.ILogService,
              private errorHandler: ErrorHandlerService,
              private $scope: IExpertInviteEmployeesControllerScope) {}

  public $onInit = (): void => {
    this.getServices();
  }

  public getServices = (): void => {
    this.userService.getUser().then(user => {
      this.ServiceApi.getProfileServicesRoute(user.id).then(services => {
        this.services = services;
        this.isError = false;
      }).catch(error => {
        this.isError = true;
        this.$log.error('Can not get services', error);
      }).finally(() => {
        this.isLoading = false;
      });
    });
  }

  public sendInvitations = (): void => {
    if (this.isFormValid()) {
      this.isSendingRequest = true;
      this.InvitationApi.postInvitationRoute(this.createInvitationsModel())
        .then(this.onSendInvitations, this.onSendInvitationsError);
    } else {
      this.isSubmitted = true;
    }
  }

  public onSelectedServices = (currentService: GetService, isChecked: boolean): void => {
    if (!isChecked) {
      this.selectedServices.push(currentService);
    } else {
      this.selectedServices = this.selectedServices.filter(service => service !== currentService);
    }
  }

  public isInvitationValid = (): boolean => this.invitationsInputValue.length > 0;

  public isServiceSelected = (): boolean => this.selectedServices.length > 0;

  public isFormValid = (): boolean => this.isInvitationValid() && this.isServiceSelected();

  public onModalClose = (): void => this.$uibModalInstance.dismiss('cancel');

  private createInvitationsModel = (): PostInvitations => {
    this.selectedServices.forEach((service) => {
      this.createInvitationsList(service);
    });
    return {
      invitations: this.invitations
    };
  }

  private createInvitationsList = (service: GetService): void => {
    this.invitationsInputValue.forEach((emailOrPhone) => {
      if (emailOrPhone.indexOf('@') > -1) {
        this.invitations.push({
          serviceId: service.id,
          email: emailOrPhone
        });
      } else {
        this.invitations.push({
          serviceId: service.id,
          msisdn: emailOrPhone
        });
      }
    });
  }

  private onSendInvitations = (): void => {
    this.$scope.onModalCloseCallback();
    this.onModalClose();
    this.isSendingRequest = false;
  }

  private onSendInvitationsError = (error: any): void => {
    this.errorHandler.handleServerError(error, 'Can not send invitations',
      'DASHBOARD.EXPERT.EMPLOYEES.MODALS.INVITE_EMPLOYEES.SEND_INVITATIONS_ERROR_MESSAGE');
    this.isSendingRequest = false;
  }

}
