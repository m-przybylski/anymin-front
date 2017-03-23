import {INoContentMessageComponentBindings} from './no-content-message'
export class NoContentMessageComponentController implements INoContentMessageComponentBindings {

  iconSrc: string
  messageTitle: string
  messageDescription: string
  buttonTitle: string
  buttonClass: string
  buttonIconLeftClass: string
  buttonIconRightClass: string

  /* @ngInject */
  constructor() {}

}
