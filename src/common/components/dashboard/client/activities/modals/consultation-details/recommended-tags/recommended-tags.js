(function() {
  /* @ngInject */
  function controller() {
    this.isRecommended = true

    this.recommendConsultation = () => {
      this.isRecommended = !this.isRecommended
    }

    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/activities/modals/consultation-details/recommended-tags/recommended-tags.tpl.html',
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.client.activities.modals.consultation-details.recommended-tags', [
    'pascalprecht.translate',
    'profitelo.components.dashboard.client.activities.modals.consultation-details.conversation-rate'
  ])
    .component('clientRecommendedTags', component)
}())

