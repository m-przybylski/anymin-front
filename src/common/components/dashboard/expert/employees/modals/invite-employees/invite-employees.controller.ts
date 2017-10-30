import {InvitationApi, ServiceApi} from 'profitelo-api-ng/api/api';
import {GetService, PostInvitations, PostInvitation} from 'profitelo-api-ng/model/models'
import {UserService} from '../../../../../../services/user/user.service'
import {ErrorHandlerService} from '../../../../../../services/error-handler/error-handler.service'

export interface IExpertInviteEmployeesControllerScope extends ng.IScope {
}

export class ExpertInviteEmployeesController implements ng.IController {

  public static readonly loaderDelay: number = 500
  public services: GetService[] = []
  public invitationsInputValue: string[] = []
  public isSubmitted: boolean = false
  public isSendingRequest: boolean = false
  public isLoading: boolean = true
  public isError: boolean = false
  public isCheckboxVisible: boolean = false

  private invitations: PostInvitation[] = []
  private selectedServices: GetService[] = []

  /* @ngInject */
  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private InvitationApi: InvitationApi,
              private $timeout: ng.ITimeoutService,
              private userService: UserService,
              private ServiceApi: ServiceApi,
              private $log: ng.ILogService,
              private errorHandler: ErrorHandlerService) {}

  $onInit = (): void => {
    this.getServices()
  }

  public getServices = (): void => {
    this.userService.getUser().then(user => {
      this.ServiceApi.getProfileServicesRoute(user.id).then(services => {
        this.services = services
        this.isError = false
      }).catch(error => {
        this.isError = true
        this.$log.error('Can not get services', error)
      }).finally(() => {
        this.isLoading = false
      })
    })
  }

  public sendInvitations = (): void => {
    if (this.isFormValid()) {
      this.$timeout(() => {
        this.isSendingRequest = true
      }, ExpertInviteEmployeesController.loaderDelay)
      this.InvitationApi.postInvitationRoute(this.createInvitationsModel())
        .then(this.onSendInvitations, this.onSendInvitationsError)
    } else {
      this.isSubmitted = true
    }
  }

  public onSelectedServices = (currentService: GetService, isChecked: boolean): void => {
    if (!isChecked) {
      this.selectedServices.push(currentService)
    } else {
      this.selectedServices = this.selectedServices.filter(service => service !== currentService)
    }
  }

  public isInvitationValid = (): boolean => this.invitationsInputValue.length > 0

  public isServiceSelected = (): boolean => this.selectedServices.length > 0

  public isFormValid = (): boolean => this.isInvitationValid() && this.isServiceSelected()

  public onModalClose = (): void => this.$uibModalInstance.dismiss('cancel')

  private createInvitationsModel = (): PostInvitations => {
    this.selectedServices.forEach((service) => {
      this.createInvitationsList(service)
    })
    return {
      invitations: this.invitations
    }
  }

  private createInvitationsList = (service: GetService): void => {
    this.invitationsInputValue.forEach((emailOrPhone) => {
      if (emailOrPhone.indexOf('@') > -1) {
        this.invitations.push({
          serviceId: service.id,
          serviceName: service.name,
          email: emailOrPhone
        })
      } else {
        this.invitations.push({
          serviceId: service.id,
          serviceName: service.name,
          msisdn: emailOrPhone
        })
      }
    })
  }

  private onSendInvitations = (): void => {
    this.onModalClose()
    this.isSendingRequest = false
  }

  private onSendInvitationsError = (error: any): void => {
    this.errorHandler.handleServerError(error, 'Can not send invitations',
      'DASHBOARD.EXPERT.EMPLOYEES.MODALS.INVITE_EMPLOYEES.SEND_INVITATIONS_ERROR_MESSAGE')
    this.isSendingRequest = false
  }

}
