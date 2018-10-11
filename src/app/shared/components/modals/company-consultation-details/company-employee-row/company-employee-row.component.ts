import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';

export interface ICompanyEmployeeRowComponent {
  name: string;
  id: string;
  usageCounter?: number;
  commentCounter?: number;
  ratingCounter?: number;
  employeeId?: string;
  avatar?: string;
  invitationId?: string;
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
  public onDeleteEmployeeEmiter: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  public isOwnProfile = false;
  @Input()
  public isStatisticsVisible = false;

  public avatarSize: AvatarSizeEnum = AvatarSizeEnum.X_56;

  public onClickDelete = (employeeId: Event): void => {
    employeeId.stopPropagation();

    if (typeof this.employeeDetails.invitationId !== 'undefined') {
      this.onDeleteEmployeeEmiter.emit(this.employeeDetails.invitationId);
    } else {
      this.onDeleteEmployeeEmiter.emit(this.employeeDetails.id);
    }
  };
}
