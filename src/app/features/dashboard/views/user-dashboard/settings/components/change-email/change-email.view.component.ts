import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { ChangeEmailStatusEnum, ChangeEmailViewComponentService } from './change-email.view.component.service';
import {
  Alerts,
  AlertService,
  FormUtilsService,
  InputEmailComponent,
  LoggerFactory,
  LoggerService,
} from '@anymind-ng/core';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Rx';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';

@Component({
  selector: 'plat-change-email',
  templateUrl: './change-email.view.component.html',
  styleUrls: ['./change-email.view.component.sass'],
  providers: [ChangeEmailViewComponentService],
})
export class ChangeEmailViewComponent implements OnDestroy, AfterViewInit {
  public readonly changeEmailFormId = 'changeEmailForm';
  public readonly emailControlName = 'email';
  public readonly modalWidth = ModalContainerTypeEnum.SMALL_WIDTH;

  public isEmailChanged = false;
  public changeEmailForm: FormGroup = new FormGroup({});
  public isRequestPending = false;
  public headerTrKey: string;

  private readonly headerTrKeys = {
    email: 'DASHBOARD.SETTINGS.CHANGE_EMAIL.HEADER',
    confirmation: 'DASHBOARD.SETTINGS.CHANGE_EMAIL.CONFIRMATION.HEADER',
  };
  private ngUnsubscribe$ = new Subject<void>();
  private logger: LoggerService;

  constructor(
    private changeEmailService: ChangeEmailViewComponentService,
    private formUtils: FormUtilsService,
    private alertService: AlertService,
    private modalAnimationComponentService: ModalAnimationComponentService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('ChangeEmailViewComponent');
    this.headerTrKey = this.headerTrKeys.email;
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public ngAfterViewInit(): void {
    this.modalAnimationComponentService.onModalContentChange().next(false);
  }

  public onFormSubmit = (form: FormGroup): void => {
    if (form.valid) {
      this.isRequestPending = true;
      this.changeEmailService
        .changeEmail(form.value[this.emailControlName])
        .pipe(finalize(() => (this.isRequestPending = false)))
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(this.handleSetEmailStatus);
    } else {
      this.formUtils.validateAllFormFields(form);
    }
  };

  private handleSetEmailStatus = (status: ChangeEmailStatusEnum): void => {
    switch (status) {
      case ChangeEmailStatusEnum.INVALID:
        this.displayIncorrectEmailError();
        break;

      case ChangeEmailStatusEnum.ALREADY_EXIST:
        this.displayAlreadyExistEmailError();
        break;

      case ChangeEmailStatusEnum.SUCCESS:
        this.isEmailChanged = true;
        this.headerTrKey = this.headerTrKeys.confirmation;
        this.modalAnimationComponentService.onModalContentChange().next(true);
        break;

      case ChangeEmailStatusEnum.ERROR:
        this.logger.warn('Handled ERROR email change status');
        break;

      default:
        this.logger.error('unhandled email change status', status);
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    }
  };

  private displayIncorrectEmailError = (): void => {
    this.changeEmailForm.controls[this.emailControlName].setErrors({
      [InputEmailComponent.InputEmailErrors.invalid]: true,
    });
    this.formUtils.validateAllFormFields(this.changeEmailForm);
  };

  private displayAlreadyExistEmailError = (): void => {
    this.changeEmailForm.controls[this.emailControlName].setErrors({
      [InputEmailComponent.InputEmailErrors.alreadyExists]: true,
    });
    this.formUtils.validateAllFormFields(this.changeEmailForm);
  };
}
