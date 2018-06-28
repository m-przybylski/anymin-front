// tslint:disable:readonly-array
import { IExpertEmployeesFiltersComponentBindings } from './filters';
import { ModalsService } from '../../../../../services/modals/modals.service';

// tslint:disable:member-ordering
export class ExpertEmployeesFiltersComponentController implements IExpertEmployeesFiltersComponentBindings {

  public checkAllEmployees: boolean;
  public areEmployees: boolean;
  public showMobileFilters: boolean;
  public showFilters: () => void;
  public onModalCloseCallback: () => void;

  public static $inject = ['modalsService'];

    constructor(private modalsService: ModalsService) {

    this.checkAllEmployees = false;
    this.areEmployees = true;

    this.showMobileFilters = true;

    this.showFilters = (): void => {
      this.showMobileFilters = !this.showMobileFilters;
    };

  }

  public openInviteEmployeesModal = (): void => {
    this.modalsService.createExpertInviteEmployeesModal(this.onModalCloseCallback);
  }

}
