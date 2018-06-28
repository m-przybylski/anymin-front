// tslint:disable:no-require-imports
import { ClientActivityComponentController } from './activity.controller';

// tslint:disable:member-ordering
export class ClientActivityComponent implements ng.IComponentOptions {
  public template = require('./activity.html');
  public controller: ng.Injectable<ng.IControllerConstructor> = ClientActivityComponentController;
  public controllerAs = '$ctrl';
  public bindings: {[boundProperty: string]: string} = {
    activity: '<'
  };
}
