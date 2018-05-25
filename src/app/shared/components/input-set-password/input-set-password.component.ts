import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FormUtilsService } from '@anymind-ng/components';
import { CommonSettingsService } from '../../../../angularjs/common/services/common-settings/common-settings.service';

export enum InputSetPasswordErrors {
  IncorrectPassword = 'IncorrectPassword'
}

@Component({
  selector: 'plat-input-set-password',
  templateUrl: './input-set-password.component.html',
  styleUrls: ['./input-set-password.component.sass']
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

  public readonly textType = 'text';
  public readonly passwordType = 'password';

  public isFocused = false;
  public currentAttribute: string = this.passwordType;

  constructor(public formUtils: FormUtilsService,
              private commonSettingService: CommonSettingsService) {
  }

  public ngOnInit(): void {
    this.formGroup.addControl(this.controlName, new FormControl('', [
      Validators.required
    ]));
  }

  public isIncorrectPassword = (): boolean => {
    const errors: ValidationErrors | null = this.formGroup.controls[this.controlName].errors;
    return this.isFieldInvalid() && errors && errors[InputSetPasswordErrors.IncorrectPassword];
  }

  public isRequiredError = (): void => {
    const errors: ValidationErrors | null = this.formGroup.controls[this.controlName].errors;
    return this.isFieldInvalid() && errors && errors.required;
  }

  public isFieldInvalid = (): boolean =>
    this.formUtils.isFieldInvalid(this.formGroup, this.controlName)

  public onFocus = (): void => {
    this.isFocused = true;
  }

  public onBlur = (): void => {
    this.isFocused = false;
  }

  public displayPassword = (): void => {
    this.currentAttribute = this.textType;
  }

  public hidePassword = (): void => {
    this.currentAttribute = this.passwordType;
  }

  public isPasswordPassRegexp = (): boolean =>
    this.commonSettingService.localSettings.passwordPattern.test(this.formGroup.value[this.controlName])
}
