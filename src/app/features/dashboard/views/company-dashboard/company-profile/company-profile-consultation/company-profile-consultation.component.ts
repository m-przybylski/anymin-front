import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmploymentWithService } from '@anymind-ng/api';
import { IOpenCompanyConsultationModal } from '@platform/features/dashboard/components/consultation-company-row/consultation-company-row.component';

@Component({
  selector: 'plat-company-profile-consultations',
  templateUrl: './company-profile-consultation.component.html',
  styleUrls: ['./company-profile-consultation.component.sass'],
})
export class CompanyProfileConsultationsComponent {
  @Input()
  public consultations: ReadonlyArray<EmploymentWithService>;
  @Input()
  public isOwnProfile: boolean;

  @Output()
  public addConsultation = new EventEmitter<void>();

  @Output()
  public openConsultationDetails = new EventEmitter<IOpenCompanyConsultationModal>();

  public add(): void {
    this.addConsultation.emit();
  }

  public openConsultationDetail(event: IOpenCompanyConsultationModal): void {
    this.openConsultationDetails.emit(event);
  }
}
