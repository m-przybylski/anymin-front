import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormUtilsService } from '../../../../services/form-utils/form-utils.service';

export type InputTypes = 'tel' | 'number';

@Component({
  selector: 'am-input-card-number',
  templateUrl: './input-card-number.component.html',
  styleUrls: ['./input-card-number.component.sass'],
})
export class InputCardNumberComponent {
  @Input('label')
  public labelTrKey: string;

  @Input('placeholder')
  public placeholderTrKey: string;

  @Input('errorTextKey')
  public errorTrKey: string;

  @Input()
  public isDisabled?: boolean;

  @Input()
  public controlName: string;

  @Input('form')
  public formGroup: FormGroup;

  @Input()
  public inputMask?: '';

  @Input()
  public inputType: InputTypes;

  @Input()
  public initialFocus = false;

  @Input()
  public isRequired = false;

  @Input()
  public isWidget: boolean;

  public isFocused = false;

  @Output()
  public creditCardType: EventEmitter<string> = new EventEmitter();

  constructor(public formUtils: FormUtilsService) {}

  public ngOnInit(): void {
    // tslint:disable-next-line:readonly-array
    const inputValidators: ValidatorFn[] = [];
    if (this.isRequired) {
      inputValidators.push(Validators.required);
    }
    this.formGroup.addControl(this.controlName, new FormControl('', inputValidators));
  }

  public isFieldInvalid(): boolean {
    return this.formUtils.isFieldInvalid(this.formGroup, this.controlName);
  }

  public isFieldValueInvalid(): boolean {
    return this.isFieldInvalid() && this.formGroup.controls[this.controlName].value;
  }

  public isRequiredError(): boolean {
    const controlErrors = this.formGroup.controls[this.controlName].errors;

    if (controlErrors !== null) {
      return this.isFieldInvalid() && controlErrors.required;
    }

    return false;
  }

  public onFocus(): void {
    this.isFocused = true;
  }

  public onBlur(): void {
    this.isFocused = false;
  }

  public onCreditCardTypeChange(creditCardType: string): void {
    this.creditCardType.next(creditCardType);
  }
}
