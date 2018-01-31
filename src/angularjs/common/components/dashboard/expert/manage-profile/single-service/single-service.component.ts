import { SingleServiceComponentController } from './single-service.controller';

export class SingleServiceComponent implements ng.IComponentOptions {
  template = require('./single-service.html');
  controller: ng.Injectable<ng.IControllerConstructor> = SingleServiceComponentController;
  bindings: {[boundProperty: string]: string} = {
    onModalClose: '<',
    serviceDetails: '<'
  };
}
