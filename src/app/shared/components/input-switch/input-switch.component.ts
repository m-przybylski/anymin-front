import { Component, Input } from '@angular/core';

@Component({
  selector: 'plat-input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.sass']
})
export class InputSwitchComponent {

  @Input('label')
  public labelTrKey?: string;

  public isInputChecked = false;

  constructor() {
  }

}
