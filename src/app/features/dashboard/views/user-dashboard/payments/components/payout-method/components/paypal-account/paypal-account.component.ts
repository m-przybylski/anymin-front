import { AfterViewInit, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GetPayoutMethod, PayoutsService } from '@anymind-ng/api';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { finalize, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  BackendErrors,
  isBackendError,
  iterateOverBackendErrors,
} from '@platform/shared/models/backend-error/backend-error';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'paypal-account',
  templateUrl: './paypal-account.component.html',
  styleUrls: ['./paypal-account.component.sass'],
})
export class PayPalAccountComponent extends Logger implements AfterViewInit {
  public readonly payPalAccountControlName = 'bankAccount';
  public isPending = false;

  @Input()
  public getPayoutMethod: GetPayoutMethod;

  public payPalAccountForm: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private payoutsService: PayoutsService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('PayPalAccountComponent'));
    this.payPalAccountForm = new FormGroup({});
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      if (typeof this.getPayoutMethod.payPalAccount !== 'undefined') {
        this.payPalAccountForm.controls[this.payPalAccountControlName].patchValue(
          this.getPayoutMethod.payPalAccount.email,
        );
      }
    }, 0);
  }

  public onFormSubmit(): void {
    if (this.payPalAccountForm.valid) {
      this.isPending = true;
      this.payoutsService
        .putPayoutMethodRoute({ payPalAccount: { email: this.payPalAccountForm.value[this.payPalAccountControlName] } })
        .pipe(
          finalize(() => {
            this.isPending = false;
          }),
          catchError(err => this.handlePutPayoutMethodError(err)),
        )
        .subscribe(() => this.onAddPayPalAccountSuccess());
    }
  }

  private onAddPayPalAccountSuccess(): void {
    this.alertService.pushSuccessAlert('ALERT.PAYPAL_ADD_SUCCESS');
    this.activeModal.close();
    this.router
      .navigate([], { relativeTo: this.route })
      .then(isRedirectSuccessful => {
        if (!isRedirectSuccessful) {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
          this.loggerService.warn('Error when reloading view');
        }
      })
      .catch(() => {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
      });
  }

  // tslint:disable:no-any
  private handlePutPayoutMethodError(err: any): Observable<any> {
    const error = err.error;

    if (isBackendError(error)) {
      iterateOverBackendErrors(error, e => this.handleError(e));
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.loggerService.warn('handlePutPayoutMethodError error: ', error);
    }

    return of();
  }

  private handleError(code: number): void {
    switch (code) {
      case BackendErrors.InvalidAddressEmail:
        this.payPalAccountForm.value[this.payPalAccountControlName].setErrors({ invalid: true });
        break;
      default:
    }
  }
}
