// tslint:disable:no-require-imports
import { ExpertNoActivitiesComponentController } from './no-activities.controller';
// tslint:disable:member-ordering
export class ExpertNoActivitiesComponent implements ng.IComponentOptions {
  public controllerAs: '$ctrl';
  public controller: ng.Injectable<ng.IControllerConstructor> = ExpertNoActivitiesComponentController;
  public template = require('./no-activities.html');
  public bindings: {[boundProperty: string]: string} = {
    isPayoutDataAlertVisible: '<'
  };
}
