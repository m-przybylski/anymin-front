import {UrlService} from '../../../../../../services/url/url.service'
import {ViewsApi, ServiceApi} from 'profitelo-api-ng/api/api'
import {MoneyDto, Tag, GetCallDetails, GetServiceTags} from 'profitelo-api-ng/model/models'

export interface IExpertConsultationDetailsScope extends ng.IScope {
}

export class ExpertConsultationDetailsController implements ng.IController {
  public isLoading: boolean = true
  public recommendedTags: Array<any> = []
  public serviceTags: Array<any> = []
  public expertAvatar?: string
  public expertName?: string
  public serviceName: string
  public serviceId: string
  public callCost: MoneyDto
  public startedAt: Date
  public callDuration: number
  public isRecommended: boolean
  public sueId: string
  public recommendedTag: Array<Tag>
  public isRecommendable: boolean
  private callDetails: GetCallDetails

  public complaintReasons: any

  public onModalClose = () =>
    this.$uibModalInstance.dismiss('cancel')

  /* @ngInject */
  constructor(private $log: ng.ILogService, private $scope: IExpertConsultationDetailsScope,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private ServiceApi: ServiceApi,
              private urlService: UrlService, ViewsApi: ViewsApi) {

    ViewsApi.getClientDashboardCallDetailsRoute($scope.$parent.sueId)
    .then((res) => this.onGetCallDetails(res), this.onGetCallDetailsError)

    this.complaintReasons = [
      {
        id: 'id2value',
        isDescriptive: false,
        name: 'DASHBOARD.CLIENT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.REASON_INCOPENTENT_EXPERT',
      },
      {
        id: 'id3value',
        isDescriptive: false,
        name: 'DASHBOARD.CLIENT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.REASON_RUDE_EXPERT',
      },
      {
        id: 'id4value',
        isDescriptive: false,
        name: 'DASHBOARD.CLIENT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.REASON_TECHNICAL_PROBLEMS',
      },
      {
        id: 'id5value',
        isDescriptive: true,
        name: 'DASHBOARD.CLIENT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.REASON_OTHER',
      }
    ]
  }

  private onGetCallDetailsError = (err: any) => {
    this.isLoading = false
    this.$log.error(err)
  }

  private onGetCallDetails = (response: GetCallDetails) => {
    this.callDetails = response
    if (response.isRecommendable) {
      this.ServiceApi.postServicesTagsRoute({
        serviceIds: [response.service.id]
      }).then(this.onServiceTags, this.onServiceTagsError)
    } else {
      this.openExpertActivityModal()
    }
  }

  private onServiceTagsError = (err: any) => {
    this.$log.error(err)
  }

  private onServiceTags = (res: GetServiceTags[]) => {
    this.openExpertActivityModal(res[0]!.tags)
  }

  private openExpertActivityModal = (serviceTags: Array<Tag> = []) => {
    const expertAvatarFileId = this.callDetails.expertProfile.expertDetails!.avatar
    this.expertAvatar = expertAvatarFileId ? this.urlService.resolveFileUrl(expertAvatarFileId) : undefined
    this.expertName = this.callDetails.expertProfile.expertDetails!.name
    this.sueId = this.$scope.$parent.sueId
    this.recommendedTags = this.callDetails.recommendedTags
    this.serviceName = this.callDetails.service.name
    this.serviceId = this.callDetails.service.id
    this.callCost = this.callDetails.serviceUsageDetails.callCost
    this.startedAt = this.callDetails.serviceUsageDetails.startedAt
    this.callDuration = this.callDetails.serviceUsageDetails.callDuration
    this.isRecommended = this.callDetails.isRecommended
    this.isRecommendable = this.callDetails.isRecommendable
    this.serviceTags = serviceTags
    this.isLoading = false
  }

}
