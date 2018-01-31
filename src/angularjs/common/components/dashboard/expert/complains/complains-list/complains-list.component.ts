import { DashboardExpertComplainsListComponentController } from './complains-list.controller';

// tslint:disable:member-ordering
export class DashboardExpertComplainsListComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = DashboardExpertComplainsListComponentController;
  public template = require('./complains-list.html');
  public bindings: {[boundProperty: string]: string} = {
    headerTitle: '@'
  };
}
