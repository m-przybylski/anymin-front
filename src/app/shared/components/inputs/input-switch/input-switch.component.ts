import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const INPUT_SWITCH_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-use-before-declare
  useExisting: forwardRef(() => InputSwitchComponent),
  multi: true,
};

@Component({
  selector: 'plat-input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.sass'],
  providers: [INPUT_SWITCH_ACCESSOR],
})
export class InputSwitchComponent implements ControlValueAccessor {
  public isChecked: boolean;
  public isDisabled = false;
  @Input('label')
  public labelTrKey?: string;
  @Input()
  public turnOffTrKey = '';
  @Input()
  public turnOnTrKey = '';

  // tslint:disable-next-line:no-any
  private onModelChange: (obj?: any) => any;
  // tslint:disable-next-line:no-any
  private onTouch: (obj?: any) => any;
  // tslint:disable-next-line:no-any
  public writeValue(obj: any): void {
    this.isChecked = obj;
  }
  // tslint:disable-next-line:no-any
  public registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  // tslint:disable-next-line:no-any
  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public onSwitcherClick = (clickEvent: Event): void => {
    /**
     * this is triggered from click event
     * need to cancel propagation
     * not sure this is the right place to do it
     */
    clickEvent.stopPropagation();
    if (!this.isDisabled) {
      this.isChecked = !this.isChecked;
      this.onModelChange(this.isChecked);
    }
  };

  public get onOffTrKey(): string {
    return this.isChecked ? this.turnOnTrKey : this.turnOffTrKey;
  }
}
