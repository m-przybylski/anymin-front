import { Component, Input } from '@angular/core';
import { Animations } from '../../../../shared/animations/animations';

@Component({
  selector: 'am-core-validation-alert',
  templateUrl: './validation-alert.component.html',
  styleUrls: ['./validation-alert.component.sass'],
  animations: Animations.validationAlertAnimation,
})
export class ValidationAlertComponent {
  @Input()
  public isVisible: boolean;

  @Input()
  public validationTextKey: string;

  @Input()
  public validationTextParams?: {};
}
