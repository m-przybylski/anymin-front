import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MoneyDto, ServiceWithEmployments } from '@anymind-ng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyConsultationDetailsViewComponent } from '@platform/shared/components/modals/consultation-details/company-consultation-details/company-consultation-details.view.component';

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

  constructor(private modalService: NgbModal) {}

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
    const modal = this.modalService.open(CompanyConsultationDetailsViewComponent);
    modal.componentInstance.consultationId = this.consultationId;
    modal.componentInstance.isOwnProfile = this.isOwnProfile;
  }

  private get consultationId(): string {
    return this.consultation.service.id;
  }
}
