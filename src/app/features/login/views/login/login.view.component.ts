import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';

@Component({
  templateUrl: './login.view.component.html',
  styleUrls: ['./login.view.component.sass'],
})
export class LoginViewComponent extends Logger {
  constructor(private router: Router, private alertService: AlertService, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('LoginViewComponent'));
  }

  public navigateToRegistration(): void {
    this.router.navigate(['/register']).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        this.loggerService.warn('Error when redirect to /register');
      }
    });
  }
}
