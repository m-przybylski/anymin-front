import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { MoneyDto, ServiceWithEmployments } from '@anymind-ng/api';
import { Config } from '@anymind-ng/core';

export interface IOpenCompanyConsultationModal {
  serviceId: string;
  isOwnProfile: boolean;
}

@Component({
  selector: 'plat-consultation-company-row',
  templateUrl: './consultation-company-row.component.html',
  styleUrls: ['./consultation-company-row.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultationCompanyRowComponent {
  @Input()
  public consultation: ServiceWithEmployments;

  @Input()
  public isOwnProfile = false;

  @Output()
  public openConsultationDetails = new EventEmitter<IOpenCompanyConsultationModal>();

  private readonly _callDuration = 20;

  public get header(): string {
    return this.consultation.service.name;
  }

  public get price(): MoneyDto {
    return this.consultation.service.price;
  }

  public get expertCount(): number {
    return this.consultation.employments.length;
  }

  public get callDuration(): number {
    return this._callDuration;
  }

  public get timeMoney(): number {
    return Math.round((this.consultation.service.price.value / Config.moneyDivider) * this.callDuration);
  }

  public openConsultationModal(): void {
    this.openConsultationDetails.emit({ serviceId: this.serviceId, isOwnProfile: this.isOwnProfile });
  }

  private get serviceId(): string {
    return this.consultation.service.id;
  }
}
