// tslint:disable:max-file-line-count
import {
  GetWizardProfile,
  PartialExpertDetails,
  GetWizardService,
  GetServiceWithInvitation,
  PartialOrganizationDetails
} from 'profitelo-api-ng/model/models';
import { WizardApi, InvitationApi } from 'profitelo-api-ng/api/api';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { ErrorHandlerService } from '../../../common/services/error-handler/error-handler.service';
import { UserService } from '../../../common/services/user/user.service';
import { LocalStorageWrapper } from '../../../common/classes/local-storage-wrapper/local-storage-wrapper';
import { IGetServiceWithInvitationsAndTags } from '../../invitations/modal/invitations.controller';
import {
  NavbarNotificationsService
} from '../../../common/components/navbar/navbar-notifications/navbar-notifications.service';
import { StateService } from '@uirouter/angularjs';
import { TopAlertService } from '../../../common/services/top-alert/top-alert.service';
import { TranslatorService } from '../../../common/services/translator/translator.service';
import { CommonSettingsService } from '../../../common/services/common-settings/common-settings.service';

// tslint:disable:member-ordering
// tslint:disable:strict-type-predicates
export class SummaryController implements ng.IController {

  public isExpertWizardPath: boolean;
  public wizardProfileData?: PartialExpertDetails | PartialOrganizationDetails;
  public isConsultation = false;
  public services?: GetWizardService[];
  public isUserShouldCreateExpert = false;
  public isCompanyWithExpert = false;
  public wizardExpertProfileData?: PartialExpertDetails;
  public isWizardInvalid = false;
  public isConsultationInvitationAccepted = false;
  public acceptedServices: GetServiceWithInvitation[];

  private namePattern: RegExp;
  private descriptionPattern: RegExp;

  public static $inject = ['$state', 'errorHandler', 'WizardApi', 'topAlertService', 'wizardProfile', 'userService',
    'InvitationApi', '$filter', '$q', 'navbarNotificationsService', '$log', 'CommonSettingsService'];

  // tslint:disable-next-line:cyclomatic-complexity
  constructor(private $state: StateService,
              private errorHandler: ErrorHandlerService,
              private WizardApi: WizardApi,
              private topAlertService: TopAlertService,
              private wizardProfile: GetWizardProfile,
              private userService: UserService,
              private InvitationApi: InvitationApi,
              private translatorService: TranslatorService,
              private $q: ng.IQService,
              private navbarNotificationsService: NavbarNotificationsService,
              private $log: ng.ILogService,
              private CommonSettingsService: CommonSettingsService) {
    this.setInvitationsServices();
    this.assignValidationValues();
    if (wizardProfile.expertDetailsOption && wizardProfile.isExpert && !wizardProfile.isCompany) {
      this.isExpertWizardPath = wizardProfile.isExpert;
      this.wizardProfileData = wizardProfile.expertDetailsOption;
    } else if (wizardProfile.organizationDetailsOption && wizardProfile.isCompany) {
      this.isExpertWizardPath = false;
      this.wizardProfileData = wizardProfile.organizationDetailsOption;
      this.wizardExpertProfileData = wizardProfile.expertDetailsOption;
      if (wizardProfile.services) {
        this.isUserShouldCreateExpert = this.checkIfUserCanCreateExpertProfile();
        this.isCompanyWithExpert = wizardProfile.isCompany && wizardProfile.isExpert;
      }
    }
  }

  public $onInit(): void {
    this.isConsultation = this.wizardProfile.services
      && this.wizardProfile.services.length > 0 || this.isConsultationInvitationAccepted;
    this.services = this.wizardProfile.services;
  }

  public onMainProfileDelete = (): void => {
    this.WizardApi.putWizardProfileRoute({
      isSummary: false,
      isCompany: false,
      isExpert: false
    }).then(() => {
      this.$state.go('app.wizard.create-profile');
    }, (error) => {
      this.errorHandler.handleServerError(error);
    });
  }

  public onSecondProfileDelete = (): void => {
    if (this.wizardProfile) {
      this.wizardProfile.expertDetailsOption = void 0;
      this.wizardProfile.isExpert = false;
      this.WizardApi.putWizardProfileRoute(this.wizardProfile).then((response) => {
        this.isUserShouldCreateExpert = true;
        this.isCompanyWithExpert = response.isCompany && response.isExpert;
        this.wizardExpertProfileData = response.expertDetailsOption;
      }, (error) => {
        this.errorHandler.handleServerError(error);
      });
    }
  }

  public onMainProfileEdit = (): void => {
    if (this.wizardProfile && this.wizardProfile.isExpert && !this.wizardProfile.isCompany) {
      this.$state.go('app.wizard.create-profile.expert');
    } else {
      this.$state.go('app.wizard.create-profile.company');
    }
  }

  public onSecondProfileEdit = (): void => {
    this.$state.go('app.wizard.create-profile.expert');
  }

  public removeConsultation = (serviceToDelete: GetWizardService): void => {
    if (this.wizardProfile && this.services) {
      _.remove(this.services, (service) => serviceToDelete === service);
      this.wizardProfile.services = this.services;
      this.WizardApi.putWizardProfileRoute(this.wizardProfile).then((response) => {
        this.isConsultation = !!(response.services && response.services.length > 0);
        this.isUserShouldCreateExpert = this.checkIfUserCanCreateExpertProfile();
      });
    }
  }

  public editConsultation = (service: GetWizardService): void => {
    this.$state.go('app.wizard.consultation', {
      service
    });
  }

  public saveWizard = (): void => {
    if (this.checkIsWizardValid()) {
      this.WizardApi.postWizardCompleteRoute().then((_response) => {
        this.userService.getUser(true).then(() => {
          if (this.checkIsWizardHasInvitationServices()) {
            this.acceptInvitations()
              .then(this.clearInvitationFromLocalStorage)
              .finally(this.redirectToDashboardActivities);
          } else {
            this.redirectToDashboardActivities();
          }
        });
      }, (error) => {
        this.errorHandler.handleServerError(error);
      });
    } else {
      this.isWizardInvalid = true;
    }
  }

  private redirectToDashboardActivities = (): void => {
    this.$state.go('app.dashboard.expert.activities');
  }

  private clearInvitationFromLocalStorage = (): void => {
    LocalStorageWrapper.removeItem('accepted-consultations');
    this.topAlertService.success({
      message: this.translatorService.translate('INVITATIONS.ACCEPTED'),
      timeout: 4
    });
  }

  private setInvitationsServices = (): void => {
    const acceptedConsultationsObject = LocalStorageWrapper.getItem('accepted-consultations');
    if (acceptedConsultationsObject) {
      this.InvitationApi.getInvitationsRoute().then((invitations) => {
        const differenceArray = _.difference(JSON.parse(acceptedConsultationsObject)
            .map((accpetedConsultation: IGetServiceWithInvitationsAndTags) => accpetedConsultation.invitation.id),
          invitations.map((invitation) => invitation.id));
        if (differenceArray && differenceArray.length === 0) {
          this.isConsultationInvitationAccepted = true;
          this.acceptedServices = JSON.parse(acceptedConsultationsObject);
          this.isConsultation = this.wizardProfile.services
            && this.wizardProfile.services.length > 0 || this.isConsultationInvitationAccepted;
        }
      }, (error) => {
        this.$log.error(error);
      });
    }
  }

  // tslint:disable-next-line:cyclomatic-complexity
  private checkIsWizardValid = (): boolean => {
    if (this.wizardProfile.isSummary && (this.checkIsWizardHasService() || this.checkIsWizardHasInvitationServices())) {
      if (!this.wizardProfile.isCompany && this.checkIsExpertProfileValid()) {
        return true;
      } else if (!this.wizardProfile.isExpert && this.checkIsCompanyProfileValid()) {
        return true;
      } else if (this.wizardProfile.isCompany && this.wizardProfile.isExpert && this.checkIsExpertProfileValid() &&
        this.checkIsCompanyProfileValid()) {
        return true;
      }
      return false;
    }
    return false;
  }

  private checkIsExpertNameValid = (): boolean =>
    this.wizardProfile.expertDetailsOption &&
    this.wizardProfile.expertDetailsOption.name ?
      this.namePattern.test(this.wizardProfile.expertDetailsOption.name) : false

  private checkIsExpertDescriptionValid = (): boolean =>
    this.wizardProfile.expertDetailsOption &&
    this.wizardProfile.expertDetailsOption.description ?
      this.descriptionPattern.test(this.wizardProfile.expertDetailsOption.description) : false

  private checkIsExpertProfileValid = (): string | boolean | undefined =>
    this.wizardProfile.isExpert && this.wizardProfile.expertDetailsOption
    && this.wizardProfile.expertDetailsOption.avatar && this.checkIsExpertDescriptionValid()
    && this.checkIsExpertNameValid()

  private checkIsWizardHasService = (): boolean | undefined =>
    this.wizardProfile.services && this.wizardProfile.services.length > 0

  private checkIsWizardHasInvitationServices = (): boolean =>
    this.isConsultationInvitationAccepted
    && typeof this.acceptedServices !== 'undefined'
    && this.acceptedServices.length > 0

  private checkIsCompanyNameValid = (): boolean =>
    this.wizardProfile.organizationDetailsOption &&
    this.wizardProfile.organizationDetailsOption.name ?
      this.namePattern.test(this.wizardProfile.organizationDetailsOption.name) : false

  private checkIsCompanyDescriptionValid = (): boolean =>
    this.wizardProfile.organizationDetailsOption &&
    this.wizardProfile.organizationDetailsOption.description ?
      this.descriptionPattern.test(this.wizardProfile.organizationDetailsOption.description) : false

  private checkIsCompanyProfileValid = (): string | boolean | undefined =>
    this.wizardProfile.isCompany && this.wizardProfile.organizationDetailsOption
    && this.checkIsCompanyNameValid() && this.wizardProfile.organizationDetailsOption.logo
    && this.checkIsCompanyDescriptionValid()

  // tslint:disable-next-line:cyclomatic-complexity
  private checkIfUserCanCreateExpertProfile = (): boolean => {
    if (this.wizardProfile && this.wizardProfile.services && !this.acceptedServices) {
      return !!(_.find(this.wizardProfile.services, (service) =>
        service.isOwnerEmployee) && !this.wizardProfile.isExpert);
    } else if (this.acceptedServices && this.acceptedServices.length > 0 && !this.wizardProfile.isExpert) {
      return true;
    }
    return false;
  }

  private acceptInvitations = (): ng.IPromise<void> =>
    this.$q.all(this.acceptedServices.map(
      (acceptedService) => this.InvitationApi.postInvitationAcceptRoute(acceptedService.invitation.id)))
      .then(() => this.navbarNotificationsService.resolveInvitations())
      .catch((error) => this.errorHandler.handleServerError(error))

  private assignValidationValues = (): void => {
    const localSettings = this.CommonSettingsService.localSettings;
    this.namePattern = localSettings.profileNamePattern;
    this.descriptionPattern = localSettings.profileDescriptionPattern;
  }

}
