import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'plat-input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.sass'],
})
export class InputSwitchComponent {

  @Input('label')
  public labelTrKey?: string;

  @Input()
  public turnOffTrKey = '';

  @Input()
  public turnOnTrKey = '';

  @Input()
  public controlName: string;

  @Input()
  public isDisabled = false;

  @Input('form')
  public formGroup: FormGroup;

  public onSwitcherClick = (event: Event): void => {
    event.preventDefault();
    if (!this.isDisabled) {
      const currentValue = this.formGroup.value[this.controlName];
      this.formGroup.controls[this.controlName].setValue(!currentValue);
    }
  };

  public getOnOffTrKey = (isChecked: boolean): string => isChecked ? this.turnOnTrKey : this.turnOffTrKey;

}
