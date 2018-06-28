// tslint:disable:strict-boolean-expressions
// tslint:disable:no-shadowed-variable
// tslint:disable:newline-before-return
// tslint:disable:curly
import {
  GetInvitation, GetServiceTags, GetProfileWithServicesInvitations,
  GetServiceWithInvitation, GetTag
} from 'profitelo-api-ng/model/models';
import { InvitationApi, ServiceApi } from 'profitelo-api-ng/api/api';
import { StateService } from '@uirouter/angularjs';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { UserService } from '../../../common/services/user/user.service';
import { LocalStorageWrapper } from '../../../common/classes/local-storage-wrapper/local-storage-wrapper';
import {
  NavbarNotificationsService
} from '../../../common/components/navbar/navbar-notifications/navbar-notifications.service';
import { TranslatorService } from '../../../common/services/translator/translator.service';
import { TopAlertService } from '../../../common/services/top-alert/top-alert.service';
import { ModalsService } from '../../../common/services/modals/modals.service';

export interface IGetServiceWithInvitationsAndTags extends GetServiceWithInvitation {
  tags?: GetTag[];
}

export interface IInvitationsModalScope extends ng.IScope {
  profileWithServicesInvitations?: GetProfileWithServicesInvitations;
}

// tslint:disable:member-ordering
export class InvitationsModalController implements ng.IController {
  public areInvitations = false;
  public isServiceSelected = true;
  public companyName?: string;
  public logo?: string;
  public description?: string;
  public isLoading = true;
  public isSubmitButtonDisabled = false;

  private services: IGetServiceWithInvitationsAndTags[] = [];
  private acceptedServices: IGetServiceWithInvitationsAndTags[] = [];

  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel');
    if (this.$state.current.name === 'app.invitations' || this.$location.url().includes('invitations'))
      this.$state.go('app.dashboard.expert.activities');
  }

  public static $inject = ['$state', '$uibModalInstance', 'InvitationApi', 'userService', 'ServiceApi',
    'topAlertService', '$q', '$log', 'navbarNotificationsService', 'translatorService', 'modalsService', '$location',
    '$scope'];

  constructor(private $state: StateService,
              private $uibModalInstance: ng.ui.bootstrap.IModalInstanceService,
              private InvitationApi: InvitationApi,
              private userService: UserService,
              private ServiceApi: ServiceApi,
              private topAlertService: TopAlertService,
              private $q: ng.IQService,
              private $log: ng.ILogService,
              private navbarNotificationsService: NavbarNotificationsService,
              private translatorService: TranslatorService,
              private modalsService: ModalsService,
              private $location: ng.ILocationService,
              $scope: IInvitationsModalScope) {
    if ($scope.profileWithServicesInvitations) {
      this.setInvitationData($scope.profileWithServicesInvitations);
    } else {
      this.isLoading = false;
    }
    if (this.services && this.services.length > 0) {
      this.areInvitations = true;
    }
  }

  private setInvitationData = (profileWithServicesInvitations?: GetProfileWithServicesInvitations): void => {
    if (profileWithServicesInvitations && profileWithServicesInvitations.profile.organizationDetails) {
      this.companyName = profileWithServicesInvitations.profile.organizationDetails.name;
      this.logo = profileWithServicesInvitations.profile.organizationDetails.logo;
      this.description = profileWithServicesInvitations.profile.organizationDetails.description;

      this.services = profileWithServicesInvitations.services.filter((service) =>
        service.invitation.status === GetInvitation.StatusEnum.NEW);

      this.acceptedServices = this.services;

      this.ServiceApi.postServicesTagsRoute({
        serviceIds: this.services.map((service) => service.service.id)
      }).then((serviceTags) => {
        this.services = this.getServicesTags(this.services, serviceTags);
      }).catch((error) => {
        this.$log.error(error);
      }).finally(() => {
        this.isLoading = false;
      });
    }
  }

  public onSelectConsultation = (service: IGetServiceWithInvitationsAndTags, isUnchecked: boolean): void => {
    if (!isUnchecked) {
      this.acceptedServices.push(service);
    } else {
      _.remove(this.acceptedServices, service);
    }
  }

  public submitInvitations = (): void => {
    if (this.acceptedServices.length < this.services.length) {
      this.modalsService.createConfirmAlertModal('DASHBOARD.EXPERT_ACCOUNT.INVITATION.DETAILS.CONFIRM_MESSAGE', () => {
        this.processInvitationState();
      });
    } else {
      this.processInvitationState();
    }
  }

  public getServicesTags = (services: IGetServiceWithInvitationsAndTags[],
                            servicesTags: GetServiceTags[]): IGetServiceWithInvitationsAndTags[] =>
    services.map((service) => {
      const serviceTags = _.find(servicesTags, (serviceTags) => service.service.id === serviceTags.serviceId);
      if (serviceTags) {
        service.tags = serviceTags.tags;
      }
      return service;
    })

  private processInvitationState = (): void => {
    this.userService.getUser().then((user) => {
      if (user.isExpert) {
        this.postInvitationsState(this.services);
      } else if (this.acceptedServices && this.acceptedServices.length > 0) {
        this.rejectInvitations(this.services).then(this.redirectToWizards);
      } else {
        if (LocalStorageWrapper.getItem('accepted-consultations'))
          LocalStorageWrapper.removeItem('accepted-consultations');
        this.rejectInvitations(this.services).then(this.onModalClose);
      }
    });
  }

  private postInvitationsState = (services: GetServiceWithInvitation[]): void => {
    services.forEach((service) => {
      if (_.some(this.acceptedServices, service)) {
        this.InvitationApi.postInvitationAcceptRoute(service.invitation.id)
          .then((_response) => (this.onEmploymentUpdateDone(service)));
      } else {
        this.InvitationApi.postInvitationRejectRoute(service.invitation.id)
          .then((_response) => (this.onEmploymentUpdateDone(service)));
      }
    });
  }

  private rejectInvitations = (services: GetServiceWithInvitation[]): ng.IPromise<void | {}[]> => {
    this.isSubmitButtonDisabled = true;
    const rejectedServices = services.filter((service) => !_.some(this.acceptedServices, service));
    if (rejectedServices && rejectedServices.length > 0)
      return this.$q.all(rejectedServices.map((service) =>
        this.InvitationApi.postInvitationRejectRoute(service.invitation.id)))
        .catch((error) => {
          this.$log.error(error);
        })
        .finally(() => {
          this.navbarNotificationsService.resolveInvitations();
          this.isSubmitButtonDisabled = false;
        });
    else
      return this.$q.resolve().finally(() => this.isSubmitButtonDisabled = false);
  }

  private redirectToWizards = (): void => {
    LocalStorageWrapper.setItem('accepted-consultations',
      JSON.stringify(this.acceptedServices));
    this.$state.go('app.wizard.create-profile.expert');
    this.$uibModalInstance.dismiss('cancel');
  }

  private onEmploymentUpdateDone = (service: GetServiceWithInvitation): void => {
    if (_.last(this.services) === service) {
      this.navbarNotificationsService.resolveInvitations();
      if (this.acceptedServices && this.acceptedServices.length > 0)
        this.topAlertService.success({
          message: this.translatorService.translate('INVITATIONS.ACCEPTED'),
          timeout: 4
        });
      this.onModalClose();
    }
  }

}
