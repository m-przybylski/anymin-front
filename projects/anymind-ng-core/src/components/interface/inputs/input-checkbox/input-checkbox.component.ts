import { Component, Input, OnInit } from '@angular/core';
import { FormUtilsService } from '../../../../services/form-utils/form-utils.service';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'am-core-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.sass'],
})
export class InputCheckboxComponent implements OnInit {
  @Input('label')
  public labelTrKey: string;

  @Input('errorTextKey')
  public errorTrKey: string;

  @Input()
  public controlName: string;

  @Input('form')
  public formGroup: FormGroup;

  @Input()
  public isDisabled?: boolean;

  @Input()
  public isRequired = false;

  constructor(public formUtils: FormUtilsService) {}

  public ngOnInit(): void {
    // tslint:disable-next-line:readonly-array
    const checkboxValidators: ValidatorFn[] = [];
    if (this.isRequired) {
      checkboxValidators.push(Validators.requiredTrue);
    }
    this.formGroup.addControl(this.controlName, new FormControl(false, checkboxValidators));
  }

  public isFieldInvalid(): boolean {
    return this.formUtils.isFieldInvalid(this.formGroup, this.controlName);
  }
}
