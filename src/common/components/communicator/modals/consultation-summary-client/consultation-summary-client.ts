namespace profitelo.components.modals.consultationSummaryClient {

  import ICallSummaryService = profitelo.services.callSummary.ICallSummaryService
  import IUrlService = profitelo.services.helper.IUrlService
  import Tag = profitelo.models.Tag
  import CallSummary = profitelo.models.CallSummary

  interface IConsultationSummaryClientControllerScope extends ng.IScope {
    serviceId: string
    expertAvatarUrl: string
    rating: number
    callSummary: CallSummary | null
    chooseExpertsTag: boolean
    recommendServiceTags: Function
    closeModal: Function
    onModalClose: Function
    onTagsSelectChange: Function
    recommendService: Function
    isFullscreen: boolean
    isNavbar: boolean
  }

  class ConsultationSummaryClientController {

    private tags: Array<Tag> = []

    /* @ngInject */
    constructor(private $log: ng.ILogService, private $scope: IConsultationSummaryClientControllerScope,
                private lodash: _.LoDashStatic, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
                private callSummaryService: ICallSummaryService, private urlService: IUrlService,
                private ServiceApi) {

      $scope.isFullscreen = true
      $scope.isNavbar = true

      callSummaryService.onCallSummary(this.onCallSummary)
      this.loadFromExistingCallSummaries()
      this.initScope()
    }

    private initScope = () => {
      this.$scope.callSummary = null
      this.$scope.expertAvatarUrl = ''
      this.$scope.chooseExpertsTag = false

      this.$scope.recommendServiceTags = () => {
        if (this.$scope.callSummary) {
          this.ServiceApi.putServiceRecommendations({
            serviceUsageEventId: this.$scope.callSummary.serviceUsageEventId,
            tags: this.lodash.map(this.tags, tag => tag.id)
          }).$promise.then(this.onRecommendServiceTags, this.onRecommendServiceTagsError)
          this.$scope.closeModal()
        }
      }

      this.$scope.onTagsSelectChange = (tags) =>
        this.tags = tags

      this.$scope.closeModal = () => {
        this.$uibModalInstance.dismiss('cancel')
      }

      this.$scope.onModalClose = () => {
        this.$scope.closeModal()
      }

      this.$scope.recommendService = () => {
        if (this.$scope.callSummary) {
          this.ServiceApi.postServiceRecommendation({
            serviceUsageEventId: this.$scope.callSummary.serviceUsageEventId
          }).$promise.then(this.onRecommendService, this.onRecommendServiceError)
        }
      }
    }

    private setCallSummary = (_callSummary) => {
      this.$scope.callSummary = _callSummary
      const avatar = _callSummary.companyExpertProfile.expertDetails.avatar
      this.$scope.expertAvatarUrl = (avatar) ? this.urlService.resolveFileUrl(avatar) : ''
      this.$scope.rating = _callSummary.service.rating
    }

    private onCallSummary = (data) => {
      this.$log.debug(data)
      const callSummary = data.callSummary
      if (callSummary.service.id === this.$scope.serviceId) {
        this.setCallSummary(callSummary)
      }
    }

    private loadFromExistingCallSummaries = () => {
      const obj = this.callSummaryService.takeCallSummary(this.$scope.serviceId)
      if (obj) {
        this.onCallSummary(obj)
      }
    }

    private onRecommendServiceError = (err) =>
      this.$log.error(err)

    private onRecommendService = (res) =>
      this.$scope.chooseExpertsTag = true

    private onRecommendServiceTags = (res) =>
      this.$log.debug(res)

    private onRecommendServiceTagsError = (err) =>
      this.$log.error(err)
  }

  angular.module('profitelo.components.communicator.modals.consultation-summary-client', [
    'profitelo.components.interface.multiselect',
    'profitelo.services.call-summary',
    'profitelo.services.url',
    'profitelo.swaggerResources',
    'ui.bootstrap',
    'profitelo.components.interface.preloader',
    'ngLodash',
    'profitelo.directives.interface.scrollable'
  ])
    .controller('consultationSummaryClientController', ConsultationSummaryClientController)
}