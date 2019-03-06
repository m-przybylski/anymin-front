import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormUtilsService } from '../../../../services/form-utils/form-utils.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

export enum InputSize {
  DEFAULT = '',
  BIG = 'input--big',
}

@Component({
  selector: 'am-core-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.sass'],
})
export class InputTextComponent implements OnInit, OnDestroy {
  @Input('label')
  public labelTrKey: string;

  @Input('placeholder')
  public placeholderTrKey: string;

  @Input('errorTextKey')
  public errorTrKey: string;

  @Input()
  public isDisabled?: boolean;

  @Input()
  public controlName: string;

  @Input('form')
  public formGroup: FormGroup;

  @Input()
  public inputMask = '';

  @Input()
  public isRequired = false;

  @Input()
  public minLength?: number;

  @Input()
  public maxLength?: number;

  @Input()
  public initialFocus = false;

  @Input()
  public inputSize = InputSize.DEFAULT;

  public inputValue = '';
  public isFocused = false;

  private ngUnsubscribe$ = new Subject<void>();

  constructor(public formUtils: FormUtilsService) {}

  public ngOnInit(): void {
    if (!this.formGroup.contains(this.controlName)) {
      this.formGroup.addControl(this.controlName, new FormControl('', this.getValidators()));
    } else {
      this.formGroup.controls[this.controlName].setValidators(this.getValidators());
      this.inputValue = this.formGroup.controls[this.controlName].value;
    }

    this.formGroup.controls[this.controlName].valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((value: string) => {
        this.inputValue = value;
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public isFieldInvalid(): boolean {
    return this.formUtils.isFieldInvalid(this.formGroup, this.controlName);
  }

  public isFieldValueInvalid(): boolean {
    return this.isFieldInvalid() && this.formGroup.controls[this.controlName].value;
  }

  public isRequiredError(): boolean {
    const controlNameErrors = this.formGroup.controls[this.controlName].errors;

    if (controlNameErrors !== null) {
      return this.isFieldInvalid() && controlNameErrors.required;
    } else {
      return false;
    }
  }

  public onFocus(): void {
    this.isFocused = true;
  }

  public onBlur(): void {
    this.isFocused = false;
  }

  // tslint:disable:readonly-array
  private getValidators(): ValidatorFn[] {
    return this.getRequiredValidator(this.getMinLengthValidator(this.getMaxLengthValidator([])));
  }

  private getMinLengthValidator(arr: ValidatorFn[]): ValidatorFn[] {
    return typeof this.minLength !== 'undefined' ? [...arr, Validators.minLength(this.minLength)] : arr;
  }

  private getMaxLengthValidator(arr: ValidatorFn[]): ValidatorFn[] {
    return typeof this.maxLength !== 'undefined' ? [...arr, Validators.maxLength(this.maxLength)] : arr;
  }

  private getRequiredValidator(arr: ValidatorFn[]): ValidatorFn[] {
    return this.isRequired ? [...arr, Validators.required] : arr;
  }
}
