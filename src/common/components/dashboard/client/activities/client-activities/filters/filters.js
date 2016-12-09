(function() {
  /* @ngInject */
  function controller($scope, $filter, clientActivitiesService) {
    const watchGroup = ['activityType', 'profileId', 'serviceId', 'dateFrom', 'dateTo']
    this.filterModel = {}
    this.showMobileFilters = true
    this.activityTypesList = this.filters.activityTypes.map((type) => {
      return {
        name: $filter('translate')($filter('normalizeTranslationKey')(('DASHBOARD_CLIENT.FILTERS.' + type))),
        value: type
      }
    })

    this.activityTypesList.unshift({
      name: $filter('translate')($filter('normalizeTranslationKey')(('DASHBOARD_CLIENT.FILTERS.ALL_ACTIVITY'))),
      value: null
    })

    this.expertsList = _.uniq(this.filters.experts.map((expert) => {
      return {
        name: expert.expertDetails.name,
        value: expert.id
      }
    }))

    this.expertsList.unshift({
      name: $filter('translate')($filter('normalizeTranslationKey')(('DASHBOARD_CLIENT.FILTERS.ALL_EXPERTS'))),
      value: null
    })

    this.servicesList = _.uniq(this.filters.services.map((service) => {
      return {
        name: service.details.name,
        value: service.id
      }
    }))

    this.servicesList.unshift({
      name: $filter('translate')($filter('normalizeTranslationKey')(('DASHBOARD_CLIENT.FILTERS.ALL_SERVICES'))),
      value: null
    })

    this.showFilters = () => {
      this.showMobileFilters = !this.showMobileFilters
    }

    clientActivitiesService.onQueryParamsChange($scope, (param) => {
    })

    clientActivitiesService.onActivitiesResults($scope, (err, results, prevResults) => {
    })

    $scope.$watchGroup(watchGroup.map((v) => {
      return '$ctrl.filterModel.' + v
    }), (newValues, oldValues) => {
      if (!angular.equals(newValues, oldValues)) {
        let searchQueryParams = {}
        angular.forEach(newValues, (value, idx) => {
          if (angular.isDefined(value)) {
            searchQueryParams[watchGroup[idx]] = value
          }
        })
        clientActivitiesService.setClientActivitiesParam(searchQueryParams)
      }
    })

    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/activities/client-activities/filters/filters.tpl.html',
    controller: controller,
    controllerAs: '$ctrl',
    bindings: {
      filters: '<'
    }
  }

  angular.module('profitelo.components.dashboard.client.activities.client-activities.filters', [
    'pascalprecht.translate',
    'profitelo.services.client-activities-service',
    'profitelo.directives.interface.pro-dropdown',
    'profitelo.directives.interface.pro-calendar'
  ])
    .component('clientActivitiesFilters', component)
}())
