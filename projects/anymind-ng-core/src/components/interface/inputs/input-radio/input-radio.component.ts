import { Component, Input, OnInit } from '@angular/core';
import { FormUtilsService } from '../../../../services/form-utils/form-utils.service';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'am-core-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.sass'],
})
export class InputRadioComponent implements OnInit {
  @Input('label')
  public labelTrKey: string;

  @Input('errorTextKey')
  public errorTrKey: string;

  @Input()
  public controlName: string;

  @Input('form')
  public formGroup: FormGroup;

  @Input()
  public value: string;

  @Input()
  public isDisabled = false;

  @Input()
  public isRequired = false;

  @Input()
  public smallMargin = false;

  constructor(public formUtils: FormUtilsService) {}

  public ngOnInit(): void {
    // tslint:disable-next-line:readonly-array
    const checkboxValidators: ValidatorFn[] = [];
    if (this.isRequired) {
      checkboxValidators.push(Validators.requiredTrue);
    }
    this.formGroup.addControl(this.controlName, new FormControl('', checkboxValidators));
  }

  public isFieldInvalid(): boolean {
    return this.formUtils.isFieldInvalid(this.formGroup, this.controlName);
  }
}
