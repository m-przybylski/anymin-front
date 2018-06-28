// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:no-empty
import { ITextareaComponentBindings } from './textarea';

// tslint:disable:member-ordering
export class TextareaComponentController implements ITextareaComponentBindings {
  public id: string;
  public name: string;
  public inputText = '';
  public placeholder: string;
  public alertText: string;
  public maxLength = '';
  public ngModel = '';
  public isFocus = false;
  public isDirty = false;
  public isValid: boolean;
  public validationText: string;
  public onChange?: (description: string) => void;
  public textareaValueLength = 0;
  public ngRequired = false;

  public static $inject = [];

  constructor() {}

  public onFocus = (): void => {
    this.isFocus = true;
    this.isDirty = true;
  }

  public onBlur = (): boolean =>
    this.isFocus = false

  public onDescriptionChange = (textareaValue: string): void =>
    (this.onChange) ? this.onChange(textareaValue) : undefined

  public setTextareaValueLength = (textareaValueLength: number): void => {
   this.textareaValueLength = textareaValueLength;
  }
}
