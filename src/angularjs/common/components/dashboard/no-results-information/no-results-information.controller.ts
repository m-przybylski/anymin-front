// tslint:disable:strict-boolean-expressions
import { INoResultsInformationComponentBindings } from './no-results-information';
import * as angular from 'angular';

// tslint:disable:member-ordering
export class NoResultsInformationController implements INoResultsInformationComponentBindings {

  public iconSrc: string;
  public informationTitle: string;
  public informationDescription: string;
  public buttonTitle: string;
  public buttonClass: string;
  public buttonIconLeftClass: string;
  public buttonIconRightClass: string;
  public buttonOnClick: () => void;
  public buttonCallback: () => void;

  public static $inject = [];

  constructor() {

    this.buttonCallback = (): void => {
      if (this.buttonOnClick && angular.isFunction(this.buttonOnClick)) {
        this.buttonOnClick();
      }
    };

  }

}
