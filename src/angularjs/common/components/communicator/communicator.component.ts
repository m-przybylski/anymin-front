import { CommunicatorComponentController } from './communicator.controller';

// tslint:disable:member-ordering
export class CommunicatorComponent implements ng.IComponentOptions {

  public controller: ng.Injectable<ng.IControllerConstructor> = CommunicatorComponentController;
  public template = require('./communicator.html');
}
