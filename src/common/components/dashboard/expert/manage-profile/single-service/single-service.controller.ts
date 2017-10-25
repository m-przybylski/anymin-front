import {ISingleServiceComponentBindings} from './single-service'
import {GetExpertServiceDetails} from 'profitelo-api-ng/model/models';
import {UserService} from '../../../../../services/user/user.service'
import {ModalsService} from '../../../../../services/modals/modals.service'
import {ServiceApi, EmploymentApi} from 'profitelo-api-ng/api/api';
import {TopAlertService} from '../../../../../services/top-alert/top-alert.service'
import {ErrorHandlerService} from '../../../../../services/error-handler/error-handler.service'
import {TranslatorService} from '../../../../../services/translator/translator.service'

export interface ISingleServiceComponentControllerScope extends ng.IScope {
  onModalClose: () => void,
  serviceDetails: GetExpertServiceDetails
}

export class SingleServiceComponentController implements ng.IController, ISingleServiceComponentBindings {

  public serviceDetails: GetExpertServiceDetails
  public isOwnerOfService: boolean
  public serviceName: string
  public serviceOwnerName: string
  public serviceOwnerLogo: string
  public onModalClose: () => void
  public isServiceDeleted: boolean = false
  public isEmploymentDeleted: boolean = false

  /* @ngInject */
  constructor(private userService: UserService,
              private modalsService: ModalsService,
              private ServiceApi: ServiceApi,
              private EmploymentApi: EmploymentApi,
              private translatorService: TranslatorService,
              private topAlertService: TopAlertService,
              private errorHandler: ErrorHandlerService) {}

  $onInit = (): void => {
    this.serviceName = this.serviceDetails.service.name
    this.isServiceDeleted = this.serviceDetails.service.deletedAt !== undefined
    if (this.serviceDetails.ownerProfile.organizationDetails) {
      this.serviceOwnerName = this.serviceDetails.ownerProfile.organizationDetails.name
      this.serviceOwnerLogo = this.serviceDetails.ownerProfile.organizationDetails.logo
    }
    this.userService.getUser().then((user) => {
      this.isOwnerOfService = user.id === this.serviceDetails.ownerProfile.id
    })
  }

  public openServiceFormModal = (): void => {
    this.modalsService.createServiceFormModal(this.onModalClose, this.serviceDetails)
  }

  public suspendProvideService = (): void => {
    if (this.isOwnerOfService) {
      this.deleteService()
    } else {
      this.deleteEmployment()
    }
  }

  private deleteService = (): void => {
    const confirmWindowMessage: string =
      this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.SUSPEND_SERVICE_CONFIRM_TEXT')
    if (confirm(confirmWindowMessage)) {
      this.ServiceApi.deleteServiceRoute(this.serviceDetails.service.id).then( () => {
        this.topAlertService.success({
          message: this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.PROFILE.SUCCESS_MESSAGE'),
          timeout: 2
        })
        this.isServiceDeleted = true
      }, this.onReject)
    }
  }

  private deleteEmployment = (): void => {
    const confirmWindowMessage: string =
      this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.DELETE_EMPLOYMENT_CONFIRM_TEXT')
    if (confirm(confirmWindowMessage)) {
        this.EmploymentApi.deleteEmploymentForServiceRoute(this.serviceDetails.service.id).then(() => {
          this.topAlertService.success({
            message:
              this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.PROFILE.SUCCESS_MESSAGE'),
            timeout: 2
          })
          this.isEmploymentDeleted = true
        }, this.onReject)
    }
  }

  private onReject = (error: any): void => {
    this.errorHandler.handleServerError(error,
      'Can not delete employment', 'DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.PROFILE.ERROR_MESSAGE')
  }

}
