// tslint:disable:prefer-method-signature
// tslint:disable:no-import-side-effect
import * as angular from 'angular';
import 'angular-translate';
import { NoResultsInformationComponent } from './no-results-information.component';

export interface INoResultsInformationComponentBindings extends ng.IController {
  iconSrc: string;
  informationTitle: string;
  informationDescription: string;
  buttonTitle: string;
  buttonClass: string;
  buttonIconLeftClass: string;
  buttonIconRightClass: string;
  buttonOnClick: () => void;
}

const noResultsInformationModule = angular.module('profitelo.components.dashboard.no-results-information-message', [
  'pascalprecht.translate'
])
  .component('noResultsInformation', new NoResultsInformationComponent())
  .name;

export default noResultsInformationModule;
