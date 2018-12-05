import { Component, Input, EventEmitter, Output } from '@angular/core';
import { EmploymentWithService, MoneyDto } from '@anymind-ng/api';

@Component({
  selector: 'plat-consultation-row',
  templateUrl: './consultation-row.component.html',
  styleUrls: ['./consultation-row.component.sass'],
})
export class ConsultationRowComponent {
  @Input()
  public consultation: EmploymentWithService;
  @Input()
  public expertId: EmploymentWithService;
  @Output()
  public openConsultationDetails = new EventEmitter<string>();

  public get header(): string {
    return this.consultation.serviceDetails.name;
  }

  public get company(): string | undefined {
    return this.consultation.employeeId === this.consultation.serviceDetails.ownerProfile.id
      ? undefined
      : this.consultation.serviceDetails.ownerProfile.organizationDetails &&
          this.consultation.serviceDetails.ownerProfile.organizationDetails.name;
  }

  public get price(): MoneyDto {
    return this.consultation.serviceDetails.price;
  }

  public get usageCounter(): number {
    return this.consultation.usageCounter;
  }

  public get rating(): number | undefined {
    return this.consultation.rating;
  }

  public get commentCounter(): number {
    return this.consultation.commentCounter;
  }

  public get serviceId(): string {
    return this.consultation.serviceDetails.id;
  }

  public openConsultationDetailsModal = (serviceId: string): void => {
    this.openConsultationDetails.emit(serviceId);
  };
}
