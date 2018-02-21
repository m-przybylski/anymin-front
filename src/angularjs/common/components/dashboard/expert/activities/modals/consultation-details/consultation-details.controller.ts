import { ViewsApi, ServiceApi } from 'profitelo-api-ng/api/api';
import { MoneyDto, Tag, GetCallDetails, GetServiceTags } from 'profitelo-api-ng/model/models';

export interface IExpertConsultationDetailsParentScope extends ng.IScope {
  sueId: string;
}

export interface IExpertConsultationDetailsScope extends ng.IScope {
  $parent: IExpertConsultationDetailsParentScope;
  sueId: string;
}

// tslint:disable:member-ordering
export class ExpertConsultationDetailsController implements ng.IController {
  public roomId?: string;
  public isLoading = true;
  public serviceTags: Tag[] = [];
  public expertAvatar?: string;
  public expertName?: string;
  public serviceName: string;
  public serviceId: string;
  public financialOperation?: MoneyDto;
  public startedAt: Date;
  public callDuration: number;
  public isRecommended: boolean;
  public sueId: string;
  public recommendedTags: Tag[] = [];
  public isRecommendable: boolean;
  public consultationComment?: string;
  private callDetails: GetCallDetails;

  public complaintReasons: any;

  public onModalClose = (): void =>
    this.$uibModalInstance.dismiss('cancel')

  public static $inject = ['$log', '$scope', '$uibModalInstance', 'ServiceApi', 'ViewsApi'];

    constructor(private $log: ng.ILogService, private $scope: IExpertConsultationDetailsScope,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private ServiceApi: ServiceApi,
              ViewsApi: ViewsApi) {

    ViewsApi.getDashboardCallDetailsRoute($scope.$parent.sueId)
    .then((res) => this.onGetCallDetails(res), this.onGetCallDetailsError);

    this.sueId = this.$scope.$parent.sueId;

    this.complaintReasons = [
      {
        id: 'id2value',
        isDescriptive: false,
        name: 'DASHBOARD.CLIENT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.' +
        'REASON_INCOPENTENT_EXPERT',
      },
      {
        id: 'id3value',
        isDescriptive: false,
        name: 'DASHBOARD.CLIENT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.REASON_RUDE_EXPERT',
      },
      {
        id: 'id4value',
        isDescriptive: false,
        name: 'DASHBOARD.CLIENT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.' +
        'REASON_TECHNICAL_PROBLEMS',
      },
      {
        id: 'id5value',
        isDescriptive: true,
        name: 'DASHBOARD.CLIENT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.REASON_OTHER',
      }
    ];
  }

  private onGetCallDetailsError = (err: any): void => {
    this.isLoading = false;
    this.$log.error(err);
  }

  private onGetCallDetails = (response: GetCallDetails): void => {
    this.callDetails = response;
    if (response.isRecommendable) {
      this.ServiceApi.postServicesTagsRoute({
        serviceIds: [response.service.id]
      }).then(this.onServiceTags, this.onServiceTagsError);
    } else {
      this.openExpertActivityModal();
    }
  }

  private onServiceTagsError = (err: any): void => {
    this.$log.error(err);
  }

  private onServiceTags = (res: GetServiceTags[]): void => {
    this.openExpertActivityModal(res[0].tags);
  }

  private openExpertActivityModal = (serviceTags: Tag[] = []): void => {
    // tslint:disable-next-line:no-non-null-assertion
    this.expertAvatar = this.callDetails.expertProfile.expertDetails!.avatar;
    // tslint:disable-next-line:no-non-null-assertion
    this.expertName = this.callDetails.expertProfile.expertDetails!.name;
    this.recommendedTags = this.callDetails.recommendedTags;
    this.serviceName = this.callDetails.service.name;
    this.serviceId = this.callDetails.service.id;

    if (this.callDetails.serviceUsageDetails)
      this.financialOperation = this.callDetails.serviceUsageDetails.financialOperation;
    this.startedAt = this.callDetails.serviceUsageDetails.answeredAt;
    this.callDuration = this.callDetails.serviceUsageDetails.callDuration;
    this.isRecommended = this.callDetails.isRecommended;
    this.isRecommendable = this.callDetails.isRecommendable;

    if (this.callDetails.comment)
      this.consultationComment = this.callDetails.comment.content;
    this.roomId = this.callDetails.serviceUsageDetails.ratelRoomId;
    this.serviceTags = serviceTags;
    this.isLoading = false;
  }

}
