import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
  animations: [
    trigger('onOfSwitch', [
      state('checked', style({ transform: 'translate3d(20px, 0, 0)' })),
      state('unchecked', style({ transform: 'translate3d(0, 0, 0)' })),
      transition('checked <=> unchecked', animate('300ms ease')),
    ]),
  ],
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
  private animationInProgress = false;
  // tslint:disable-next-line:no-any
  public writeValue(obj: any): void {
    this.isChecked = obj;
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

  public onSwitcherClick(clickEvent: Event): void {
    /**
     * this is triggered from click event
     * need to cancel propagation
     * not sure this is the right place to do it
     */
    clickEvent.stopPropagation();
    if (!this.isDisabled && !this.animationInProgress) {
      this.isChecked = !this.isChecked;
      this.onModelChange(this.isChecked);
    }
  }

  public get switchState(): string {
    return this.isChecked ? 'checked' : 'unchecked';
  }

  public get onOffTrKey(): string {
    return this.isChecked ? this.turnOnTrKey : this.turnOffTrKey;
  }

  public onAnimationStart(): void {
    this.animationInProgress = true;
  }

  public onAnimationDone(): void {
    this.animationInProgress = false;
  }
}
