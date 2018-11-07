// tslint:disable:newline-before-return
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FormUtilsService } from '@anymind-ng/core';
import { Config } from '../../../../../config';

export enum InputSetPasswordErrors {
  IncorrectPassword = 'incorrectPassword',
  DuplicatedPassword = 'duplicatedPassword',
}

@Component({
  selector: 'plat-input-set-password',
  templateUrl: './input-set-password.component.html',
  styleUrls: ['./input-set-password.component.sass'],
})
export class InputSetPasswordComponent {
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
    this.formGroup.addControl(
      this.controlName,
      new FormControl('', [Validators.required.bind(this), Validators.pattern(Config.patterns.passwordPattern)]),
    );
  }

  public isIncorrectPasswordError = (): boolean => {
    const errors: ValidationErrors | null = this.formGroup.controls[this.controlName].errors;
    return this.isFieldInvalid() && errors && (errors.pattern || errors[InputSetPasswordErrors.IncorrectPassword]);
  };

  public isDuplicatePasswordError = (): boolean => {
    const errors: ValidationErrors | null = this.formGroup.controls[this.controlName].errors;
    return this.isFieldInvalid() && errors && errors[InputSetPasswordErrors.DuplicatedPassword];
  };

  public isRequiredError = (): void => {
    const errors: ValidationErrors | null = this.formGroup.controls[this.controlName].errors;
    return this.isFieldInvalid() && errors && errors.required;
  };

  public isFieldInvalid = (): boolean => this.formUtils.isFieldInvalid(this.formGroup, this.controlName);

  public onFocus = (): void => {
    this.isFocused = true;
  };

  public onBlur = (): void => {
    this.isFocused = false;
  };

  public isPasswordPassRegexp = (): boolean =>
    Config.patterns.passwordPattern.test(this.formGroup.value[this.controlName]);
}
