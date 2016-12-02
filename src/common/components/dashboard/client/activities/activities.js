(function() {
  /* @ngInject */
  function controller() {
    this.showMobileFilters = true

    this.showFilters = () => {
      this.showMobileFilters = !this.showMobileFilters
    }

    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/activities/activities.tpl.html',
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.client.activities', [
    'pascalprecht.translate',
    'profitelo.components.dashboard.client.activities.last-activities',
    'profitelo.components.dashboard.client.activities.no-activities',
    'profitelo.components.dashboard.client.activities.filters'
  ])
    .component('clientActivities', component)
}())
