// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
import { Component, HostListener, Input } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormUtilsService } from '@anymind-ng/core';
import { Config } from '../../../../../config';

export enum InputAddItemComponentStatusEnum {
  ValueExist = 'ValueExist',
  IncorrectValue = 'IncorrectValue'
}

@Component({
  selector: 'plat-input-link',
  templateUrl: './input-add-item.component.html',
  styleUrls: ['./input-add-item.component.sass'],
})
export class InputAddItemComponent {

  @Input('label')
  public labelTrKey: string;

  @Input('placeholder')
  public placeholderTrKey: string;

  @Input()
  public controlName: string;

  @Input('form')
  public formGroup: FormGroup;

  @Input()
  public isRequired ? = false;

  @Input()
  public pattern?: RegExp;

  @Input()
  public onChange?: (value: string) => void;

  @Input()
  public isDisabled = false;

  @Input()
  public isChangeOnSubmit = true;

  public ngModel = '';
  public isFocused = false;

  constructor(public formUtils: FormUtilsService) {
  }

  @HostListener('input', ['$event'])
  public onInputChange = (): void => {
    if (typeof this.onChange === 'function' && !this.isChangeOnSubmit) {
      this.onChange(this.formGroup.controls[this.controlName].value);
    }
  }

  public ngOnInit(): void {
    this.formGroup.addControl(this.controlName, new FormControl('', this.getValidators()));
  }

  public isFieldInvalid = (): boolean =>
    this.formUtils.isFieldInvalid(this.formGroup, this.controlName)

  public isCustomValidationInvalid = (): boolean => {
    const controlErrors = this.formGroup.controls[this.controlName].errors;
    if (controlErrors !== null) {
      return this.formGroup.controls[this.controlName].value.length > 0 &&
        controlErrors[InputAddItemComponentStatusEnum.ValueExist];
    } else {
      return false;
    }
  }

  public isFieldValueInvalid = (): boolean => {
    const controlErrors = this.formGroup.controls[this.controlName].errors;
    if (controlErrors !== null) {
      return this.formGroup.controls[this.controlName].value.length > 0 &&
        controlErrors[InputAddItemComponentStatusEnum.IncorrectValue];
    } else {
      return false;
    }
  }

  public onFocus = (): void => {
    this.isFocused = true;
  }

  public onBlur = (): void => {
    this.isFocused = false;
  }

  public onKeyDown = (event: KeyboardEvent): void => {
    if (event.keyCode === Config.keyboardCodes.enter && this.onChange !== undefined) {
      this.onChange(this.formGroup.controls[this.controlName].value);
      this.isCustomValidationInvalid();
    }
  }

  public onAddLinkClick = (): void => {
    if (this.onChange !== undefined) {
      this.onChange(this.formGroup.controls[this.controlName].value);
    }
  }

  private getValidators = (): ValidatorFn[] =>
    this.getRequiredValidator(this.getPatternValidator([]))

  private getRequiredValidator = (arr: ValidatorFn[]): ValidatorFn[] =>
    this.isRequired ? [...arr, Validators.required] : arr

  private getPatternValidator = (arr: ValidatorFn[]): ValidatorFn[] =>
    this.pattern ? [...arr, Validators.pattern(this.pattern)] : arr

}
