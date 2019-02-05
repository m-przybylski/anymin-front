import { Component, Input, OnInit } from '@angular/core';
import { Config } from '../../../../config';

@Component({
  selector: 'am-core-call-warn-alert',
  templateUrl: 'call-warn-alert.component.html',
  styleUrls: ['../call-alerts.sass'],
})
export class CallWarnAlertComponent implements OnInit {
  @Input()
  public text: string;

  public isVisible = true;

  public ngOnInit(): void {
    setTimeout(() => (this.isVisible = false), Config.communicatorAlertTimeout);
  }
}
