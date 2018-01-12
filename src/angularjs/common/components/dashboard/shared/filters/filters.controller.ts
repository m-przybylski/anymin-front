import * as _ from 'lodash'
import * as angular from 'angular'
import {GetActivityFilters, ServiceFilter, ExpertFilter, FinancialOperation} from 'profitelo-api-ng/model/models'
import {IDashboardFiltersComponentBindings} from './filters'
import {IPrimaryDropdownListElement} from '../../../interface/dropdown-primary/dropdown-primary'
import {ActivitiesQueryParams} from '../../../../services/dashboard-activites/activities-query-params'
import {UserService} from '../../../../services/user/user.service'
import {TranslatorService} from '../../../../services/translator/translator.service'

interface IDropdownList {
  name: string,
  value: string
}

export interface IDashboardFiltersComponentScope extends ng.IScope {
  filters: {},
  accountType: FinancialOperation.AccountTypeEnum,
  onSetSearchParams: () => void
}

export class DashboardFiltersComponentController implements IDashboardFiltersComponentBindings {

  public onSetSearchParams: (queryParams: ActivitiesQueryParams) => void
  public filters: GetActivityFilters
  public showMobileFilters: boolean
  public toggleFilters: () => void
  public isClientDashboard: boolean

  public activityTypesList: IPrimaryDropdownListElement[]
  public servicesDropdownList: IPrimaryDropdownListElement[]
  public expertsDropdownList: IPrimaryDropdownListElement[]

  public selectedType?: IPrimaryDropdownListElement
  public selectedService?: IPrimaryDropdownListElement
  public selectedExpert?: IPrimaryDropdownListElement
  public secondaryServicesDropdownList: IPrimaryDropdownListElement[]
  public accountType: FinancialOperation.AccountTypeEnum
  public isCompany: boolean = false
  public watchGroup: string[] = ['dateFrom', 'dateTo']

  $onInit = (): void => {
    this.activityTypesList = this.filters.activityTypes.map((type: string) =>
      ({
        name: this.translatorService.translate('DASHBOARD.FILTERS.' + type),
        value: type
      })
    )

    this.isClientDashboard = this.accountType === FinancialOperation.AccountTypeEnum.CLIENT

    if (this.filters.services) {
      this.servicesDropdownList = this.createDropdownServiceList(this.filters.services)
    }
    if (this.filters.experts) {
      this.expertsDropdownList = this.createDropdownExpertsList(this.filters.experts)
    }

    this.activityTypesList.unshift({
      name: this.translatorService.translate('DASHBOARD.FILTERS.ALL_ACTIVITY'),
      value: undefined
    })
  }

  static $inject = ['translatorService', '$scope', 'userService'];

    constructor(private translatorService: TranslatorService,
              $scope: IDashboardFiltersComponentScope,
              userService: UserService) {

    this.showMobileFilters = true

    this.toggleFilters = (): void => {
      this.showMobileFilters = !this.showMobileFilters
    }

    userService.getUser().then((session) => {
      this.isCompany = session.isCompany
    })

    $scope.$watchGroup(this.watchGroup.map((v) => '$ctrl.filterModel.' + v), (newValues, oldValues) => {
      if (!angular.equals(newValues, oldValues)) {
        angular.forEach(newValues, (value, idx) => {
          if (angular.isDefined(value)) {
            const queryParams = new ActivitiesQueryParams
            queryParams.setActivityType(this.selectedType!.value)
            queryParams.setServiceId(this.selectedService!.value)
            queryParams.setProfileId(this.selectedExpert!.value)
            if (idx === 'dateTo') {
              queryParams.setDateTo(value)
              this.onSetSearchParams(queryParams)
            } else if (idx === 'dateFrom') {
              queryParams.setDateFrom(value)
              this.onSetSearchParams(queryParams)
            }
          }
        })
      }
    })
  }

  public setupServicesList = (): void => {
    if (this.filters.services) {
      this.servicesDropdownList = this.createDropdownServiceList(this.filters.services)
    }
    this.secondaryServicesDropdownList = []
  }

  public updateActivityTypeParam = (item: IPrimaryDropdownListElement): void => {
    const queryParams = new ActivitiesQueryParams
    queryParams.setAccountType(this.accountType)
    queryParams.setActivityType(item.value)
    queryParams.setServiceId(undefined)
    queryParams.setProfileId(undefined)

    this.onSetSearchParams(queryParams)
    this.setupServicesList()
    this.setSelectedFilters(queryParams)
  }

  public updateProfileParam = (item: IPrimaryDropdownListElement): void => {
    const queryParams = new ActivitiesQueryParams
    queryParams.setAccountType(this.accountType)
    queryParams.setProfileId(item.value)
    queryParams.setServiceId(undefined)

    this.onSetSearchParams(queryParams)
    if (item.value && this.filters.services) {
      const groupServices = _.groupBy(this.filters.services, {
        expertId: item.value
      })
      if (groupServices.true) {
        this.servicesDropdownList = this.createDropdownServiceList(groupServices.true)
      }
      if (groupServices.false) {
        this.secondaryServicesDropdownList = this.createDropdownServiceList(groupServices.false)
      }
    } else {
      this.setupServicesList()
    }
    this.setSelectedFilters(queryParams)
  }

  public mainUpdateServiceParam = (item: IPrimaryDropdownListElement): void => {
    const queryParams = new ActivitiesQueryParams
    queryParams.setAccountType(this.accountType)
    queryParams.setServiceId(item.value)
    if (this.selectedExpert) {
      queryParams.setProfileId(this.selectedExpert.value)
    }
    this.onSetSearchParams(queryParams)
    this.setSelectedFilters(queryParams)
  }

  public secondUpdateServiceParam = (item: IPrimaryDropdownListElement): void => {
    const queryParams = new ActivitiesQueryParams
    queryParams.setAccountType(this.accountType)
    queryParams.setServiceId(item.value)
    queryParams.setProfileId(undefined)
    this.onSetSearchParams(queryParams)
    this.setupServicesList()
    this.setSelectedFilters(queryParams)
  }

  private setSelectedFilters = (queryParams: ActivitiesQueryParams): void => {
    this.selectedType = _.find(
      this.activityTypesList,
      (type: {value: string, name: string}) => type.value === String(queryParams.getActivityType()))
    this.selectedService = _.find(
      this.servicesDropdownList,
      (service: {value: string, name: string}) => service.value === queryParams.getServiceId())
    this.selectedExpert = _.find(
      this.expertsDropdownList,
      (expert: {value: string, name: string}) => expert.value === queryParams.getProfileId())
  }

  private createDropdownServiceList = (list: ServiceFilter[]): IDropdownList[] => list.map(service => (
    {
      name: service.name,
      value: service.id
    }))

  private createDropdownExpertsList = (list: ExpertFilter[]): IDropdownList[] => list.map((expert) => (
    {
      name: expert.name,
      value: expert.id
    }
  ))

}
