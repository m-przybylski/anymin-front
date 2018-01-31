import { NoResultsInformationController } from './no-results-information.controller';

export class NoResultsInformationComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = NoResultsInformationController;
  template = require('./no-results-information.html');
  bindings: {[boundProperty: string]: string} = {
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
