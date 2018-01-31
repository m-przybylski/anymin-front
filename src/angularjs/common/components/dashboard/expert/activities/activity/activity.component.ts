import { ExpertActivityComponentController } from './activity.controller';

// tslint:disable:member-ordering
export class ExpertActivityComponent implements ng.IComponentOptions {
  public template = require('./activity.html');
  public controller: ng.Injectable<ng.IControllerConstructor> = ExpertActivityComponentController;
  public bindings: {[boundProperty: string]: string} = {
    activity: '<'
  };
}
