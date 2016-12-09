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
    templateUrl: 'components/dashboard/client/activities/last-activities/filters/filters.tpl.html',
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.client.activities.last-activities.filters', [
    'pascalprecht.translate',
    'profitelo.directives.interface.pro-dropdown',
    'profitelo.directives.interface.pro-calendar'
  ])
    .component('clientActivitiesFilters', component)
}())
