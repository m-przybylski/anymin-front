import { ExpertNavigationComponentController } from './navigation.controller';

// tslint:disable:member-ordering
export class ExpertNavigationComponent implements ng.IComponentOptions {
  public controllerAs: '$ctrl';
  public controller: ng.Injectable<ng.IControllerConstructor> = ExpertNavigationComponentController;
  public template = require('./navigation.html');
}
