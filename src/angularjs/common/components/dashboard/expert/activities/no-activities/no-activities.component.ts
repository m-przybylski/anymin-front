import { ExpertNoActivitiesComponentController } from './no-activities.controller';
export class ExpertNoActivitiesComponent implements ng.IComponentOptions {
  controllerAs: '$ctrl';
  controller: ng.Injectable<ng.IControllerConstructor> = ExpertNoActivitiesComponentController;
  template = require('./no-activities.html');
  bindings: {[boundProperty: string]: string} = {
    isPayoutMethod: '<'
  };
}
