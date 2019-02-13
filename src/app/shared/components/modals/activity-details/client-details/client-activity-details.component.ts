import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Logger } from '@platform/core/logger';
import { ISueDetails } from '@platform/shared/components/modals/activity-details/components/sue-details/sue-details.component';
import { roomEvents } from 'machoke-sdk';
import { StepperComponent } from '@platform/shared/components/stepper/stepper.component';
import { EMPTY } from 'rxjs';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError } from 'rxjs/operators';
import { GetClientActivity } from '@anymind-ng/api';
import { MODAL_CLOSED_WITH_ERROR } from '@platform/shared/components/modals/activity-details/expert-company-details/expert-company-activity-details.component';
import ActivityTypeEnum = GetClientActivity.ActivityTypeEnum;
import { CLIENT_ACTIVITY_DETAILS_DATA } from './client-activity-details-helper';
import { ClientActivityDetailsComponentService } from './client-activity-details.component.service';

export interface IClientActivityData {
  activityId: string;
  isImportant: boolean;
}

@Component({
  selector: 'plat-client-details',
  templateUrl: './client-activity-details.component.html',
  styleUrls: ['../activity-details.sass'],
  providers: [ClientActivityDetailsComponentService],
})
export class ClientActivityDetailsComponent extends Logger implements OnInit {
  public activityType: ActivityTypeEnum;
  public sueDetails: ISueDetails;
  public modalHeaderTrKey: string;
  public groupedMessages: ReadonlyArray<ReadonlyArray<roomEvents.CustomMessageSent>> = [];
  public isChatHistoryVisible = false;
  public expertAvatarUrl: string;
  public isBackwardVisible = false;
  public isCompanyActivity?: boolean;
  public userAvatarUrl?: string;

  @ViewChild(StepperComponent)
  public stepper: StepperComponent;

  private readonly modalHeaderTrKeys = {
    default: 'ACTIVITY_DETAILS.MODAL_HEADER.DEFAULT',
    chatHistory: 'ACTIVITY_DETAILS.MODAL_HEADER.CHAT_HISTORY',
  };
  private readonly initialModalHeight = '100px';

  constructor(
    private modalAnimationComponentService: ModalAnimationComponentService,
    private clientActivityDetailsService: ClientActivityDetailsComponentService,
    private alertService: AlertService,
    private activeModal: NgbActiveModal,
    @Inject(CLIENT_ACTIVITY_DETAILS_DATA) private activityData: IClientActivityData,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ClientActivityDetailsComponent'));
    this.modalHeaderTrKey = this.modalHeaderTrKeys.default;
  }

  public ngOnInit(): void {
    this.fetchActivityDetails();
    this.clientActivityDetailsService.getUserAvatarUrl().subscribe(avatar => {
      this.userAvatarUrl = avatar;
    });
  }

  public onOpenChat(): void {
    this.stepper.next();
    this.modalHeaderTrKey = this.modalHeaderTrKeys.chatHistory;
    this.isBackwardVisible = true;
  }

  public onBackwardClick(): void {
    this.stepper.previous();
    this.modalHeaderTrKey = this.modalHeaderTrKeys.default;
    this.isBackwardVisible = false;
  }

  private fetchActivityDetails(): void {
    this.clientActivityDetailsService
      .getActivityDetails(this.activityData.activityId, this.activityData.isImportant)
      .pipe(
        catchError(err => {
          this.loggerService.warn('Error when try to getCallDetails', err);
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.activeModal.close(MODAL_CLOSED_WITH_ERROR);

          return EMPTY;
        }),
      )
      .subscribe(response => {
        this.sueDetails = response.activityDetails;
        this.isChatHistoryVisible = response.chatHistory.length > 0;
        this.groupedMessages = response.chatHistory;
        this.expertAvatarUrl = response.activityDetails.expertAvatarUrl;
        this.modalAnimationComponentService.stopLoadingAnimation(this.initialModalHeight);
      });
  }
}
