import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { MoneyDto, ServiceWithEmployments } from '@anymind-ng/api';

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

  public get header(): string {
    return this.consultation.service.name;
  }

  public get price(): MoneyDto {
    return this.consultation.service.price;
  }

  public get expertAvatarTokenList(): ReadonlyArray<string> {
    return this.consultation.employments.map(employment => employment.employeeProfile.avatar);
  }

  public openConsultationModal(): void {
    this.openConsultationDetails.emit({ serviceId: this.serviceId, isOwnProfile: this.isOwnProfile });
  }

  private get serviceId(): string {
    return this.consultation.service.id;
  }
}
