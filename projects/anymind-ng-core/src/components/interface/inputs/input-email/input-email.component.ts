import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormUtilsService } from '../../../../services/form-utils/form-utils.service';
import { Config } from '../../../../config';
import { COMPONENTS_CONFIG } from '../../../../shared/injection-tokens/injection-tokens';

export interface IInputEmailErrors {
  invalid: string;
  alreadyExists: string;
}

@Component({
  selector: 'am-core-input-email',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.sass'],
})
export class InputEmailComponent {
  public static readonly InputEmailErrors: IInputEmailErrors = {
    invalid: 'invalidEmail',
    alreadyExists: 'emailAlreadyExists',
  };

  @Input('label')
  public labelTrKey: string;

  @Input('placeholder')
  public placeholderTrKey: string;

  @Input()
  public tooltipTextKey?: string;

  @Input()
  public controlName: string;

  @Input('form')
  public formGroup: FormGroup;

  @Input()
  public isDisabled?: boolean;

  @Input()
  public initialFocus = false;

  @Input()
  public isRequired = false;

  public isFocused = false;

  constructor(public formUtils: FormUtilsService, @Inject(COMPONENTS_CONFIG) private config: Config) {}

  public ngOnInit(): void {
    this.formGroup.addControl(this.controlName, new FormControl('', this.assignInputValidators()));
  }

  public isFieldInvalid(): boolean {
    return this.formUtils.isFieldInvalid(this.formGroup, this.controlName);
  }

  public isRequiredError(): boolean {
    const controlErrors = this.formGroup.controls[this.controlName].errors;

    if (controlErrors !== null) {
      return this.isFieldInvalid() && controlErrors.required;
    }

    return false;
  }

  public isIncorrectEmail(): boolean {
    const controlErrors = this.formGroup.controls[this.controlName].errors;

    if (controlErrors !== null) {
      return this.isFieldInvalid() && this.formGroup.controls[this.controlName].value && controlErrors.pattern;
    }

    return false;
  }

  public isEmailAlreadyExists(): boolean {
    const controlErrors = this.formGroup.controls[this.controlName].errors;

    if (controlErrors !== null) {
      return this.isFieldInvalid() && controlErrors[InputEmailComponent.InputEmailErrors.alreadyExists];
    }

    return false;
  }

  public onFocus(): void {
    this.isFocused = true;
  }

  public onBlur(): void {
    this.isFocused = false;
  }

  // custom pattern validator instead of Validators.email because https://github.com/angular/angular/issues/16183
  // tslint:disable:readonly-array
  private assignInputValidators(): ValidatorFn[] {
    const inputValidators: ValidatorFn[] = [Validators.pattern(this.config.validation.email.regex)];
    if (this.isRequired) {
      inputValidators.push(Validators.required);
    }

    return inputValidators;
  }
}
