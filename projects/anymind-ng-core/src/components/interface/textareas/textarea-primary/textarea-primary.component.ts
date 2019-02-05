import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtilsService } from '../../../../services/form-utils/form-utils.service';
import { ValidatorFn } from '@angular/forms/src/directives/validators';

@Component({
  selector: 'am-core-textarea-primary',
  templateUrl: './textarea-primary.component.html',
  styleUrls: ['./textarea-primary.component.sass'],
})
export class TextareaPrimaryComponent implements OnInit {
  @Input('label')
  public labelTrKey: string;

  @Input('placeholder')
  public placeholderTrKey: string;

  @Input('errorTextKey')
  public errorTrKey: string;

  @Input()
  public controlName: string;

  @Input('form')
  public formGroup: FormGroup;

  @Input()
  public minLength = 0;

  @Input()
  public maxLength?: number;

  @Input()
  public initialFocus = false;

  @Input()
  public isDisabled = false;

  @Input()
  public isRequired?: boolean;

  public isFocused = false;
  public inputValue = '';

  constructor(public formUtils: FormUtilsService) {}

  public isRequiredError = (): boolean => {
    const controlNameErrors = this.formGroup.controls[this.controlName].errors;

    if (controlNameErrors !== null) {
      return this.isFieldInvalid() && controlNameErrors.required;
    } else {
      return false;
    }
  };

  public ngOnInit(): void {
    this.formGroup.addControl(this.controlName, new FormControl('', this.getValidators()));
  }

  public isFieldValueInvalid = (): boolean => this.isFieldInvalid() && this.formGroup.controls[this.controlName].value;

  public isFieldInvalid = (): boolean => this.formUtils.isFieldInvalid(this.formGroup, this.controlName);

  public onFocus = (): void => {
    this.isFocused = true;
  };

  public onBlur = (): void => {
    this.isFocused = false;
  };

  // tslint:disable:readonly-array
  private getValidators = (): ValidatorFn[] =>
    this.getRequiredValidator(this.getMinLengthValidator(this.getMaxLengthValidator([])));

  private getMinLengthValidator = (arr: ValidatorFn[]): ValidatorFn[] =>
    this.minLength > 0 ? [...arr, Validators.minLength(this.minLength)] : arr;

  private getMaxLengthValidator = (arr: ValidatorFn[]): ValidatorFn[] =>
    typeof this.maxLength !== 'undefined' ? [...arr, Validators.maxLength(this.maxLength)] : arr;

  private getRequiredValidator = (arr: ValidatorFn[]): ValidatorFn[] =>
    this.isRequired ? [...arr, Validators.required] : arr;
}
