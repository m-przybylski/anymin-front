import { Component, Input } from '@angular/core';

@Component({
  selector: 'am-core-content-default',
  templateUrl: './content-default.component.html',
  styleUrls: ['./content-default.component.sass'],
})
export class ContentDefaultComponent {
  @Input()
  public imgName?: string;

  @Input('titleText')
  public titleTrKey = '';

  @Input('descriptionText')
  public descriptionTrKey = '';

  @Input()
  public isWidgetPath = false;
}
