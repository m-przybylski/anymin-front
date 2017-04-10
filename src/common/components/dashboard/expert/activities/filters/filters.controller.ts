import {IExpertFiltersComponentBindings} from './filters'
import {IPrimaryDropdownListElement} from '../../../../interface/dropdown-primary/dropdown-primary';

export class ExpertFiltersComponentController implements IExpertFiltersComponentBindings {
  activityList: Array<IPrimaryDropdownListElement> = [{
    name: 'All activities',
    value: 'all-activity'
  },
  {
    name: 'Payouts',
    value: 'payouts'
  },
  {name: 'Calls',
  value: 'calls'
  }]

  public showMobileFilters: boolean
  public showFilters: () => void

  /* @ngInject */
  constructor() {

    this.showMobileFilters = true

    this.showFilters = () => {
      this.showMobileFilters = !this.showMobileFilters
    }

  }

}
