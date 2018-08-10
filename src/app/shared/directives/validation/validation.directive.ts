// tslint:disable:no-null-keyword
import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { NgControl } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';

@Directive({ selector: '[platValidation]' })
export class ValidationDirective {
  @Output() public onBlur = new EventEmitter(true);

  @Output() public onFocus = new EventEmitter(true);

  public get formControl(): AbstractControl | null {
    return this.ngControl.control;
  }

  private isFocused = false;

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  public onChangeEvent = (): void => {
    if (this.isFocused && this.formControl !== null) {
      this.formControl.setValidators(null);
      this.formControl.updateValueAndValidity();
    }
  };

  @HostListener('focus')
  public onFocusEvent = (): void => {
    this.onFocus.emit();
    this.isFocused = true;
  };

  @HostListener('blur')
  public onBlurEvent = (): void => {
    if (this.formControl !== null && this.formControl.errors === null) {
      this.onBlur.emit();
    }
    this.isFocused = false;
  };
}
