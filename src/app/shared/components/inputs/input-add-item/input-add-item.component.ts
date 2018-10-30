// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:no-null-keyword

import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormUtilsService } from '@anymind-ng/core';

export interface IValidatorsErrorMsg {
  [key: string]: string;
}

export enum AddItemTypeEnum {
  INCORRECT_VALUE,
  VALUE_ADDED,
}

@Component({
  selector: 'plat-add-item',
  templateUrl: './input-add-item.component.html',
  styleUrls: ['./input-add-item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  public isRequired = false;

  @Input()
  public pattern?: RegExp;

  @Input()
  public onChange?: (value: string) => void;

  @Output()
  public onEnterClick?: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  public isDisabled = false;

  @Input()
  public isChangeOnSubmit = true;

  public inputValue = '';

  public isFocused = false;

  private readonly errorsMsg: IValidatorsErrorMsg = {
    pattern: 'VALIDATOR.ERROR.PATTERN',
    required: 'VALIDATOR.ERROR.REQUIRED',
  };

  constructor(public formUtils: FormUtilsService) {}

  @HostListener('input', ['$event'])
  public onInputChange = (): void => {
    if (typeof this.onChange === 'function' && !this.isChangeOnSubmit) {
      this.onChange(this.formGroup.controls[this.controlName].value);
    }
  };

  public ngOnInit(): void {
    this.formGroup.addControl(this.controlName, new FormControl('', this.getValidators()));
  }

  public isFieldInvalid = (): boolean => this.formUtils.isFieldInvalid(this.formGroup, this.controlName);

  public showValidationAlert = (): string => {
    const controlErrors = this.formGroup.controls[this.controlName].errors;
    if (controlErrors !== null && this.formGroup.controls[this.controlName].value.length > 0) {
      const errorCode = Object.keys(controlErrors)[0];

      return Object.keys(this.errorsMsg).includes(errorCode) ? this.errorsMsg[errorCode] : errorCode;
    } else {
      return '';
    }
  };

  public onBlur = (): void => {
    const controlErrors = this.formGroup.controls[this.controlName].errors;
    if (controlErrors === null && this.formGroup.controls[this.controlName].value.length > 0) {
      this.setDefaultValidators();
    }

    this.isFocused = false;
  };

  public onFocus = (): void => {
    this.formGroup.controls[this.controlName].clearValidators();
    this.isFocused = true;
  };

  public onAddLinkClick = (): void => {
    this.setDefaultValidators();
    this.onAddItem();
  };

  public onEnter = (): void => this.onAddItem();

  private setDefaultValidators = (): void => {
    this.formGroup.controls[this.controlName].setValidators(this.getValidators());
    this.formGroup.controls[this.controlName].updateValueAndValidity();
  };

  private onAddItem = (): void => {
    if (this.onChange !== undefined) {
      this.onChange(this.formGroup.controls[this.controlName].value);
    }
    if (this.onEnterClick !== undefined) {
      this.onEnterClick.emit(this.formGroup.controls[this.controlName].value);
    }
  };

  private getValidators = (): ValidatorFn[] => this.getRequiredValidator(this.getPatternValidator([]));

  private getRequiredValidator = (arr: ValidatorFn[]): ValidatorFn[] =>
    this.isRequired ? [...arr, Validators.required.bind(this)] : arr;

  private getPatternValidator = (arr: ValidatorFn[]): ValidatorFn[] =>
    this.pattern ? [...arr, Validators.pattern(this.pattern)] : arr;
}
