import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';

export interface ICompanyEmployeeRowComponent {
  name: string;
  id: string;
  usageCounter?: number;
  ratingCounter?: number;
  rating?: number;
  employeeId?: string;
  avatar?: string;
  invitationId?: string;
  // TODO remove email, msisdn, invitedExpertAccountId properties after https://anymind.atlassian.net/browse/PLAT-538
  email?: string;
  msisdn?: string;
  expertAccountId?: string;
  invitedExpertAccountId?: string;
}

@Component({
  selector: 'plat-company-employee-row',
  templateUrl: './company-employee-row.component.html',
  styleUrls: ['./company-employee-row.component.sass'],
})
export class CompanyEmployeeRowComponent {
  @Input()
  public employeeDetails: ICompanyEmployeeRowComponent;
  @Output()
  public deleteEmployee: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  public isOwnProfile = false;
  @Input()
  public isStatisticsVisible = false;

  public avatarSize: AvatarSizeEnum = AvatarSizeEnum.X_56;

  public onClickDelete = (employeeId: Event): void => {
    employeeId.stopPropagation();

    this.deleteEmployee.emit(this.employeeDetails.invitationId || this.employeeDetails.id);
  };
}
