import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormUtilsService } from '../../../../services/form-utils/form-utils.service';
import { Config } from '../../../../config';
import { COMPONENTS_CONFIG } from '../../../../shared/injection-tokens/injection-tokens';

@Component({
  selector: 'am-core-input-recharge-account',
  templateUrl: './input-recharge-account.component.html',
  styleUrls: ['./input-recharge-account.component.sass'],
})
export class InputRechargeAccountComponent {
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
  public inputMask = this.config.inputMasks.price;

  @Input()
  public isRequired = false;

  public isFocused = false;
  public invisibleModel = '';

  // tslint:disable-next-line:readonly-array
  private inputValidators: ValidatorFn[] = [Validators.min(parseInt('10', 10))];

  constructor(public formUtils: FormUtilsService, @Inject(COMPONENTS_CONFIG) private config: Config) {}

  public ngOnInit(): void {
    if (this.isRequired) {
      this.inputValidators.push(Validators.required);
    }
    this.formGroup.addControl(this.controlName, new FormControl('', this.inputValidators));

    const controlNameModel = this.formGroup.get(this.controlName);

    if (controlNameModel !== null) {
      controlNameModel.valueChanges.subscribe(value => {
        this.invisibleModel = value;
      });
    }
  }

  public isFieldInvalid(): boolean {
    return this.formUtils.isFieldInvalid(this.formGroup, this.controlName);
  }

  public isFieldValueInvalid(): boolean {
    return this.isFieldInvalid() && this.formGroup.controls[this.controlName].value;
  }

  public isRequiredError(): boolean {
    const controlErrors = this.formGroup.controls[this.controlName].errors;

    if (controlErrors !== null) {
      return this.isFieldInvalid() && controlErrors.required;
    }

    return false;
  }

  public onFocus(): void {
    this.isFocused = true;
  }

  public onBlur(): void {
    this.isFocused = false;
  }
}
