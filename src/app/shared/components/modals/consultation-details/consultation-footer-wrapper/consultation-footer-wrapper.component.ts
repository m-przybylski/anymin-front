import { Component, Input, ChangeDetectionStrategy, Inject, Output, EventEmitter } from '@angular/core';
import { MoneyDto, DefaultCreditCard } from '@anymind-ng/api';
import { MoneyToAmount, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { COMMISSION, ICommission } from '@platform/core/commission';

export enum RightPanelStatusTypes {
  canCall = 'canCall',
  canNotify = 'canNotify',
  canEdit = 'canEdit',
  canLeave = 'canLeave',
}

export enum MiddlePanelStatusTypes {
  freeMinute = 'freeMinute',
  paymentCard = 'paymentCard',
  paymentAnyMind = 'paymentAnyMind',
  isFreelance = 'isFreelance',
  isOrganization = 'isOrganization',
  isOrganizationEdit = 'isOrganizationEdit',
  pickExpert = 'pickExpert',
  notAvailable = 'notAvailable',
  noPaymentSelected = 'noPaymentSelected',
}

export enum LeftPanelStatusTypes {
  showAmount = 'showAmount',
  hideAmount = 'hideAmount',
}

@Component({
  selector: 'plat-consultation-footer-wrapper',
  templateUrl: 'consultation-footer-wrapper.component.html',
  styleUrls: ['consultation-footer-wrapper.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultationFooterWrapperComponent extends Logger {
  public ownerId: string;
  public userId?: string;
  public expertsIdList: ReadonlyArray<string>;
  public isExpertAvailable: boolean;
  public isFreelance: boolean;
  public grossPrice: string;
  public price: string;
  public expertPrice: string;
  public organizationPrice: string;
  public defaultPayment: DefaultCreditCard;
  public balance: string;
  public duration: number;

  @Input()
  public set payload(value: IConsultationFooterData) {
    this.ownerId = value.ownerId;
    this.userId = value.userId;
    this.isExpertAvailable = value.isExpertAvailable;
    this.expertsIdList = value.expertsIdList;
    this.isFreelance = value.isFreelance;
    this.defaultPayment = value.defaultPayment;
    this.balance = this.pipe.transform(value.accountBalande);
    if (value.price !== undefined) {
      this.grossPrice = this.pipe.transform(value.price.grossPrice);
      this.price = this.pipe.transform(value.price.price);
      this.organizationPrice = this.pipe.transform({
        amount: value.price.price.amount * this.commissionConfig.freelanceConsultationCompanyCommission,
        currency: value.price.price.currency,
      });
      this.expertPrice = this.pipe.transform({
        amount:
          value.price.price.amount *
          (1 -
            (this.commissionConfig.freelanceConsultationCompanyCommission +
              this.commissionConfig.freelanceConsultationAnyMindCommission)),
        currency: value.price.price.currency,
      });
      this.duration = value.price.grossPrice.amount
        ? Math.floor(value.accountBalande.amount / value.price.grossPrice.amount)
        : 0;
    }
  }

  @Output()
  public editConsultationClick = new EventEmitter<void>();
  @Output()
  public removeConsultationClick = new EventEmitter<void>();
  @Output()
  public callConsultationClick = new EventEmitter<void>();
  @Output()
  public notifyConsultationClick = new EventEmitter<void>();
  @Output()
  public leaveConsultationClick = new EventEmitter<void>();
  @Output()
  public inviteConsultationClick = new EventEmitter<void>();

  private pipe: MoneyToAmount;

  constructor(@Inject(COMMISSION) private commissionConfig: ICommission, loggerFactory: LoggerFactory) {
    super(loggerFactory);
    this.pipe = new MoneyToAmount(this.loggerService);
  }
  public get leftPanel(): LeftPanelStatusTypes {
    if (
      this.userId !== this.ownerId &&
      this.expertsIdList.some(expertId => expertId === this.userId) &&
      !this.isFreelance
    ) {
      return LeftPanelStatusTypes.hideAmount;
    }

    return LeftPanelStatusTypes.showAmount;
  }
  // tslint:disable-next-line:cyclomatic-complexity
  public get middlePanel(): MiddlePanelStatusTypes | undefined {
    if (this.userId === undefined) {
      return MiddlePanelStatusTypes.freeMinute;
    }
    const userAsExpert = this.expertsIdList.some(expertId => expertId === this.userId);
    if (this.userId !== this.ownerId) {
      if (userAsExpert) {
        if (this.isFreelance) {
          return MiddlePanelStatusTypes.isFreelance;
        }

        return MiddlePanelStatusTypes.isOrganization;
      }
      if (!this.isExpertAvailable) {
        return MiddlePanelStatusTypes.notAvailable;
      }

      if (typeof this.defaultPayment.card === 'undefined') {
        return MiddlePanelStatusTypes.paymentAnyMind;
      }

      return MiddlePanelStatusTypes.paymentCard;
    }

    if (!userAsExpert) {
      return MiddlePanelStatusTypes.isOrganizationEdit;
    }

    return MiddlePanelStatusTypes.isFreelance;
  }
  public get rightPanel(): RightPanelStatusTypes | undefined {
    if (this.ownerId === this.userId) {
      return RightPanelStatusTypes.canEdit;
    }
    if (this.expertsIdList.some(expertId => expertId === this.userId)) {
      return RightPanelStatusTypes.canLeave;
    }
    if (this.isExpertAvailable) {
      return RightPanelStatusTypes.canCall;
    }

    return RightPanelStatusTypes.canNotify;
  }
  public onClick(fn: EventEmitter<void>): void {
    fn.emit();
  }
}

export interface IConsultationFooterData {
  ownerId: string;
  expertsIdList: ReadonlyArray<string>;
  isExpertAvailable: boolean;
  userId?: string;
  isFreelance: boolean;
  price?: {
    grossPrice: MoneyDto;
    price: MoneyDto;
  };
  defaultPayment: DefaultCreditCard;
  accountBalande: { amount: number; currency: string };
}
