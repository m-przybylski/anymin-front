// tslint:disable:readonly-array
// tslint:disable:no-empty
import { IInputPasswordComponentBindings } from './input-password';

// tslint:disable:member-ordering
export class InputPasswordComponentController implements IInputPasswordComponentBindings {
  public id: string;
  public name: string;
  public type = 'password';
  public inputText = '';
  public placeholder: string;
  public validationText: string;
  public isValid: boolean;
  public ngRequired = false;
  public ngModel: string;
  public isFocus = false;
  public isDirty = false;
  public onChange = '';
  public readonly maxLength = 64;

  public static $inject = [];

  constructor() {}

  public onFocus = (): void => {
    this.isFocus = true;
    this.isDirty = true;
  }

  public onBlur = (): void => {
    this.isFocus = false;
  }
}
