/* istanbul ignore next function */
(function() {

  function controller($log, $scope, lodash, $uibModalInstance, callSummaryService, ServiceApi, helperService) {

    $scope.callSummary = null
    $scope.expertAvatarUrl = ''
    $scope.chooseExpertsTag = false
    let tags = []

    const setCallSummary = (_callSummary) => {
      $scope.callSummary = _callSummary
      const avatar = _callSummary.companyExpertProfile.expertDetails.avatar
      $scope.expertAvatarUrl = (avatar) ? helperService.fileUrlResolver(avatar) : ''
      $scope.rating = _callSummary.service.rating
    }

    const onCallSummary = (data) => {
      $log.debug(data)
      const callSummary = data.callSummary
      if (callSummary.service.id === $scope.serviceId) {
        setCallSummary(callSummary)
      }
    }

    const loadFromExistingCallSummaries = () => {
      const obj = callSummaryService.takeCallSummary($scope.serviceId)
      if (obj) {
        onCallSummary(obj)
      }
    }

    callSummaryService.onCallSummary(onCallSummary)

    loadFromExistingCallSummaries()

    $scope.closeModal = () => {
      $uibModalInstance.dismiss('cancel')
    }

    $scope.onModalClose = () => {
      $scope.closeModal()
    }

    const onRecommendServiceError = (err) =>
      $log.error(err)

    const onRecommendService = (res) => {
      $scope.chooseExpertsTag = true
    }

    $scope.recommendService = () => {
      ServiceApi.postServiceRecommendation({
        serviceUsageEventId: $scope.callSummary.serviceUsageEventId
      }).$promise.then(onRecommendService, onRecommendServiceError)
    }

    const onRecommendServiceTags = (res) =>
      $log.debug(res)

    const onRecommendServiceTagsError = (err) =>
      $log.error(err)

    $scope.recommendServiceTags = () => {
      ServiceApi.putServiceRecommendations({
        serviceUsageEventId: $scope.callSummary.serviceUsageEventId,
        tags: lodash.map(tags, tag => tag.id)
      }).$promise.then(onRecommendServiceTags, onRecommendServiceTagsError)
      $scope.closeModal()
    }

    $scope.onTagsSelectChange = (_tags) =>
      tags = _tags

    return this
  }

  angular.module('profitelo.components.communicator.modals.consultation-summary-client', [
    'profitelo.components.interface.multiselect',
    'profitelo.services.call-summary',
    'profitelo.services.helper',
    'profitelo.swaggerResources',
    'ui.bootstrap',
    'profitelo.components.interface.preloader',
    'ngLodash'
  ])
    .controller('consultationSummaryClientController', controller)

}())