import { AfterViewInit, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetPayoutMethod, PayoutsService } from '@anymind-ng/api';
import { finalize, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  BackendErrors,
  isBackendError,
  iterateOverBackendErrors,
} from '@platform/shared/models/backend-error/backend-error';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { ibanNumberValidator } from '@platform/shared/validators/iban.validator';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.sass'],
})
export class BankAccountComponent extends Logger implements AfterViewInit {
  public readonly bankAccountControlName = 'bankAccount';
  public isPending = false;

  @Input()
  public getPayoutMethod: GetPayoutMethod;

  public changeBankAccountForm: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private payoutsService: PayoutsService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('BankAccountComponent'));
    this.changeBankAccountForm = new FormGroup({});

    this.changeBankAccountForm.setControl(
      this.bankAccountControlName,
      new FormControl('', [Validators.required, ibanNumberValidator()]),
    );
  }

  public ngAfterViewInit(): void {
    if (typeof this.getPayoutMethod.bankAccount !== 'undefined') {
      this.changeBankAccountForm.controls[this.bankAccountControlName].patchValue(
        this.getPayoutMethod.bankAccount.accountNumber,
      );
    }
  }

  public onFormSubmit = (): void => {
    if (this.changeBankAccountForm.valid) {
      this.isPending = true;
      this.payoutsService
        .putPayoutMethodRoute({
          bankAccount: { accountNumber: `PL${this.changeBankAccountForm.value[this.bankAccountControlName]}` },
        })
        .pipe(
          finalize(() => {
            this.isPending = false;
          }),
          catchError(this.handlePutPayoutMethodError),
        )
        .subscribe(this.onAddBankAccountSuccess);
    }
  };

  private onAddBankAccountSuccess = (): void => {
    this.alertService.pushSuccessAlert('ALERT.BANK_ADD_SUCCESS');
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
  };

  // tslint:disable-next-line
  private handlePutPayoutMethodError = (err: any): Observable<any> => {
    const error = err.error;

    if (isBackendError(error)) {
      iterateOverBackendErrors(error, this.handleError);
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.loggerService.warn('handlePutPayoutMethodError error: ', error);
    }

    return of();
  };

  private handleError = (code: number): void => {
    switch (code) {
      case BackendErrors.InvalidBankAccountNumber:
        this.changeBankAccountForm.value[this.bankAccountControlName].setErrors({ invalid: true });
        break;
      default:
    }
  };
}
