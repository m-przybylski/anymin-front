import { Component, Input } from '@angular/core';
import { EmploymentWithService, MoneyDto } from '@anymind-ng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsultationDetailsViewComponent } from '../../../../shared/components/modals/consultation-details/consultation-details.view.component';

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

  constructor(private modaService: NgbModal) {}

  public openConsultationDetailsModal = (): void => {
    const modalInstance = this.modaService.open(ConsultationDetailsViewComponent).componentInstance;
    modalInstance.serviceId = this.consultation.serviceDetails.id;
    modalInstance.expertId = this.expertId;
  };

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
    return this.consultation.serviceDetails.grossPrice;
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
}
