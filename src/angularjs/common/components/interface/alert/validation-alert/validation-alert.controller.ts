import { IValidationAlertBindings } from './validation-alert';

// tslint:disable:member-ordering
export class ValidationAlertComponentController implements IValidationAlertBindings {
  public alertText: string;
  public isVisible: boolean;
  public additionalText?: string;
  public static $inject = [];

  constructor() {

  }
}
