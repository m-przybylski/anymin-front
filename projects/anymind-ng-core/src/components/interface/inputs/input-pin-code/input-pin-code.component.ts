import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtilsService } from '../../../../services/form-utils/form-utils.service';
import { Config } from '../../../../config';
import { COMPONENTS_CONFIG } from '../../../../shared/injection-tokens/injection-tokens';

export enum InputPinCodeErrorsEnum {
  IncorrectPinCode = 'IncorrectPinCode',
  ToManyUnsuccessfulAttempts = 'ToManyUnsuccessfulAttempts',
}

@Component({
  selector: 'am-core-input-pin-code',
  templateUrl: './input-pin-code.component.html',
  styleUrls: ['./input-pin-code.component.sass'],
})
export class InputPinCodeComponent {
  @Input('label')
  public labelTrKey: string;

  @Input('placeholder')
  public placeholderTrKey: string;

  @Input()
  public isDisabled?: boolean;

  @Input()
  public controlName: string;

  @Input('form')
  public formGroup: FormGroup;

  @Input()
  public initialFocus = false;

  @Input()
  public inputMask = this.config.inputMasks.pinNumber;

  public isFocused = false;
  public label: string;

  constructor(public formUtils: FormUtilsService, @Inject(COMPONENTS_CONFIG) private config: Config) {}

  public ngOnInit(): void {
    this.formGroup.addControl(
      this.controlName,
      new FormControl('', [Validators.required, Validators.minLength(this.config.inputsMinLength.pinNumber)]),
    );
  }

  public isFieldInvalid = (): boolean => this.formUtils.isFieldInvalid(this.formGroup, this.controlName);

  // tslint:disable-next-line
  public isIncorrectPinCode = (): boolean => {
    const controlErrors = this.formGroup.controls[this.controlName].errors;
    if (controlErrors !== null) {
      return (
        (this.isFieldInvalid() && controlErrors[InputPinCodeErrorsEnum.IncorrectPinCode]) ||
        (this.isFieldInvalid() &&
          controlErrors.minlength &&
          this.formGroup.controls[this.controlName].value.length !== 0 &&
          !this.isFocused)
      );
    }

    return false;
  };

  public isRequiredError = (): boolean => {
    const controlErrors = this.formGroup.controls[this.controlName].errors;
    if (controlErrors !== null) {
      return this.isFieldInvalid() && controlErrors.required;
    }

    return false;
  };

  public isToManyUnsuccessfulAttempts = (): boolean => {
    const controlErrors = this.formGroup.controls[this.controlName].errors;

    if (controlErrors !== null) {
      return this.isFieldInvalid() && controlErrors[InputPinCodeErrorsEnum.ToManyUnsuccessfulAttempts];
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
