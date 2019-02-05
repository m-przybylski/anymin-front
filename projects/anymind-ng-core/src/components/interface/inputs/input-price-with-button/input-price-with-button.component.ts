import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormUtilsService } from '../../../../services/form-utils/form-utils.service';

@Component({
  selector: 'am-core-input-price-with-button',
  templateUrl: './input-price-with-button.component.html',
  styleUrls: ['./input-price-with-button.component.sass'],
})
export class InputPriceWithButtonComponent {
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
  public buttonTitle: string;

  @Input()
  public isRequired = false;

  public isFocused = false;

  constructor(public formUtils: FormUtilsService) {}

  public ngOnInit(): void {
    // tslint:disable-next-line:readonly-array
    const inputValidators: ValidatorFn[] = [];
    if (this.isRequired) {
      inputValidators.push(Validators.required);
    }
    this.formGroup.addControl(this.controlName, new FormControl('', inputValidators));
  }

  public isFieldInvalid = (): boolean => this.formUtils.isFieldInvalid(this.formGroup, this.controlName);

  public isFieldValueInvalid = (): boolean => this.isFieldInvalid() && this.formGroup.controls[this.controlName].value;

  public isRequiredError = (): boolean => {
    const controlErrors = this.formGroup.controls[this.controlName].errors;

    if (controlErrors !== null) {
      return this.isFieldInvalid() && controlErrors.required;
    }

    return false;
  };

  public onFocus = (): void => {
    this.isFocused = true;
  };

  public onBlur = (): void => {
    this.isFocused = false;
  };
}
