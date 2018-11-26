import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetCallDetails, GetComment, MoneyDto } from '@anymind-ng/api';

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
  public set sueDetails(value: ISueDetails | undefined) {
    if (typeof value !== 'undefined') {
      this.assignValuesForUI(value);
    }
  }

  @Output()
  public openChat: EventEmitter<void> = new EventEmitter();

  public clientName: string;
  public serviceName: string;
  public sueId: string;
  public answeredAt: Date;
  public callDuration: number;
  public servicePriceAmount: number;
  public servicePriceCurrency: string;
  public financialOperationAmount = 0;
  public financialOperationCurrency = 'PLN';
  public rate: string;
  public commentDetails?: GetComment;
  public recommendedTags: string;
  public isSueExpert: boolean;
  public expertName: string;

  private readonly moneyDivider = 100;
  private readonly oneSecondInMilliseconds = 1000;

  public onOpenChatClick = (): void => {
    this.openChat.emit();
  };

  private assignValuesForUI = (value: ISueDetails): void => {
    this.clientName = value.clientName || 'ACTIVITY_DETAILS.DETAIL_TITLE.CLIENT_NAME_ANONYMOUS';
    this.serviceName = value.serviceName;
    this.sueId = value.sueId;
    this.answeredAt = value.answeredAt;
    if (value.financialOperation) {
      this.financialOperationAmount = value.financialOperation.amount / this.moneyDivider;
      this.financialOperationCurrency = value.financialOperation.currency;
    }
    /**
     * multiple by 1000 because of use angular date pipe in template
     */
    this.callDuration = value.callDuration * this.oneSecondInMilliseconds;
    this.servicePriceAmount = value.servicePrice.amount / this.moneyDivider;
    this.servicePriceCurrency = value.servicePrice.currency;
    this.rate = this.getRateStatus(value.rate);
    this.commentDetails = value.comment;
    this.recommendedTags = value.recommendedTags;
    this.isSueExpert = value.isSueExpert;
    /**
     * if user is expert who provides the service we do not want to show his name
     */
    this.expertName = this.isSueExpert ? '' : value.expertName;
  };

  private getRateStatus = (rate?: GetCallDetails.RateEnum): string => {
    switch (rate) {
      case GetCallDetails.RateEnum.POSITIVE:
        return 'ACTIVITY_DETAILS.DETAIL_TITLE.RECOMMENDATION_POSITIVE';

      case GetCallDetails.RateEnum.NEGATIVE:
        return 'ACTIVITY_DETAILS.DETAIL_TITLE.RECOMMENDATION_NEGATIVE';

      default:
        return 'ACTIVITY_DETAILS.DETAIL_TITLE.RECOMMENDATION_NONE';
    }
  };
}
