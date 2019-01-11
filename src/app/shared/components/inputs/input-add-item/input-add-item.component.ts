// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:no-null-keyword

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormUtilsService } from '@anymind-ng/core';

export interface IValidatorsErrorMsg {
  [key: string]: {
    code: string;
    text: string;
  };
}

@Component({
  selector: 'plat-add-item',
  templateUrl: './input-add-item.component.html',
  styleUrls: ['./input-add-item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputAddItemComponent {
  @Input('label')
  public labelTrKey: string;
  @Input('placeholder')
  public placeholderTrKey: string;

  @Input()
  public isDisabled = false;
  @Input()
  public isRequired = false;
  @Input()
  public pattern?: RegExp;

  @Output()
  public valueAdded = new EventEmitter<string>();
  @Input()
  public isChangeOnSubmit = true;
  @Input()
  public initialFocus = false;
  public isFocused = false;

  @Input()
  public inputFormControl: FormControl;

  private isBlured = false;
  private readonly errorsMsg: IValidatorsErrorMsg = {
    pattern: {
      code: 'pattern',
      text: 'VALIDATOR.ERROR.PATTERN',
    },
    required: {
      code: 'required',
      text: 'VALIDATOR.ERROR.REQUIRED',
    },
  };

  constructor(public formUtils: FormUtilsService) {}

  public ngOnInit(): void {
    /**
     * setting up internal validators based on required and pattern input
     */
    this.inputFormControl.setValidators(this.createValidator());
  }

  public showValidationAlert(): string {
    const controlErrors = this.inputFormControl.errors;
    // const controlValue = this.inputFormControl.value;
    if (controlErrors !== null) {
      const errorCode = Object.keys(controlErrors)[0];

      return Object.keys(this.errorsMsg).includes(errorCode) ? this.errorsMsg[errorCode].text : errorCode;
    } else {
      return '';
    }
  }

  public onBlur(): void {
    this.isBlured = true;
    this.inputFormControl.updateValueAndValidity();
    this.isFocused = false;
  }

  public onFocus = (): void => {
    this.inputFormControl.setErrors(null);
    this.isFocused = true;
    this.isBlured = false;
  };

  public onAddLinkClick(): void {
    this.onAddItem();
  }

  public onEnter(): void {
    this.onBlur();
    this.onAddItem();
  }

  public isFieldInvalid(): boolean {
    return this.inputFormControl.touched && this.inputFormControl.invalid && this.isBlured;
  }

  private createValidator(): ValidatorFn {
    // tslint:disable-next-line:cyclomatic-complexity
    const validate = (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      /**
       * it is fine to do coercion here, because '', null, undefined is evaluated to false;
       * the only problem is 0;
       */
      if (this.isRequired && !value && value !== 0) {
        return { [this.errorsMsg.required.code]: this.errorsMsg.required.text };
      }
      /** if filed is not required and value is empty no need to checkout for patter */
      if (!this.isRequired && value === '') {
        return null;
      }

      if (this.pattern !== undefined && !this.pattern.test(value)) {
        return { [this.errorsMsg.pattern.code]: this.errorsMsg.pattern.text };
      }

      return null;
    };

    return validate;
  }

  private onAddItem(): void {
    if (!this.isDisabled && this.inputFormControl.valid && this.inputFormControl.value) {
      this.valueAdded.emit(this.inputFormControl.value);
    }
  }
}
