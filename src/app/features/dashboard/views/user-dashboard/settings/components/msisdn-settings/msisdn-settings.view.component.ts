import { Component } from '@angular/core';
import { VerifyMsisdnStatusEnum } from './change-msisdn/change-msisdn.component.service';
import { IPinVerificationStatus, PinVerificationPurposeEnum } from '../pin-verification/pin-verification.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PinVerificationStatus } from '../pin-verification/pin-verification.component.service';
import { Alerts, AlertService } from '@anymind-ng/core';
import { IVerifyMsisdnStatus } from './change-msisdn/change-msisdn.component';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { SessionActions } from '@platform/core/actions';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';

enum ChangeMsisdnModalStepEnum {
  CHANGE_MSISDN,
  PIN_VERIFICATION,
}

@Component({
  selector: 'plat-msisdn-settings',
  templateUrl: './msisdn-settings.view.component.html',
  styleUrls: ['./msisdn-settings.view.component.sass'],
})
export class MsisdnSettingsViewComponent {
  public readonly modalSteps: typeof ChangeMsisdnModalStepEnum = ChangeMsisdnModalStepEnum;
  public modalStep: ChangeMsisdnModalStepEnum = ChangeMsisdnModalStepEnum.CHANGE_MSISDN;
  public modalWidth = ModalContainerTypeEnum.SMALL_WIDTH;
  public modalHeaderTrKey: string;
  public pinVerificationPurpose: PinVerificationPurposeEnum = PinVerificationPurposeEnum.MSISDN_CHANGE;
  public newUserMsisdn: string;

  private readonly modalHeaderTranslations = {
    msisdn: 'DASHBOARD.SETTINGS.CHANGE_NUMBER.TITLE',
    pinVerification: 'DASHBOARD.SETTINGS.PIN_VERIFICATION.TITLE',
  };

  constructor(
    private activeModal: NgbActiveModal,
    private modalAnimationComponentService: ModalAnimationComponentService,
    private alertService: AlertService,
    private store: Store<fromCore.IState>,
  ) {
    this.modalHeaderTrKey = this.modalHeaderTranslations.msisdn;
  }

  public ngAfterViewInit(): void {
    this.modalAnimationComponentService.stopLoadingAnimation();
  }

  public onGoBack = (): void => {
    this.modalStep = ChangeMsisdnModalStepEnum.CHANGE_MSISDN;
    this.modalHeaderTrKey = this.modalHeaderTranslations.msisdn;
  };

  public onMsisdnVerificationStatus = (msisdnVerification: IVerifyMsisdnStatus): void => {
    if (msisdnVerification.status === VerifyMsisdnStatusEnum.SUCCESS) {
      this.newUserMsisdn = msisdnVerification.msisdn;
      this.modalStep = ChangeMsisdnModalStepEnum.PIN_VERIFICATION;
      this.modalHeaderTrKey = this.modalHeaderTranslations.pinVerification;
    }
  };

  public onPinVerification = (pinVerification: IPinVerificationStatus): void => {
    if (pinVerification.status === PinVerificationStatus.SUCCESS) {
      this.activeModal.close();
      this.alertService.pushSuccessAlert(Alerts.MsisdnChangedSuccess);
      this.store.dispatch(new SessionActions.FetchSessionAction());
    }
  };
}
