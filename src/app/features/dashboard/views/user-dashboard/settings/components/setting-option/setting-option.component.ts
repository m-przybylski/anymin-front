// tslint:disable:no-empty
import { Component, Input } from '@angular/core';

@Component({
  selector: 'plat-setting-option',
  templateUrl: './setting-option.component.html',
  styleUrls: ['./setting-option.component.sass']
})
export class SettingOptionComponent {

  @Input()
  public title: string;

  @Input()
  public description: string;

  @Input()
  public buttonText: string;

  @Input()
  public tooltipTrText: string;

  @Input()
  public buttonHandler: () => {};

  constructor() {
  }
}
