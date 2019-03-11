import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtilsService } from '../../../../services/form-utils/form-utils.service';
import { ValidatorFn } from '@angular/forms/src/directives/validators';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'am-core-textarea-primary',
  templateUrl: './textarea-primary.component.html',
  styleUrls: ['./textarea-primary.component.sass'],
})
export class TextareaPrimaryComponent implements OnInit, OnDestroy {
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

  private ngUnsubscribe$ = new Subject<void>();

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
    if (!this.formGroup.contains(this.controlName)) {
      this.formGroup.addControl(this.controlName, new FormControl('', this.getValidators()));
    } else {
      this.formGroup.controls[this.controlName].setValidators(this.getValidators());
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
