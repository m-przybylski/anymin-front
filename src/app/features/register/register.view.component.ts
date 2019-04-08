import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';

@Component({
  templateUrl: './register.view.component.html',
  styleUrls: ['./register.view.component.sass'],
})
export class RegisterViewComponent extends Logger {
  constructor(private router: Router, private alertService: AlertService, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('RegisterViewComponent'));
  }

  public redirectToLogin(): void {
    this.router.navigate(['/login']).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        this.loggerService.warn('Error when redirect to /login');
      }
    });
  }
}
