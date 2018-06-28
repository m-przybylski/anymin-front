// tslint:disable:no-require-imports
import { SingleServiceComponentController } from './single-service.controller';

// tslint:disable:member-ordering
export class SingleServiceComponent implements ng.IComponentOptions {
  public template = require('./single-service.html');
  public controller: ng.Injectable<ng.IControllerConstructor> = SingleServiceComponentController;
  public bindings: {[boundProperty: string]: string} = {
    onModalClose: '<',
    serviceDetails: '<'
  };
}
