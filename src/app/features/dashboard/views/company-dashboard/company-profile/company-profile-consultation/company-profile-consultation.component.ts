import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmploymentWithService } from '@anymind-ng/api';

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

  public add(): void {
    this.addConsultation.emit();
  }
}
