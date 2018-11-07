import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserSessionService } from '../../../../../../../../core/services/user-session/user-session.service';
import { IDropdownComponent } from '../../../../../../../../shared/components/dropdown/dropdown.component';
import { ChangeMsisdnComponentService, VerifyMsisdnStatusEnum } from './change-msisdn.component.service';
import {
  Alerts,
  AlertService,
  FormUtilsService,
  InputPhoneNumberService,
  LoggerFactory,
  LoggerService,
  inputPhoneNumberErrorMessages,
} from '@anymind-ng/core';
import { finalize, map, filter } from 'rxjs/operators';
import { ModalAnimationComponentService } from '../../../../../../../../shared/components/modals/modal/animation/modal-animation.animation.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Config } from '../../../../../../../../../config';

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
  private logger: LoggerService;
  private fullMsisdn: string;

  constructor(
    private userService: UserSessionService,
    private formUtils: FormUtilsService,
    private alertService: AlertService,
    private changeMsisdnService: ChangeMsisdnComponentService,
    private inputPhoneNumberService: InputPhoneNumberService,
    private activeModal: NgbActiveModal,
    private modalAnimationComponentService: ModalAnimationComponentService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('ChangeMsisdnComponent');
  }

  public ngOnInit(): void {
    this.changeMsisdnForm = new FormGroup({});
  }

  public ngAfterViewInit(): void {
    this.changeMsisdnForm.controls[this.msisdnPrefixControlName].setValue(this.msisdnPrefix);

    this.changeMsisdnForm.controls[this.msisdnControlName].setValidators(
      this.inputPhoneNumberService.getValidators(this.msisdnPrefix, this.isInputRequired),
    );

    this.userService
      .getSession(true)
      .then(user => {
        this.currentUserMsisdn = user.account.msisdn.slice(this.prefixLength);
        this.changeMsisdnForm.controls[this.msisdnControlName].valueChanges.subscribe(this.onMsisdnChange);
        this.changeMsisdnForm.controls[this.msisdnControlName].setValue(this.currentUserMsisdn);
        this.modalAnimationComponentService.isPendingRequest().next(false);
      })
      .catch(error => {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        this.logger.warn('error when try to get session', error);
        this.activeModal.close();
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
