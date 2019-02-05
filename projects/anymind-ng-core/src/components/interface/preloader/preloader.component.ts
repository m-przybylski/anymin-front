import { Component, Input } from '@angular/core';
import { Animations } from '../../../shared/animations/animations';

@Component({
  selector: 'am-core-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.sass'],
  animations: Animations.preloaderAlertAnimation,
})
export class PreloaderComponent {
  @Input()
  public trMessage = '';
}
