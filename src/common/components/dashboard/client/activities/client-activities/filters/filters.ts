(function() {
  /* @ngInject */
  function controller($scope: ng.IScope, $filter, clientActivitiesService) {
    const watchGroup = ['dateFrom', 'dateTo']
    this.filterModel = {}
    this.showMobileFilters = true

    this.showFilters = () => {
      this.showMobileFilters = !this.showMobileFilters
    }

    this.activityTypesList = this.filters.activityTypes.map(type =>
      ({
        name: $filter('translate')($filter('normalizeTranslationKey')(('DASHBOARD_CLIENT.FILTERS.' + type))),
        value: type
      })
    )

    this.activityTypesList.unshift({
      name: $filter('translate')($filter('normalizeTranslationKey')(('DASHBOARD_CLIENT.FILTERS.ALL_ACTIVITY')))
    })

    // TODO to be remove on lodash update to 4.00
    function uniqueBy(a, key) {
      const seen = new Set()
      return a.filter(item => {
        const k = key(item)
        return seen.has(k) ? false : seen.add(k)
      })
    }

    const createDropdownServiceList = (list: any) => {
      const mappedList = uniqueBy(_.map(list, (listItem: {service: Service}) => listItem.service), item => item.id)

      return mappedList.map(service => ({
          name: service.details.name,
          value: service.id
        }))
    }

    const createDropdownExpertsList = (list: any) => {
      const mappedList = uniqueBy(_.map(list, (listItem: {profile: Profile}) =>
        listItem.profile), (item) => item.id)

      return mappedList.map((expert) => {
        return {
          name: expert.expertDetails.name,
          value: expert.id
        }
      })
    }

    const allServicesDropdownList = createDropdownServiceList(this.filters.expertServiceTuples)
    this.expertsDropdownList = createDropdownExpertsList(this.filters.expertServiceTuples)
    this.servicesDropdownList = allServicesDropdownList

    clientActivitiesService.onQueryParamsChange($scope, (param) => {
      this.selectedType = _.find(
        this.activityTypesList, (type: {value: string, name: string}) => type.value === param.activityType)
      this.selectedService = _.find(
        this.servicesDropdownList, (service: {value: string, name: string}) => service.value === param.serviceId)
      this.selectedExpert= _.find(
        this.expertsDropdownList, (expert: {value: string, name: string}) => expert.value === param.profileId)
    })

    const clearServicesList = () => {
      this.servicesDropdownList = allServicesDropdownList
      this.secondaryServicesDropdownList = []
    }

    const setActivitiesQueryParams = (queryParams) => {
      if (angular.isFunction(this.onSetSearchParams)) {
        this.onSetSearchParams(queryParams)
      }
      clientActivitiesService.setClientActivitiesParam(queryParams)
    }


    this.updateActivityTypeParam = (item) => {
      const queryParams = this.filterModel
      queryParams['activityType'] = item.value
      queryParams['serviceId'] = null
      queryParams['profileId'] = null
      setActivitiesQueryParams(queryParams)
      clearServicesList()
    }

    this.updateProfileParam = (item) => {
      const queryParams = this.filterModel
      queryParams['profileId'] = item.value
      if (angular.isDefined(queryParams['serviceId'])) {
        queryParams['serviceId'] = null
      }

      setActivitiesQueryParams(queryParams)

      if (angular.isDefined(item.value)) {
        const groupServices: any = _.groupBy(this.filters.expertServiceTuples, {
          profile: {
            id: item.value
          }})
        this.servicesDropdownList = createDropdownServiceList(groupServices.true)
        this.secondaryServicesDropdownList = createDropdownServiceList(groupServices.false)
      } else {
        clearServicesList()
      }
    }

    this.mainUpdateServiceParam = (item) => {
      const queryParams = this.filterModel
      queryParams['serviceId'] = item.value
      setActivitiesQueryParams(queryParams)
    }

    this.secondUpdateServiceParam = (item) => {
      const queryParams = this.filterModel
      queryParams['serviceId'] = item.value
      queryParams['profileId'] = null
      setActivitiesQueryParams(queryParams)
      clearServicesList()
    }


    $scope.$watchGroup(watchGroup.map((v) => {
      return '$ctrl.filterModel.' + v
    }), (newValues, oldValues) => {
      let searchQueryParams = this.filterModel
      if (!angular.equals(newValues, oldValues)) {
        angular.forEach(newValues, (value, idx) => {
          if (angular.isDefined(value)) {
            searchQueryParams[watchGroup[idx]] = value
          }
        })
        setActivitiesQueryParams(searchQueryParams)
      }
    })

    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/activities/client-activities/filters/filters.tpl.html',
    controller: controller,
    controllerAs: '$ctrl',
    bindings: {
      filters: '<',
      onSetSearchParams: '<'
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
