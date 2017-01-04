(function() {
  /* @ngInject */
  function controller($log, HelperService, ServiceApi, modalsService, ViewsApi) {

    this.$onInit = () => {
      this.isCallActivity = !!this.activity.sueProfileServiceTuple

      if (angular.isDefined(this.activity) && this.activity.sueProfileServiceTuple &&
          this.activity.sueProfileServiceTuple.profile.expertDetails.avatar &&
          this.activity.sueProfileServiceTuple.profile.expertDetails.avatar !== null) {
        this.imageUrl = HelperService.fileUrlResolver(this.activity.sueProfileServiceTuple.profile.expertDetails.avatar)
      } else {
        this.imageUrl = null
      }
    }

    this.openActivityDescription = () => {

      const onGetCallDetails = (res) => {
        const expertAvatarFileId = res.expertProfile.expertDetails.avatar

        const onServiceTags = (res) => {
          openClientActivityModal(res[0].tags)
        }

        const onServiceTagsError = (err) => {
          $log.error(err)
        }

        const openClientActivityModal = (userTags = []) => {
          this.ActivityDetailsModalDataObject = {
            expertAvatar: expertAvatarFileId ? HelperService.fileUrlResolver(expertAvatarFileId) : null,
            expert: res.expertProfile,
            recommendedTags: res.recommendedTags,
            service: res.service,
            callCost: res.serviceUsageDetails.callCost,
            startedAt: res.serviceUsageDetails.startedAt,
            callDuration: res.serviceUsageDetails.callDuration,
            callCostPerMinute: res.service.details.price,
            isRecommended: res.isRecommended,
            isRecommendable: res.isRecommendable,
            sueId: this.activity.sueProfileServiceTuple.serviceUsageEvent.id,
            userTags: userTags
          }
          modalsService.createClientSUEActivityDetailsModal(this.ActivityDetailsModalDataObject)
        }

        if (res.isRecommended) {
          ServiceApi.postServicesTags({
            serviceIds: [res.service.id]
          }).$promise.then(onServiceTags, onServiceTagsError)
        } else {
          openClientActivityModal()
        }


      }

      const onGetCallDetailsError = (err) =>
        $log.error(err)

      ViewsApi.getClientDashboardCallDetails({
        sueId: this.activity.sueProfileServiceTuple.serviceUsageEvent.id
      }).$promise.then(onGetCallDetails, onGetCallDetailsError)
    }

    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/activities/client-activities/client-activity/client-activity.tpl.html',
    controller: controller,
    controllerAs: '$ctrl',
    bindings: {
      activity: '<'
    }
  }

  angular.module('profitelo.components.dashboard.client.activities.client-activity', [
    'pascalprecht.translate',
    'profitelo.services.helper',
    'profitelo.filters.money',
    'profitelo.services.modals',
    'profitelo.components.complaints.status'
  ])
    .component('clientActivity', component)
}())
