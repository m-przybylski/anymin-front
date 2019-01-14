import { Component, Input, forwardRef, OnDestroy, AfterViewInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { Config } from '../../../../../../../config';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormUtilsService } from '@anymind-ng/core';

export interface IBasicProfileData {
  name: string;
  avatarToken: string;
}

export const BASIC_PROFILE_DATA_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-use-before-declare
  useExisting: forwardRef(() => BasicProfileDataComponent),
  multi: true,
};

export const BASIC_PROFILE_DATA_VALIDATOR = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line:no-use-before-declare
  useExisting: forwardRef(() => BasicProfileDataComponent),
  multi: true,
};

@Component({
  selector: 'plat-basic-profile-data',
  styleUrls: ['./basic-profile-data.component.sass'],
  templateUrl: './basic-profile-data.component.html',
  providers: [BASIC_PROFILE_DATA_ACCESSOR, BASIC_PROFILE_DATA_VALIDATOR],
})
export class BasicProfileDataComponent implements ControlValueAccessor, Validator, AfterViewInit, OnDestroy {
  @Input()
  public isOrganizationAvatar: boolean;
  @Input()
  public inputTextLabel?: string;
  @Input()
  public inputTextPlaceholder?: string;

  @Input()
  public set isRequired(val: boolean) {
    this._isRequired = val;
    this.avatarFormControl.setValidators(Validators.required);
    /**
     * does not work at the moment, validators are overridden by am-core-input-text
     * TODO: after form controls refactor - uncomment to add validator to control
     */
    // this.textInputFormControl.setValidators(Validators.required);
  }

  public get isRequired(): boolean {
    return this._isRequired;
  }

  @Input()
  public isDisabled: boolean;

  @Input()
  public set isValidated(value: boolean) {
    if (value) {
      this.formUtils.validateAllFormFields(this.profileDataForm);
    }
  }

  public avatarFormControl = new FormControl('');
  public textInputFormControl = new FormControl('');
  /** DEPRECATED subject to remove do not use them */
  public profileNameControlName = 'profileNameFormControl';
  /** end DEPRECATED */

  public profileDataForm = new FormGroup({
    avatarFormControl: this.avatarFormControl,
    /**
     * TODO: uncomment line below after form refactor.
     */
    // profileNameFormControl: this.textInputFormControl
  });

  public readonly profileNameMaxlength = Config.inputsLength.profileNameMaxlength;
  public readonly profileNameMinlength = Config.inputsLength.profileNameMinlength;

  // tslint:disable-next-line:no-any
  private onModelChange: (obj?: any) => any;
  // tslint:disable-next-line:no-any
  private onDestroy$ = new Subject<void>();
  private _isRequired: boolean;

  constructor(private formUtils: FormUtilsService) {}

  public ngAfterViewInit(): void {
    /**
     * hack - am-core-input-text internally adds formControl to the scope
     * TODO: depends on forms controls core refactor
     * once refactored it can be moved to ngOnInit hook for control over modal animation
     */
    this.profileDataForm.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(data => {
      const value = {
        name: data.profileNameFormControl,
        avatarToken: data.avatarFormControl,
      };
      this.onModelChange(value);
    });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public validate(c: AbstractControl): { [key: string]: boolean } | null {
    const controlValue: IBasicProfileData | null = c.value;
    /**
     * this validator runs multiple times based on how many controls are added to the form.
     * make sure this code is quick
     */
    if (this.isRequired) {
      if (controlValue === null || !controlValue.avatarToken || !controlValue.name) {
        return { required: true };
      }
    }

    /**
     * because we can not control internal profileName (am-core-input-text) control validators
     */
    if (!this.profileDataForm.contains(this.profileNameControlName)) {
      // tslint:disable-next-line:no-null-keyword
      return null;
    }

    return this.profileDataForm.controls[this.profileNameControlName].errors;
  }

  //#region ControlValueAccessor interface
  /**
   * write value - control.setValue()
   */
  public writeValue(obj?: IBasicProfileData | null): void {
    if (obj !== null && obj !== undefined) {
      this.profileDataForm.patchValue({
        avatarFormControl: obj.avatarToken,
        profileNameFormControl: obj.name,
      });
    }
  }

  // tslint:disable-next-line:no-any
  public registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  // tslint:disable-next-line:no-any
  // tslint:disable-next-line:no-empty
  public registerOnTouched(_fn: any): void {}
  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  //#endregion
}

export interface IBasicProfileData {
  name: string;
  avatarToken: string;
}
