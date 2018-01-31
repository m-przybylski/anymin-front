import { ICheckboxComponentBindings } from './checkbox';

// tslint:disable:member-ordering
export class CheckboxComponentController implements ICheckboxComponentBindings {
  public inputText: string = '';
  public additionalText: string = '';
  public name: string = '';
  public alertText: string = '';
  public validation: boolean = false;
  public ngModel: boolean = false;
  public isDisabled: boolean = false;
  public ngRequired: boolean = false;
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
