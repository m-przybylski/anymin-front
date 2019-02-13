import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetCallDetails, GetClientComplaint, GetComment, MoneyDto } from '@anymind-ng/api';

export interface ISueDetails {
  serviceName: string;
  clientAvatarUrl: string;
  expertAvatarUrl: string;
  sueId: string;
  answeredAt: Date;
  callDuration: number;
  servicePrice: MoneyDto;
  recommendedTags: string;
  isSueExpert: boolean;
  expertName: string;
  clientName?: string;
  financialOperation?: MoneyDto;
  rate?: GetCallDetails.RateEnum;
  comment?: GetComment;
  ratelRoomId?: string;
  complaint?: GetClientComplaint;
}

@Component({
  selector: 'plat-sue-details',
  templateUrl: './sue-details.component.html',
  styleUrls: ['./sue-details.component.sass'],
})
export class SueDetailsComponent {
  @Input()
  public isChatHistoryVisible: boolean;

  @Input()
  public isCompanyActivity: boolean;

  @Input()
  public isClientActivity: boolean;

  @Input()
  public isReportComplaintOptionVisible = false;

  @Input()
  public set sueDetails(value: ISueDetails | undefined) {
    if (typeof value !== 'undefined') {
      this.assignValuesForUI(value);
    }
  }

  @Output()
  public openChat: EventEmitter<void> = new EventEmitter();

  @Output()
  public rateConsultation: EventEmitter<void> = new EventEmitter();

  @Output()
  public reportComplaint: EventEmitter<void> = new EventEmitter();

  public clientName: string;
  public serviceName: string;
  public sueId: string;
  public answeredAt: Date;
  public callDuration: number;
  public servicePrice: MoneyDto;
  public financialOperation: MoneyDto;
  public rateTrKey: string;
  public rateValue?: GetCallDetails.RateEnum;
  public commentDetails?: GetComment;
  public recommendedTags: string;
  public isSueExpert: boolean;
  public expertName: string;
  public financialOperationTrKey: string;

  private readonly oneSecondInMilliseconds = 1000;

  public onOpenChatClick(): void {
    this.openChat.emit();
  }

  public onReportComplaintClick(): void {
    this.reportComplaint.emit();
  }

  public onRateConsultationClick(): void {
    if (typeof this.rateValue === 'undefined') {
      this.rateConsultation.emit();
    }
  }

  private assignValuesForUI(value: ISueDetails): void {
    this.clientName = value.clientName || 'ACTIVITY_DETAILS.DETAIL_TITLE.CLIENT_NAME_ANONYMOUS';
    this.serviceName = value.serviceName;
    this.sueId = value.sueId;
    this.answeredAt = value.answeredAt;
    if (value.financialOperation) {
      this.financialOperation = value.financialOperation;
    }
    /**
     * multiple by 1000 because of use angular date pipe in template
     */
    this.callDuration = value.callDuration * this.oneSecondInMilliseconds;
    this.servicePrice = value.servicePrice;
    this.rateTrKey = this.getRateTrKey(value.rate);
    this.rateValue = value.rate;
    this.commentDetails = value.comment;
    this.recommendedTags = value.recommendedTags;
    this.isSueExpert = value.isSueExpert;
    /**
     * if user is expert who provides the service we do not want to show his name
     */
    this.expertName = this.isSueExpert ? '' : value.expertName;
    this.financialOperationTrKey = this.isClientActivity
      ? 'ACTIVITY_DETAILS.DETAIL_TITLE.FINANCIAL_OPERATION.EXPENSE'
      : 'ACTIVITY_DETAILS.DETAIL_TITLE.FINANCIAL_OPERATION.INCOME';
  }

  private getRateTrKey(rate?: GetCallDetails.RateEnum): string {
    switch (rate) {
      case GetCallDetails.RateEnum.POSITIVE:
        return 'ACTIVITY_DETAILS.DETAIL_TITLE.RECOMMENDATION_POSITIVE';

      case GetCallDetails.RateEnum.NEGATIVE:
        return 'ACTIVITY_DETAILS.DETAIL_TITLE.RECOMMENDATION_NEGATIVE';

      default:
        return this.isClientActivity
          ? 'ACTIVITY_DETAILS.DETAIL_TITLE.RECOMMENDATION_RATE'
          : 'ACTIVITY_DETAILS.DETAIL_TITLE.RECOMMENDATION_NONE';
    }
  }
}
