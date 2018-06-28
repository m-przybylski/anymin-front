// tslint:disable:strict-boolean-expressions
// tslint:disable:no-empty
import { ICheckboxComponentBindings } from './checkbox';

// tslint:disable:member-ordering
export class CheckboxComponentController implements ICheckboxComponentBindings {
  public inputText = '';
  public additionalText = '';
  public name = '';
  public alertText = '';
  public validation = false;
  public ngModel = false;
  public isDisabled = false;
  public ngRequired = false;
  public onChange?: () => void;

  public static $inject = [];

  constructor() {}

  public onClick = (): void => {
    if (!this.isDisabled) {
      this.ngModel = !this.ngModel;
    }

    if (this.onChange) {
      this.onChange();
    }
  }
}
