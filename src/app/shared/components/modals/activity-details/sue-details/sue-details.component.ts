import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MoneyDto } from '@anymind-ng/api';

export interface ISueDetails {
  serviceName: string;
  clientName?: string;
  clientAvatarUrl: string;
  expertAvatarUrl: string;
  sueId: string;
  answeredAt: Date;
  callDuration: number;
  servicePrice: MoneyDto;
  financialOperation?: MoneyDto;
  // todo wait for https://anymind.atlassian.net/browse/PLAT-544
  isRecommended: boolean;
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
  public set activityDetails(value: ISueDetails | undefined) {
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
  public isRecommended: string;

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
    // todo wait for https://anymind.atlassian.net/browse/PLAT-544
    this.isRecommended = value.isRecommended
      ? 'ACTIVITY_DETAILS.DETAIL_TITLE.RECOMMENDATION_POSITIVE'
      : 'ACTIVITY_DETAILS.DETAIL_TITLE.RECOMMENDATION_NEGATIVE';
  };
}
