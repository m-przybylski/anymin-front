import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDropdownComponent } from '@platform/shared/components/dropdown/dropdown.component';
import { ChangeMsisdnComponentService, VerifyMsisdnStatusEnum } from './change-msisdn.component.service';
import {
  Alerts,
  AlertService,
  FormUtilsService,
  InputPhoneNumberService,
  inputPhoneNumberErrorMessages,
} from '@anymind-ng/core';
import { finalize, map, filter, take } from 'rxjs/operators';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { Config } from '../../../../../../../../../config';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';

export interface IVerifyMsisdnStatus {
  msisdn: string;
  status: VerifyMsisdnStatusEnum;
}

@Component({
  selector: 'plat-change-msisdn',
  templateUrl: './change-msisdn.component.html',
  styleUrls: ['./change-msisdn.component.sass'],
  providers: [ChangeMsisdnComponentService],
})
export class ChangeMsisdnComponent implements OnInit, AfterViewInit {
  @Output()
  public msisdnVerificationStatusChange: EventEmitter<IVerifyMsisdnStatus> = new EventEmitter();

  public readonly changeMsisdnFormId = 'msisdnForm';
  public readonly msisdnControlName = 'msisdn';
  public readonly msisdnPrefixControlName = 'msisdnPrefix';
  public readonly msisdnPrefixes: ReadonlyArray<IDropdownComponent> = [
    {
      name: Config.localSettings.countryCodes[0],
    },
  ];
  public readonly msisdnPrefix = Config.localSettings.countryCodes[0];

  public changeMsisdnForm: FormGroup;
  public isRequestPending = false;
  public isSubmitButtonDisabled = false;
  public isInputRequired = true;

  private readonly prefixLength = 3;
  private readonly validationAlertsMap: Map<VerifyMsisdnStatusEnum, string> = new Map<VerifyMsisdnStatusEnum, string>([
    [VerifyMsisdnStatusEnum.ALREADY_EXISTS, inputPhoneNumberErrorMessages.alreadyExists],
    [VerifyMsisdnStatusEnum.BLOCKED, inputPhoneNumberErrorMessages.blocked],
    [VerifyMsisdnStatusEnum.WRONG_MSISDN, inputPhoneNumberErrorMessages.invalid],
  ]);
  private readonly alertMessageMap: Map<VerifyMsisdnStatusEnum, string> = new Map<VerifyMsisdnStatusEnum, string>([
    [VerifyMsisdnStatusEnum.CREATE_PIN_CODE_TOO_RECENTLY, Alerts.CreateAnotherPinCodeTokenTooRecently],
    [VerifyMsisdnStatusEnum.ERROR, Alerts.SomethingWentWrong],
  ]);
  private currentUserMsisdn: string;
  private fullMsisdn: string;

  constructor(
    private store: Store<fromRoot.IState>,
    private formUtils: FormUtilsService,
    private alertService: AlertService,
    private changeMsisdnService: ChangeMsisdnComponentService,
    private inputPhoneNumberService: InputPhoneNumberService,
    private modalAnimationComponentService: ModalAnimationComponentService,
  ) {}

  public ngOnInit(): void {
    this.changeMsisdnForm = new FormGroup({});
  }

  public ngAfterViewInit(): void {
    this.changeMsisdnForm.controls[this.msisdnPrefixControlName].setValue(this.msisdnPrefix);

    this.changeMsisdnForm.controls[this.msisdnControlName].setValidators(
      this.inputPhoneNumberService.getValidators(this.msisdnPrefix, this.isInputRequired),
    );

    /**
     * TODO: refactor callback of this subscription
     * not sure why this is placed in ngAfterViewInit().
     */
    getNotUndefinedSession(this.store)
      .pipe(take(1))
      .subscribe(getSessionWithAccount => {
        this.currentUserMsisdn = getSessionWithAccount.account.msisdn.slice(this.prefixLength);
        this.changeMsisdnForm.controls[this.msisdnControlName].valueChanges.subscribe(this.onMsisdnChange);
        this.changeMsisdnForm.controls[this.msisdnControlName].setValue(this.currentUserMsisdn);
        this.modalAnimationComponentService.isPendingRequest().next(false);
      });
  }

  public onSelectItemEmitter = (prefix: IDropdownComponent): void => {
    this.changeMsisdnForm.controls[this.msisdnPrefixControlName].setValue(prefix.name);
  };

  public onFormSubmit = (changeMsisdnForm: FormGroup): void => {
    if (changeMsisdnForm.valid) {
      this.isRequestPending = true;
      this.fullMsisdn =
        `${changeMsisdnForm.controls[this.msisdnPrefixControlName].value}` +
        `${changeMsisdnForm.controls[this.msisdnControlName].value}`;
      this.changeMsisdnService
        .verifyMsisdn(this.fullMsisdn)
        .pipe(
          finalize(() => (this.isRequestPending = false)),
          map(this.handleSuccessVerifyMsisdnStatus),
          filter(status => status !== undefined),
        )
        .subscribe(this.handleVerifyMsisdnStatus);
    } else {
      this.formUtils.validateAllFormFields(changeMsisdnForm);
    }
  };

  private handleSuccessVerifyMsisdnStatus = (status: VerifyMsisdnStatusEnum): VerifyMsisdnStatusEnum | undefined => {
    if (status === VerifyMsisdnStatusEnum.SUCCESS) {
      this.msisdnVerificationStatusChange.emit({
        msisdn: this.fullMsisdn,
        status: VerifyMsisdnStatusEnum.SUCCESS,
      });

      return undefined;
    }

    return status;
  };

  private handleVerifyMsisdnStatus = (status: VerifyMsisdnStatusEnum): void => {
    const errorMessage = this.validationAlertsMap.get(status);
    const alertMessage = this.alertMessageMap.get(status);
    const arg = errorMessage || (alertMessage || Alerts.SomethingWentWrong);

    const fn = errorMessage ? this.displayValidationError : this.displayDangerAlert;
    fn.call(this, arg);
  };

  private displayValidationError = (err: string): void => {
    const errObj = { [err]: true };
    this.changeMsisdnForm.controls[this.msisdnControlName].setErrors(errObj);
    this.formUtils.validateAllFormFields(this.changeMsisdnForm);
  };

  private displayDangerAlert = (alert: string): void => {
    this.alertService.pushDangerAlert(alert);
  };

  private onMsisdnChange = (msisdn: string): void => {
    this.isSubmitButtonDisabled = this.currentUserMsisdn === msisdn;
  };
}
