// tslint:disable:prefer-method-signature
// tslint:disable:no-shadowed-variable
// tslint:disable:no-any
import { ISingleServiceComponentBindings } from './single-service';
import { UserService } from '../../../../../services/user/user.service';
import { ModalsService } from '../../../../../services/modals/modals.service';
import { ServiceApi, EmploymentApi } from 'profitelo-api-ng/api/api';
import { TopAlertService } from '../../../../../services/top-alert/top-alert.service';
import { ErrorHandlerService } from '../../../../../services/error-handler/error-handler.service';
import { TranslatorService } from '../../../../../services/translator/translator.service';
import { GetService, ServiceWithOwnerProfile } from 'profitelo-api-ng/model/models';

export interface ISingleServiceComponentControllerScope extends ng.IScope {
  onModalClose: () => void;
  serviceDetails: ServiceWithOwnerProfile | GetService;
}

// tslint:disable:member-ordering
export class SingleServiceComponentController implements ng.IController, ISingleServiceComponentBindings {

  public serviceDetails: ServiceWithOwnerProfile | GetService;
  public isOwnerOfService: boolean;
  public serviceName: string;
  public serviceOwnerName: string;
  public serviceOwnerLogo: string;
  public onModalClose: () => void;
  public isDeleted = false;
  public isFreelance = false;
  public isCompany = false;

  private userId: string;

  public static $inject = ['userService', 'modalsService', 'ServiceApi', 'EmploymentApi', 'translatorService',
    'topAlertService', 'errorHandler'];

  constructor(private userService: UserService,
              private modalsService: ModalsService,
              private ServiceApi: ServiceApi,
              private EmploymentApi: EmploymentApi,
              private translatorService: TranslatorService,
              private topAlertService: TopAlertService,
              private errorHandler: ErrorHandlerService) {
    this.userService.getUser().then((user) => {
      this.userId = user.id;
      this.isCompany = user.isCompany;
      this.serviceName = this.serviceDetails.name;
      if (this.isGetServiceModel(this.serviceDetails)) {
        this.isOwnerOfService = this.userId === this.serviceDetails.ownerId;
        this.isFreelance = this.serviceDetails.isFreelance;
      } else {
        if (this.serviceDetails.ownerProfile && this.serviceDetails.ownerProfile.organizationDetails) {
          this.serviceOwnerName = this.serviceDetails.ownerProfile.organizationDetails.name;
          this.serviceOwnerLogo = this.serviceDetails.ownerProfile.organizationDetails.logo;
          this.isFreelance = this.serviceDetails.isFreelance;
          this.isOwnerOfService = this.userId === this.serviceDetails.ownerProfile.id;
        } else if (this.serviceDetails.ownerProfile && this.serviceDetails.ownerProfile.expertDetails) {
          this.serviceOwnerName = this.serviceDetails.ownerProfile.expertDetails.name;
          this.serviceOwnerLogo = this.serviceDetails.ownerProfile.expertDetails.avatar;
          this.isFreelance = this.serviceDetails.isFreelance;
          this.isOwnerOfService = this.userId === this.serviceDetails.ownerProfile.id;
        }
      }
    });
  }

  public openServiceFormModal = (): void => {
    this.modalsService.createServiceFormModal(this.onModalClose, this.serviceDetails);
  }

  public suspendProvideService = (): void => {
    if (this.isOwnerOfService) {
      this.deleteService();
    } else {
      this.deleteEmployment();
    }
  }

  private isGetServiceModel(serviceDetails: ServiceWithOwnerProfile | GetService): serviceDetails is GetService {
    // tslint:disable-next-line:strict-type-predicates
    return (<GetService>serviceDetails).ownerId !== undefined;
}

  private deleteService = (): void => {
    this.modalsService.createConfirmAlertModal('DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.SUSPEND_SERVICE_CONFIRM_TEXT',
      () => {
        this.ServiceApi.deleteServiceRoute(this.serviceDetails.id).then(() => {
          this.topAlertService.success({
            message:
              this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.PROFILE.SUCCESS_MESSAGE'),
            timeout: 2
          });
          this.isDeleted = true;
        }, this.onReject);
      });
  }

  private deleteEmployment = (): void => {
    this.modalsService.createConfirmAlertModal('DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.DELETE_EMPLOYMENT_CONFIRM_TEXT',
      () => {
        this.EmploymentApi.deleteEmploymentForServiceRoute(this.serviceDetails.id).then(() => {
          this.topAlertService.success({
            message:
              this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.PROFILE.SUCCESS_MESSAGE'),
            timeout: 2
          });
          this.isDeleted = true;
        }, this.onReject);
      });
  }

  private onReject = (error: any): void => {
    this.errorHandler.handleServerError(error,
      'Can not delete employment', 'DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.PROFILE.ERROR_MESSAGE');
  }

}
