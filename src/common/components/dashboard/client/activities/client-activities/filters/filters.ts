import * as angular from 'angular'
import {IFilterService} from '../../../../../../services/filter/filter.service'
import * as _ from 'lodash'
import {
  ClientActivitiesService,
  IClientActivitiesQueryParams
} from '../../../../../../services/client-activities/client-activities.service'
import {ExpertProfile} from '../../../../../../models/ExpertProfile'
import {Service} from '../../../../../../models/Service'
import clientActivitesModule from '../../../../../../services/client-activities/client-activities'
import 'common/directives/interface/pro-calendar/pro-calendar'
import 'common/components/interface/dropdown-primary/dropdown-primary'
import 'common/components/interface/dropdown/dropdown'

interface IServiceExpertTuple {
  service: Service
  expert: ExpertProfile
}

/* @ngInject */
function controller($scope: ng.IScope, $filter: IFilterService,
                    clientActivitiesService: ClientActivitiesService) {

  const getServicesDropdownList = () => createDropdownServiceList(this.filters.expertServiceTuples)

  const watchGroup = ['dateFrom', 'dateTo']
  this.filterModel = {}
  this.showMobileFilters = true

  this.showFilters = () => {
    this.showMobileFilters = !this.showMobileFilters
  }

  const createDropdownServiceList = (list: Array<IServiceExpertTuple>) => {
    const mappedList = _.uniqBy(_.map(list, (listItem) =>
      listItem.service), item => item.id)

    return mappedList.map(service => ({
      name: service.name,
      value: service.id
    }))
  }

  const createDropdownExpertsList = (list: any) => {
    const mappedList = _.uniqBy(_.map(list, (listItem: {profile: ExpertProfile}) =>
      listItem.profile), (item) => item.id)

    return mappedList.map((expert) => {
      return {
        name: expert.expertDetails.name,
        value: expert.id
      }
    })
  }

  clientActivitiesService.onQueryParamsChange($scope, (param) => {
    this.selectedType = _.find(
      this.activityTypesList, (type: {value: string, name: string}) => type.value === param.activityType)
    this.selectedService = _.find(
      this.servicesDropdownList, (service: {value: string, name: string}) => service.value === param.serviceId)
    this.selectedExpert = _.find(
      this.expertsDropdownList, (expert: {value: string, name: string}) => expert.value === param.profileId)
  })

  const clearServicesList = () => {
    this.servicesDropdownList = getServicesDropdownList()
    this.secondaryServicesDropdownList = []
  }

  const setActivitiesQueryParams = (queryParams: IClientActivitiesQueryParams) => {
    if (angular.isFunction(this.onSetSearchParams)) {
      this.onSetSearchParams(queryParams)
    }
    clientActivitiesService.setClientActivitiesParam(queryParams)
  }

  this.updateActivityTypeParam = (item: any) => {
    const queryParams = this.filterModel
    queryParams['activityType'] = item.value
    queryParams['serviceId'] = null
    queryParams['profileId'] = null

    setActivitiesQueryParams(queryParams)
    clearServicesList()
  }

  this.updateProfileParam = (item: any) => {
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
        }
      })
      this.servicesDropdownList = createDropdownServiceList(groupServices.true)
      this.secondaryServicesDropdownList = createDropdownServiceList(groupServices.false)
    } else {
      clearServicesList()
    }
  }

  this.mainUpdateServiceParam = (item: any) => {
    const queryParams = this.filterModel
    queryParams['serviceId'] = item.value
    setActivitiesQueryParams(queryParams)
  }

  this.secondUpdateServiceParam = (item: any) => {
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

  this.$onInit = () => {
    this.activityTypesList = this.filters.activityTypes.map((type: string) =>
      ({
        name: $filter('translate')($filter('normalizeTranslationKey')(('DASHBOARD_CLIENT.FILTERS.' + type))),
        value: type
      })
    )

    this.servicesDropdownList = getServicesDropdownList()
    this.expertsDropdownList = createDropdownExpertsList(this.filters.expertServiceTuples)

    this.activityTypesList.unshift({
      name: $filter('translate')($filter('normalizeTranslationKey')(('DASHBOARD_CLIENT.FILTERS.ALL_ACTIVITY')))
    })
  }

  return this
}

const component = {
  template: require('./filters.pug')(),
  controller: controller,
  controllerAs: '$ctrl',
  bindings: {
    filters: '<',
    onSetSearchParams: '<'
  }
}

angular.module('profitelo.components.dashboard.client.activities.client-activities.filters', [
  'pascalprecht.translate',

  clientActivitesModule,
  'profitelo.directives.interface.pro-calendar',
  'profitelo.components.interface.dropdown',
  'profitelo.components.interface.dropdown-primary'
])
.component('clientActivitiesFilters', component)
