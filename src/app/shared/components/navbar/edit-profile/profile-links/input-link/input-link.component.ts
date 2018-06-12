import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormUtilsService } from '@anymind-ng/components';
import { keyboardCodes } from '../../../../../../../angularjs/common/classes/keyboard';

export enum ProfileLinksComponentErrorEnum {
  ValueExist = 'ValueExist',
  IncorrectValue = 'IncorrectValue'
}

@Component({
  selector: 'plat-input-link',
  templateUrl: './input-link.component.html',
  styleUrls: ['./input-link.component.sass'],
})
export class InputAddLinkComponent {

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

  public isFocused = false;

  constructor(public formUtils: FormUtilsService) {
  }

  public ngOnInit(): void {
    this.formGroup.addControl(this.controlName, new FormControl('', this.getValidators()));
  }

  public isFieldInvalid = (): boolean =>
    this.formUtils.isFieldInvalid(this.formGroup, this.controlName) &&
    this.isFieldValueInvalid() || this.isCustomValidationInvalid()

  public isCustomValidationInvalid = (): boolean => {
    const controlErrors = this.formGroup.controls[this.controlName].errors;
    if (controlErrors !== null) {
      return this.formGroup.controls[this.controlName].value.length > 0 &&
        controlErrors[ProfileLinksComponentErrorEnum.ValueExist];
    } else {
      return false;
    }
  }

  public isFieldValueInvalid = (): boolean => {
    const controlErrors = this.formGroup.controls[this.controlName].errors;
    if (controlErrors !== null) {
      return this.formGroup.controls[this.controlName].value.length > 0 &&
        controlErrors[ProfileLinksComponentErrorEnum.IncorrectValue];
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
    if (event.keyCode === keyboardCodes.enter && this.onChange !== undefined) {
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
