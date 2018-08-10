// tslint:disable:no-empty
import { Component, Input } from '@angular/core';

@Component({
  selector: 'plat-input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.sass'],
})
export class InputSwitchComponent {
  @Input('label') public labelTrKey?: string;

  @Input() public turnOffTrKey?: string;

  @Input() public turnOnTrKey?: string;

  public isInputChecked = false;

  constructor() {}

  public onSwitcherClick = (event: Event): void => {
    event.preventDefault();
    this.isInputChecked = !this.isInputChecked;
  };
}
