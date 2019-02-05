import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Config } from '../../../../config';
import { Animations } from '../../../../shared/animations/animations';
import { AlertService } from '../../../../services/alert/alert.service';
import { COMPONENTS_CONFIG } from '../../../../shared/injection-tokens/injection-tokens';
import { Alert } from '../../../../services/alert/alert';

@Component({
  selector: 'am-core-alert-container',
  templateUrl: './alert-container.component.html',
  styleUrls: ['./alert-container.sass'],
  encapsulation: ViewEncapsulation.None,
  animations: Animations.alertContainerAnimation,
})
export class AlertContainerComponent implements OnInit, OnDestroy {
  private static readonly alertsMaxArrayLength = 1;
  public alerts: ReadonlyArray<Alert> = [];
  public pendingAlerts: ReadonlyArray<Alert> = [];
  private readonly ngUnsubscribe = new Subject<void>();

  constructor(@Inject(COMPONENTS_CONFIG) private config: Config, private alertService: AlertService) {}

  public ngOnInit(): void {
    this.alertService.alert$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(this.handleNewAlert);
    this.alertService.closeAll$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(this.closeAllAlerts);
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public closeAlert = (alertToClose: Alert, isFromUI?: boolean): void => {
    this.alerts = this.alerts.filter(alert => alert !== alertToClose);
    this.shiftPendingAlert();
    if (typeof alertToClose.alertOption !== 'undefined' && isFromUI) {
      alertToClose.alertClosedByUser();
    }
  };

  private handleNewAlert = (alert: Alert): void => {
    if (this.alerts.length > AlertContainerComponent.alertsMaxArrayLength && !this.checkIsStaticOption(alert)) {
      this.pendingAlerts = [...this.pendingAlerts, alert];
    } else {
      this.addAlert(alert);
    }
  };

  private addAlert = (alert: Alert): void => {
    this.alerts = [...this.alerts, alert];
    if (this.checkIsStaticOption(alert)) {
      this.closeStaticAlert();
    } else {
      setTimeout(() => this.closeAlert(alert), this.config.alerts.timeout);
    }
  };

  private shiftPendingAlert = (): void => {
    if (this.pendingAlerts.length > 0) {
      this.handleNewAlert(this.pendingAlerts[0]);
      this.pendingAlerts = this.pendingAlerts.slice(1);
    }
  };

  private closeStaticAlert = (): void => {
    if (this.alerts.length > 1) {
      this.closeAlert(this.alerts[0]);
    }
  };

  private checkIsStaticOption = (alert: Alert): boolean =>
    typeof alert.alertOption !== 'undefined' && alert.alertOption.isStatic === true;

  private closeAllAlerts = (): void => {
    this.alerts = [];
    this.pendingAlerts = [];
  };
}
