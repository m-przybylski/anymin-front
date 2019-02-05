import { Component, Input } from '@angular/core';

@Component({
  selector: 'am-core-equalizer',
  templateUrl: 'equalizer.component.html',
  styleUrls: ['equalizer.component.sass'],
})
export class EqualizerComponent {
  @Input()
  public isConnecting = false;
}
