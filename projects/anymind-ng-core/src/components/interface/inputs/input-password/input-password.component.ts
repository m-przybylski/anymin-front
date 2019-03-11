import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtilsService } from '../../../../services/form-utils/form-utils.service';

export enum InputPasswordErrorsEnum {
  IncorrectPassword = 'IncorrectPassword',
  ToManyUnsuccessfulAttempts = 'ToManyUnsuccessfulAttempts',
}

@Component({
  selector: 'am-core-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.sass'],
})
export class InputPasswordComponent {
  @Input('label')
  public labelTrKey: string;

  @Input('placeholder')
  public placeholderTrKey: string;

  @Input()
  public controlName: string;

  @Input()
  public isDisabled?: boolean;

  @Input('form')
  public formGroup: FormGroup;

  @Input()
  public initialFocus = false;

  public isFocused = false;

  constructor(public formUtils: FormUtilsService) {}

  public ngOnInit(): void {
    this.formGroup.addControl(this.controlName, new FormControl('', [Validators.required]));
  }

  public isIncorrectPassword = (): boolean => {
    const controlErrors = this.formGroup.controls[this.controlName].errors;

    if (controlErrors !== null) {
      return this.isFieldInvalid() && controlErrors[InputPasswordErrorsEnum.IncorrectPassword];
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
      return this.isFieldInvalid() && controlErrors[InputPasswordErrorsEnum.ToManyUnsuccessfulAttempts];
    }

    return false;
  };

  public isFieldInvalid = (): boolean => this.formUtils.isFieldInvalid(this.formGroup, this.controlName);

  public onFocus = (): void => {
    this.isFocused = true;
  };

  public onBlur = (): void => {
    this.isFocused = false;
  };
}
