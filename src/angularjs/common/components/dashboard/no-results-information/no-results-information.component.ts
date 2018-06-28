// tslint:disable:no-require-imports
import { NoResultsInformationController } from './no-results-information.controller';

// tslint:disable:member-ordering
export class NoResultsInformationComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = NoResultsInformationController;
  public template = require('./no-results-information.html');
  public bindings: {[boundProperty: string]: string} = {
    iconSrc: '@',
    informationTitle: '@',
    informationDescription: '@',
    buttonTitle: '@',
    buttonClass: '@',
    buttonIconLeftClass: '@',
    buttonIconRightClass: '@',
    buttonOnClick: '<'
  };
}
