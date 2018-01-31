import { IDashboardExpertComplainsListBindings } from './complains-list';

export class DashboardExpertComplainsListComponentController implements IDashboardExpertComplainsListBindings {
  isSuccess: boolean = true;
  isError: boolean = false;
  isInProgress: boolean = false;
  headerTitle: string;

  static $inject = [];

  constructor() {

  }

}
