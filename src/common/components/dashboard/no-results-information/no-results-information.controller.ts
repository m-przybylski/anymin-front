import {INoResultsInformationComponentBindings} from './no-results-information'
import * as angular from 'angular'

export class NoResultsInformationController implements INoResultsInformationComponentBindings {

  iconSrc: string
  informationTitle: string
  informationDescription: string
  buttonTitle: string
  buttonClass: string
  buttonIconLeftClass: string
  buttonIconRightClass: string
  buttonOnClick: () => void
  buttonCallback: () => void

  /* @ngInject */
  constructor() {

    this.buttonCallback = (): void => {
      if (this.buttonOnClick && angular.isFunction(this.buttonOnClick)) {
        this.buttonOnClick()
      }
    }

  }

}
