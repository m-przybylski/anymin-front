import { Component, Input, OnInit } from '@angular/core';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { CompanyConsultationDetailsViewService } from '@platform/shared/components/modals/company-consultation-details/company-consultation-details.service';
import { GetService } from '@anymind-ng/api/model/getService';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Animations } from '@anymind-ng/core';
import { ICompanyEmployeeRowComponent } from '@platform/shared/components/modals/company-consultation-details/company-employee-row/company-employee-row.component';
import { ConsultationDetailsViewComponent } from '@platform/shared/components/modals/consultation-details/consultation-details.view.component';
import { tap } from 'rxjs/operators';
import { EmployeesInviteService } from '@platform/shared/components/modals/invitations/employees-invite/employees-invite.service';
import { EmployeesInviteModalComponent } from '@platform/shared/components/modals/invitations/employees-invite/employees-invite.component';

@Component({
  selector: 'plat-company-consultation-details-view',
  templateUrl: './company-consultation-details.component.html',
  styleUrls: ['./company-consultation-details.component.sass'],
  providers: [CompanyConsultationDetailsViewService, ModalAnimationComponentService],
  animations: Animations.addItemAnimation,
})
export class CompanyConsultationDetailsViewComponent implements OnInit {
  public readonly avatarSize: AvatarSizeEnum = AvatarSizeEnum.X_96;
  public readonly modalType: ModalContainerTypeEnum = ModalContainerTypeEnum.NO_PADDING;
  public consultationDetails: GetService;
  public profileDetails: GetProfileWithDocuments;
  public isPending = true;
  public isPendingInvitationLoaded = false;
  public employeesList: ReadonlyArray<ICompanyEmployeeRowComponent> = [];
  public pendingEmployeesList: ReadonlyArray<ICompanyEmployeeRowComponent> = [];
  public tagList: ReadonlyArray<string>;

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
    private employeesInviteService: EmployeesInviteService,
  ) {}

  public ngOnInit(): void {
    this.companyConsultationDetailsViewService.getConsultationDetails(this.consultationId).subscribe(response => {
      this.tagList = response.tagsList;
      this.consultationDetails = response.serviceDetails.consultationDetails;
      this.profileDetails = response.serviceDetails.profileDetails;
      this.employeesList = response.employeesList;
      this.isPending = false;
      this.modalAnimationComponentService.onModalContentChange().next(false);
    });

    this.employeesInviteService
      .getNewInvitations$()
      .pipe(tap(() => (this.isPendingInvitationLoaded = true)))
      .subscribe(() => {
        this.getPendingEmployees();
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

  public onAddEmployees = (): string =>
    (this.modalService.open(EmployeesInviteModalComponent).componentInstance.serviceId = this.consultationId);

  public getPendingEmployees = (): void => {
    this.companyConsultationDetailsViewService.getInvitations(this.consultationId).subscribe(response => {
      this.pendingEmployeesList = response;
      this.isPendingInvitationLoaded = false;
    });
  };

  public onDeletePendingInvitation = (invitationId: string): void => {
    this.companyConsultationDetailsViewService.deletePendingInvitation(invitationId).subscribe(() => {
      this.pendingEmployeesList = this.pendingEmployeesList.filter(employee => employee.id !== invitationId);
    });
  };

  public openConsultationDetailsModal = (employeId: string): void => {
    const modalInstance = this.modalService.open(ConsultationDetailsViewComponent).componentInstance;
    modalInstance.serviceId = this.consultationId;
    modalInstance.expertId = employeId;
  };
}
