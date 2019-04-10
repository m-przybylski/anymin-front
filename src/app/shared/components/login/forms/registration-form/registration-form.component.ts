import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Alerts, AlertService, FormUtilsService, InputEmailComponent, LoggerFactory } from '@anymind-ng/core';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { filter, skip, takeUntil } from 'rxjs/operators';
import { BackendErrors, isBackendError } from '@platform/shared/models/backend-error/backend-error';
import { Logger } from '@platform/core/logger';
import { RegistrationFormComponentService } from '@platform/shared/components/login/forms/registration-form/registration-form.component.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'plat-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.sass'],
  providers: [RegistrationFormComponentService],
})
export class RegistrationFormComponent extends Logger implements OnInit, OnDestroy, AfterViewInit {
  @Output()
  public onLoginLinkClick = new EventEmitter<void>();

  @Input()
  public isOpenInModal = false;

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
    private registrationService: RegistrationFormComponentService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('RegisterViewComponent'));
  }

  public loginClick(): void {
    this.onLoginLinkClick.emit();
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

  public ngAfterViewInit(): void {
    this.registerForm.controls[this.loginControlName].patchValue(this.registrationService.getLoginFromInvitation());
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onFormSubmit(form: FormGroup): void {
    if (form.valid) {
      this.registrationService.register(
        {
          email: form.value[this.loginControlName],
          password: form.value[this.passwordControlName],
          isMarketingAllowed: form.value[this.termsOfMarketingControlName],
        },
        this.isOpenInModal,
      );
    } else {
      this.formUtils.validateAllFormFields(form);
    }
  }

  private handleError(httpError: HttpErrorResponse): void {
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
