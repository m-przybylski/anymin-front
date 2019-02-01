// tslint:disable:readonly-array
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormUtilsService } from '@anymind-ng/core';
import { TooltipComponentDestinationEnum } from '@platform/shared/components/tooltip/tooltip.component';

export type InputTypes = 'tel' | 'number';

@Component({
  selector: 'plat-input-numeric',
  templateUrl: './custom-input-numeric.component.html',
  styleUrls: ['./custom-input-numeric.component.sass'],
})
export class InputNumericComponent {
  @Input('label')
  public labelTrKey: string;

  @Input('placeholder')
  public placeholderTrKey: string;

  @Input('errorTextKey')
  public errorTrKey: string;

  @Input()
  public isDisabled = false;

  @Input()
  public controlName: string;

  @Input('form')
  public formGroup: FormGroup;

  @Input()
  public inputType: InputTypes;

  @Input()
  public initialFocus = false;

  @Input()
  public isRequired = false;

  @Input()
  public pattern?: string;

  @Input()
  public tooltipTranslate?: string;

  @Input()
  public validatorFn?: ValidatorFn;

  @Input()
  public inputMask = '';

  @Input()
  public tooltipType: TooltipComponentDestinationEnum;

  public isFocused = false;

  constructor(public formUtils: FormUtilsService) {}

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

  public onBlur = (): void => {
    this.isFocused = false;
  };

  private getValidators = (): ValidatorFn[] =>
    this.getRequiredValidator(this.getPatternValidator(this.getCustomFnValidator([])));

  private getRequiredValidator = (arr: ValidatorFn[]): ValidatorFn[] =>
    this.isRequired ? [...arr, Validators.required] : arr;

  private getPatternValidator = (arr: ValidatorFn[]): ValidatorFn[] =>
    this.pattern ? [...arr, Validators.pattern(this.pattern)] : arr;

  private getCustomFnValidator = (arr: ValidatorFn[]): ValidatorFn[] =>
    this.validatorFn ? [...arr, this.validatorFn] : arr;
}
