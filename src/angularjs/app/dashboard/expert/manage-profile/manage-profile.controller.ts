// tslint:disable:readonly-array
// tslint:disable:no-shadowed-variable
// tslint:disable:no-duplicate-imports
import { ModalsService } from '../../../../common/services/modals/modals.service';
import { ExpertProfileView } from 'profitelo-api-ng/model/models';
import { ViewsApi } from 'profitelo-api-ng/api/api';
import { ErrorHandlerService } from '../../../../common/services/error-handler/error-handler.service';
import { UserService } from '../../../../common/services/user/user.service';
import {
  ExpertProfileWithDocuments,
  OrganizationProfileView,
  ServiceWithOwnerProfile
} from 'profitelo-api-ng/model/models';
import { OrganizationProfileWithDocuments } from '@anymind-ng/api/model/organizationProfileWithDocuments';
import { GetService } from 'profitelo-api-ng/model/GetService';

// tslint:disable:member-ordering
export class DashboardExpertManageProfileController {

  public isLoading = true;
  public isError = false;
  public expertName: string;
  public expertAvatar: string;
  public organizationName: string;
  public organizationLogo: string;
  public services: ServiceWithOwnerProfile[] | GetService[];

  private expertProfile: ExpertProfileWithDocuments;
  private organizationProfile: OrganizationProfileWithDocuments;

  public static $inject = ['modalsService', 'ViewsApi', 'errorHandler', 'userService'];

  constructor(private modalsService: ModalsService,
              private ViewsApi: ViewsApi,
              private errorHandler: ErrorHandlerService,
              private userService: UserService) {
    this.getExpertProfile();
  }

  public getExpertProfile = (): void => {
    this.userService.getUser().then((user) => {
      if (user.isExpert) {
        this.ViewsApi.getWebExpertProfileRoute(user.id)
          .then(response => {
            this.isLoading = false;
            this.onGetExpertProfile(response);
          })
          .catch(error => {
            this.isLoading = false;
            this.isError = true;
            this.errorHandler.handleServerError(error,
              'Can not load expert profile', 'DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.PROFILE.GET_DATA_ERROR_MESSAGE');
          });
      }
      if (user.isCompany) {
        this.ViewsApi.getWebOrganizationProfileRoute(user.id)
          .then(response => {
            this.isLoading = false;
            this.onGetOrganizationProfile(response);
          })
          .catch(error => {
            this.isLoading = false;
            this.isError = true;
            this.errorHandler.handleServerError(error,
              'Can not load company profile', 'DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.PROFILE.GET_DATA_ERROR_MESSAGE');
          });
      }
    });
  }

  public editCompanyProfile = (): void => {
    this.modalsService.createManageProfileEditProfileModal(
      this.organizationProfile, this.getExpertProfile);
  }

  public editExpertProfile = (): void => {
    this.modalsService.createManageProfileEditProfileModal(
      this.expertProfile, this.getExpertProfile);
  }

  public openServiceFormModal = (): void => {
    this.modalsService.createServiceFormModal(this.getExpertProfile);
  }

  private onGetExpertProfile = (expertProfile: ExpertProfileView): void => {
    this.expertProfile = expertProfile.expertProfile;
    this.expertName = this.expertProfile.name;
    this.expertAvatar = this.expertProfile.avatar;
    this.services = expertProfile.employments.filter(employment =>
      employment.serviceDetails.deletedAt === undefined
    ).map(employment => employment.serviceDetails);
  }

  private onGetOrganizationProfile = (organizationDetails: OrganizationProfileView): void => {
    this.organizationProfile = organizationDetails.organizationProfile;
    this.organizationName = this.organizationProfile.name;
    this.organizationLogo = this.organizationProfile.logo;
    this.services = organizationDetails.services.filter(service =>
      service.service.deletedAt === undefined
    ).map(serviceWithEmployments => serviceWithEmployments.service);
  }

}
