import { IDashboardExpertComplainsListBindings } from './complains-list';

// tslint:disable:member-ordering
export class DashboardExpertComplainsListComponentController implements IDashboardExpertComplainsListBindings {
  public isSuccess: boolean = true;
  public isError: boolean = false;
  public isInProgress: boolean = false;
  public headerTitle: string;

  public static $inject = [];

  constructor() {

  }

}
