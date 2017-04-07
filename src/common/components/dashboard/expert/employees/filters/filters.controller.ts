import {IExpertEmployeesFiltersComponentBindings} from './filters'

export class ExpertEmployeesFiltersComponentController implements IExpertEmployeesFiltersComponentBindings {

  public checkAllEmployees: boolean
  public areEmployees: boolean
  public showMobileFilters: boolean
  public showFilters: () => void

  /* @ngInject */
  constructor() {

    this.checkAllEmployees = false
    this.areEmployees = true

    this.showMobileFilters = true

    this.showFilters = () => {
      this.showMobileFilters = !this.showMobileFilters
    }

    }

}
