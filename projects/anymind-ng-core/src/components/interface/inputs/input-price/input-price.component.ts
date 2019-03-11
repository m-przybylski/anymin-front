// tslint:disable:readonly-array
// tslint:disable:no-null-keyword
import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Config } from '../../../../config';
import { COMPONENTS_CONFIG } from '../../../../shared/injection-tokens/injection-tokens';
import { FormUtilsService } from '../../../../services/form-utils/form-utils.service';

interface IErrors {
  invalidMinValue: string;
  invalidMaxValue: string;
}

@Component({
  selector: 'am-core-input-price',
  templateUrl: './input-price.component.html',
  styleUrls: ['./input-price.component.sass'],
})
export class InputPriceComponent implements OnInit {
  @Input('label')
  public labelTrKey: string;

  @Input()
  public minValueErrorTrKey?: string;

  @Input()
  public maxValueErrorTrKey?: string;

  @Input()
  public isDisabled = false;

  @Input()
  public controlName: string;

  @Input('form')
  public formGroup: FormGroup;

  @Input()
  public isRequired = false;

  @Input()
  public isInputMedium = false;

  @Input()
  public onInputChange?: (value: number) => void;

  @Input()
  public minValidValue?: number;

  @Input()
  public maxValidValue?: number;

  @Input()
  public inputMask = this.config.inputMasks.priceWithComa;

  /**
   * Pass true if You want to allow zero as input value
   * and need to validate some minValidValue.
   */
  @Input()
  public isZeroValueAllowed = false;

  public isFocused = false;
  public placeholderTrKey = 'INTERFACE.INPUT_PRICE.PLACEHOLDER';
  public errorTrKey: string;

  private readonly allowedKeys: ReadonlyArray<string> = [
    Config.keyboardCodes.tab,
    Config.keyboardCodes.backspace,
    Config.keyboardCodes.zero,
    Config.keyboardCodes.one,
    Config.keyboardCodes.two,
    Config.keyboardCodes.three,
    Config.keyboardCodes.four,
    Config.keyboardCodes.five,
    Config.keyboardCodes.six,
    Config.keyboardCodes.seven,
    Config.keyboardCodes.eight,
    Config.keyboardCodes.nine,
    Config.keyboardCodes.comma,
    Config.keyboardCodes.arrowRight,
    Config.keyboardCodes.arrowLeft,
    Config.keyboardCodes.comma,
    Config.keyboardCodes.dot,
  ];
  private readonly lastButOneIndex = 2;
  private readonly inputPriceErrors: IErrors = {
    invalidMinValue: 'invalidMinValue',
    invalidMaxValue: 'invalidMaxValue',
  };
  private readonly moneyDivider = Config.moneyDivider;

  constructor(public formUtils: FormUtilsService, @Inject(COMPONENTS_CONFIG) private config: Config) {}

  @HostListener('paste', ['$event'])
  public onPaste(event: KeyboardEvent): void {
    event.preventDefault();
  }

  public onKeyUp = (inputValue: string): void => {
    const value = Number(inputValue.replace(',', '.'));
    if (typeof this.onInputChange === 'function') {
      this.onInputChange(value);
    }
  };

  public onKeyDown = (event: KeyboardEvent): void => {
    if (this.isNotAllowedKeyPressed(event)) {
      event.preventDefault();
    }
  };

  public ngOnInit(): void {
    this.formGroup.addControl(this.controlName, new FormControl('', this.getValidators()));
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

  public onBlur = (inputValue: string): void => {
    this.isFocused = false;
    if (inputValue !== '' && (inputValue.indexOf(',') === inputValue.length - 1 || inputValue.indexOf(',') === -1)) {
      this.formGroup.controls[this.controlName].setValue(`${inputValue},00`);
    } else if (inputValue.indexOf(',') === inputValue.length - this.lastButOneIndex) {
      this.formGroup.controls[this.controlName].setValue(`${inputValue}0`);
    }
  };

  private isNotAllowedKeyPressed = (event: KeyboardEvent): boolean => this.allowedKeys.indexOf(event.key) === -1;

  private getValidators = (): ValidatorFn[] =>
    this.getRequiredValidator(this.getMinValueValidator(this.getMaxValueValidator([])));

  private getRequiredValidator = (arr: ValidatorFn[]): ValidatorFn[] =>
    this.isRequired ? [...arr, Validators.required] : arr;

  private getMinValueValidator = (arr: ValidatorFn[]): ValidatorFn[] =>
    typeof this.minValidValue !== 'undefined' ? [...arr, this.minValueValidatorFn.bind(this)] : arr;

  private getMaxValueValidator = (arr: ValidatorFn[]): ValidatorFn[] =>
    typeof this.maxValidValue !== 'undefined' ? [...arr, this.maxValueValidatorFn.bind(this)] : arr;

  private minValueValidatorFn(control: FormControl): { [key: string]: boolean } | null {
    const value = Number(control.value.replace(',', '.')) * this.moneyDivider;
    if (this.isZeroValueAllowed && value === 0) {
      return null;
    }
    if (
      typeof this.minValidValue !== 'undefined' &&
      value < this.minValidValue &&
      typeof this.minValueErrorTrKey !== 'undefined'
    ) {
      this.errorTrKey = this.minValueErrorTrKey;

      return { [this.inputPriceErrors.invalidMinValue]: true };
    }

    return null;
  }

  private maxValueValidatorFn(control: FormControl): { [key: string]: boolean } | null {
    const value = Number(control.value.replace(',', '.')) * this.moneyDivider;
    if (
      typeof this.maxValidValue !== 'undefined' &&
      value > this.maxValidValue &&
      typeof this.maxValueErrorTrKey !== 'undefined'
    ) {
      this.errorTrKey = this.maxValueErrorTrKey;

      return { [this.inputPriceErrors.invalidMaxValue]: true };
    }

    return null;
  }
}
