import { Component, Input, OnInit } from '@angular/core';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { CompanyConsultationDetailsViewService } from '@platform/shared/components/modals/company-consultation-details/company-consultation-details.view.service';
import { GetService } from '@anymind-ng/api/model/getService';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Animations, LoggerFactory } from '@anymind-ng/core';
import { ICompanyEmployeeRowComponent } from '@platform/shared/components/modals/company-consultation-details/company-employee-row/company-employee-row.component';
import { ConsultationDetailsViewComponent } from '@platform/shared/components/modals/consultation-details/consultation-details.view.component';
import { EmployeesInviteModalComponent } from '@platform/shared/components/modals/invitations/employees-invite/employees-invite.component';
import { Logger } from '@platform/core/logger';

@Component({
  selector: 'plat-company-consultation-details-view',
  templateUrl: './company-consultation-details.view.component.html',
  styleUrls: ['./company-consultation-details.view.component.sass'],
  providers: [CompanyConsultationDetailsViewService, ModalAnimationComponentService],
  animations: Animations.addItemAnimation,
})
export class CompanyConsultationDetailsViewComponent extends Logger implements OnInit {
  public readonly avatarSize: AvatarSizeEnum = AvatarSizeEnum.X_96;
  public readonly modalType: ModalContainerTypeEnum = ModalContainerTypeEnum.NO_PADDING;
  public consultationDetails: GetService;
  public profileDetails: GetProfileWithDocuments;
  public isPending = true;
  public isPendingInvitationLoaded = false;
  public employeesList: ReadonlyArray<ICompanyEmployeeRowComponent> = [];
  public pendingEmployeesList: ReadonlyArray<ICompanyEmployeeRowComponent> = [];
  public tagList: ReadonlyArray<string>;
  public isEmployeesListExist: boolean;

  @Input()
  public isOwnProfile: boolean;

  @Input()
  public consultationId: string;

  public get isPendingEmployeesListEmpty(): boolean {
    return this.pendingEmployeesList.length === 0;
  }

  constructor(
    private modalService: NgbModal,
    private modalAnimationComponentService: ModalAnimationComponentService,
    private companyConsultationDetailsViewService: CompanyConsultationDetailsViewService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory);
  }

  public ngOnInit(): void {
    this.companyConsultationDetailsViewService.getConsultationDetails(this.consultationId).subscribe(response => {
      this.tagList = response.tagsList;
      this.consultationDetails = response.serviceDetails.consultationDetails;
      this.profileDetails = response.serviceDetails.profileDetails;
      this.employeesList = response.employeesList;
      this.isPending = false;
      this.modalAnimationComponentService.onModalContentChange().next(false);
      this.isEmployeesListExist = this.employeesList.length > 0;
    });

    if (this.isOwnProfile) {
      this.getPendingEmployees();
    }
  }

  public onDeleteEmployee = (employeeId: string): void => {
    this.companyConsultationDetailsViewService
      .deleteEmployee(employeeId)
      .subscribe(() => (this.employeesList = this.employeesList.filter(employee => employee.id !== employeeId)));
  };

  public onAddEmployees = (): void => {
    const modal = this.modalService.open(EmployeesInviteModalComponent);
    modal.componentInstance.serviceId = this.consultationId;
    modal.result
      .then(() => {
        this.isPendingInvitationLoaded = true;
        this.getPendingEmployees();
      })
      .catch(err => this.loggerService.warn(err));
  };

  public getPendingEmployees = (): void => {
    this.companyConsultationDetailsViewService.getInvitations(this.consultationId).subscribe(response => {
      this.pendingEmployeesList = response.map(item => ({
        name: item.name,
        id: item.id,
        invitationId: item.employeeId || item.id || '',
        avatar: item.avatar || '',
        employeeId: item.employeeId || '',
      }));
      this.isPendingInvitationLoaded = false;
    });
  };

  public onDeletePendingInvitation = (invitationId: string): void => {
    this.companyConsultationDetailsViewService.deletePendingInvitation(invitationId).subscribe(() => {
      this.pendingEmployeesList = this.pendingEmployeesList.filter(employee => employee.invitationId !== invitationId);
      this.isPendingInvitationLoaded = false;
    });
  };

  public openConsultationDetailsModal = (employeId: string): void => {
    const modalInstance = this.modalService.open(ConsultationDetailsViewComponent);
    modalInstance.componentInstance.serviceId = this.consultationId;
    modalInstance.componentInstance.expertId = employeId;
  };
}
