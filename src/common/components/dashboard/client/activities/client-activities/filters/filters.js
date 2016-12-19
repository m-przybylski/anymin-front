(function() {
  /* @ngInject */
  function controller($scope, $filter, clientActivitiesService) {
    const watchGroup = ['dateFrom', 'dateTo']
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
    })

    const createDropdownServiceList = (list) => {
      const mappedList = _.map(list, (listItem) =>
        listItem.service)

      return mappedList.map((service) => {
        return {
          name: service.details.name,
          value: service.id
        }
      })
    }

    const createDropdownExpertsList = (list) => {
      const mappedList = _.map(list, (listItem) =>
        listItem.profile)

      return mappedList.map((service) => {
        return {
          name: service.expertDetails.name,
          value: service.id
        }
      })
    }

    this.expertsList = createDropdownExpertsList(this.filters.expertServiceTuples)
    const allServicesList = createDropdownServiceList(this.filters.expertServiceTuples)
    this.servicesList = allServicesList


    this.showFilters = () => {
      this.showMobileFilters = !this.showMobileFilters
    }

    clientActivitiesService.onQueryParamsChange($scope, (param) => {

      this.selectedType = _.find(this.activityTypesList, (type) => {
        return type.value === param.activityType
      })

      this.selectedService = _.find(this.servicesList, (service) => {
        return service.value === param.serviceId
      })

      this.selectedExpert= _.find(this.expertsList, (expert) => {
        return expert.value === param.profileId
      })

    })

    clientActivitiesService.onActivitiesResults($scope, (err, results, prevResults) => {


    })

    this.updateActivityTypeParam = (item) => {
      const queryParam = this.filterModel
      queryParam['activityType'] = item.value
      queryParam['serviceId'] = null
      queryParam['profileId'] = null
      clientActivitiesService.setClientActivitiesParam(queryParam)
    }

    this.updateProfileParam = (item) => {
      const queryParam = this.filterModel
      queryParam['profileId'] = item.value
      if (angular.isDefined(queryParam['serviceId'])) {
        console.log('remove service')
        queryParam['serviceId'] = null
      }
      clientActivitiesService.setClientActivitiesParam(queryParam)
      if (angular.isDefined(item.value)) {
        const groupServices = _.groupBy(this.filters.expertServiceTuples, {profile:{id: item.value}})
        this.servicesList = createDropdownServiceList(groupServices.true)
        this.secondaryServicesList = createDropdownServiceList(groupServices.false)
      } else {
        this.servicesList = allServicesList
        this.secondaryServicesList = []
      }
    }


    this.mainUpdateServiceParam = (item) => {
      const queryParam = this.filterModel
      queryParam['serviceId'] = item.value
      clientActivitiesService.setClientActivitiesParam(queryParam)
    }

    this.secondUpdateServiceParam = (item) => {
      const queryParam = this.filterModel
      queryParam['serviceId'] = item.value
      queryParam['profileId'] = null
      clientActivitiesService.setClientActivitiesParam(queryParam)
      this.servicesList = allServicesList
      this.secondaryServicesList = []
    }


    $scope.$watchGroup(watchGroup.map((v) => {
      return '$ctrl.filterModel.' + v
    }), (newValues, oldValues) => {
      let searchQueryParams = {}
      if (!angular.equals(newValues, oldValues)) {
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
    'profitelo.directives.interface.pro-calendar',
    'profitelo.components.interface.dropdown'
  ])
    .component('clientActivitiesFilters', component)
}())
