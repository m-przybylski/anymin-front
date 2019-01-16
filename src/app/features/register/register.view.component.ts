import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Alerts, FormUtilsService, LoggerFactory, AlertService, InputEmailComponent } from '@anymind-ng/core';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { Subject, Observable } from 'rxjs';
import { filter, skip, takeUntil } from 'rxjs/operators';
import { RegisterActions } from '@platform/core/actions';
import { BackendErrors, isBackendError } from '@platform/shared/models/backend-error/backend-error';
import { Logger } from '@platform/core/logger';

@Component({
  templateUrl: './register.view.component.html',
  styleUrls: ['./register.view.component.sass'],
})
export class RegisterViewComponent extends Logger implements OnInit, OnDestroy {
  public readonly registerFormId = 'pinCodeForm';
  public readonly loginControlName = 'login';
  public readonly passwordControlName = 'password';
  public readonly termsOfServiceControlName = 'termsOfService';
  public readonly termsOfMarketingControlName = 'termsOfMarketing';

  public registerForm: FormGroup = new FormGroup({});
  public isRequestPending$: Observable<boolean>;

  private onDestroy$ = new Subject<void>();

  constructor(
    private formUtils: FormUtilsService,
    private store: Store<fromCore.IState>,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('RegisterViewComponent'));
  }

  public ngOnInit(): void {
    this.isRequestPending$ = this.store.pipe(select(fromCore.getSessionPending));
    this.store
      .pipe(
        select(fromCore.getSessionError),
        filter(error => typeof error !== 'undefined'),
        /**
         * skip because of AnonymousGuard which is on /register route
         * that is why in Store is unauthorized error
         * we want to handle errors after registerForm submit
         */
        skip(1),
        takeUntil(this.onDestroy$),
      )
      .subscribe(err => {
        this.handleError(err);
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onFormSubmit(form: FormGroup): void {
    if (form.valid) {
      this.store.dispatch(
        new RegisterActions.RegisterAction({
          email: form.value[this.loginControlName],
          password: form.value[this.passwordControlName],
          isMarketingAllowed: form.value[this.termsOfMarketingControlName],
        }),
      );
    } else {
      this.formUtils.validateAllFormFields(form);
    }
  }

  private handleError(httpError: any): void {
    if (isBackendError(httpError.error)) {
      switch (httpError.error.code) {
        case BackendErrors.EmailAlreadyExists:
          this.showInputError(this.loginControlName, InputEmailComponent.InputEmailErrors.alreadyExists);
          break;

        default:
          this.loggerService.error('Unhandled backend error: ', httpError.error);
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      }
    } else {
      this.loggerService.warn('Error when register account:', httpError);
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    }
  }

  private showInputError(inputName: string, error: string): void {
    this.registerForm.controls[inputName].setErrors({ [error]: true });
    this.formUtils.validateAllFormFields(this.registerForm);
  }
}
