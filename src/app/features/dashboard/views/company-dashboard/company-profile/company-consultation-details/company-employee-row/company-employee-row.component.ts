import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { ICompanyEmployeeRowComponent } from '../../services/company-consultation.service';

@Component({
  selector: 'plat-company-employee-row',
  templateUrl: './company-employee-row.component.html',
  styleUrls: ['./company-employee-row.component.sass'],
})
export class CompanyEmployeeRowComponent {
  @Input()
  public employeeDetails: ICompanyEmployeeRowComponent;
  @Input()
  public isOwnProfile = false;
  @Input()
  public isStatisticsVisible = false;
  @Output()
  public deleteEmployee = new EventEmitter<void>();
  @Output()
  public openConsultation = new EventEmitter<void>();

  public avatarSize: AvatarSizeEnum = AvatarSizeEnum.X_56;

  public onClickDelete(): void {
    this.deleteEmployee.emit();
  }

  public onConsultationClick(): void {
    this.openConsultation.emit();
  }
}
