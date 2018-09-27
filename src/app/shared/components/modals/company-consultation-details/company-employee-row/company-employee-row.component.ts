import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';

export interface ICompanyEmployeeRowComponent {
  usageCounter?: number;
  commentCounter?: number;
  ratingCounter?: number;
  name: string;
  id: string;
  avatar?: string;
}

@Component({
  selector: 'plat-company-employee-row',
  templateUrl: './company-employee-row.component.html',
  styleUrls: ['./company-employee-row.component.sass'],
})
export class CompanyEmployeeRowComponent implements OnInit {
  @Input()
  public employeeDetails: ICompanyEmployeeRowComponent;
  @Output()
  public onDeleteEmployeeEmiter$: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public onDeletePendingInvitationEmiter$: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  public isOwnProfile = false;

  public avatarSize: AvatarSizeEnum = AvatarSizeEnum.X_56;

  public ngOnInit(): void {}

  public onClickDelete = (employeeId: string): void => {
    this.onDeletePendingInvitationEmiter$.emit(employeeId);
    this.onDeleteEmployeeEmiter$.emit(employeeId);
  };
}
