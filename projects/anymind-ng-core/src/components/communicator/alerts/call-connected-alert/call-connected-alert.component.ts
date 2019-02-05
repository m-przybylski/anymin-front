import { Component, OnInit } from '@angular/core';
import { Config } from '../../../../config';

@Component({
  selector: 'am-core-call-connected-alert',
  templateUrl: 'call-connected-alert.component.html',
  styleUrls: ['../call-alerts.sass'],
})
export class CallConnectedAlertComponent implements OnInit {
  public isVisible = true;

  public ngOnInit(): void {
    setTimeout(() => (this.isVisible = false), Config.communicatorAlertTimeout);
  }
}
