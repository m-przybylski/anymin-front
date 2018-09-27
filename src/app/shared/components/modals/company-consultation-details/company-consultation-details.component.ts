import { Component, Input, OnInit } from '@angular/core';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { CompanyConsultationDetailsViewService } from '@platform/shared/components/modals/company-consultation-details/company-consultation-details.service';
import { GetService } from '@anymind-ng/api/model/getService';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeesInviteModalComponent } from '@platform/shared/components/modals/employees-invite/employees-invite.component';
import { Animations } from '@anymind-ng/core';
import { ICompanyEmployeeRowComponent } from '@platform/shared/components/modals/company-consultation-details/company-employee-row/company-employee-row.component';
import { ConsultationDetailsViewComponent } from '@platform/shared/components/modals/consultation-details/consultation-details.view.component';
import { EmployeesInviteService } from '@platform/shared/components/modals/employees-invite/employees-invite.service';
import { tap } from 'rxjs/operators';
import { PreloaderContentSizeEnum } from '@platform/shared/components/preloader/preloader-container.component';

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
  public isPreloaderPending = false;

  public employeesList: ReadonlyArray<ICompanyEmployeeRowComponent> = [];
  public pendingEmployeesList: ReadonlyArray<ICompanyEmployeeRowComponent> = [];

  @Input()
  public isOwnProfile: boolean;

  @Input()
  public consultationId: string;

  private expertId: string;

  constructor(
    private modalService: NgbModal,
    private modalAnimationComponentService: ModalAnimationComponentService,
    private companyConsultationDetailsViewService: CompanyConsultationDetailsViewService,
    private employeesInviteService: EmployeesInviteService,
  ) {}

  public ngOnInit(): void {
    this.companyConsultationDetailsViewService.getServiceDetails(this.consultationId).subscribe(res => {
      this.isPending = false;
      this.modalAnimationComponentService.onModalContentChange().next(false);
      this.consultationDetails = res.consultationDetails;
      this.profileDetails = res.profileDetails;
    });

    this.employeesInviteService
      .getNewInvitations()
      .pipe(
        tap(() => {
          this.isPreloaderPending = true;
        }),
      )
      .subscribe(() => {
        this.getPendingEmployees();
      });

    this.companyConsultationDetailsViewService.getEmployeesList(this.consultationId).subscribe(res => {
      this.employeesList = res[0].employeesDetails.map(employee => {
        return {
          usageCounter: employee.usageCounter,
          commentCounter: employee.commentCounter,
          ratingCounter: employee.rating,
          id: employee.id,
          name: employee.employeeProfile.name,
          avatar: employee.employeeProfile.avatar,
          invitationId: employee.id,
        };
      });
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

  public getPendingEmployees = (): any =>
    this.companyConsultationDetailsViewService.getPendingInvitation(this.consultationId).subscribe(response => {
      this.pendingEmployeesList = response[0].invitations
        .filter(invitation => invitation.status === 'NEW')
        .map(item => ({
          name: item.email || item.msisdn || '',
          id: item.id,
        }));

      // TODO
      this.isPreloaderPending = false;
    });

  public onDeletePendingInvitation = (invitationId: string): void => {
    this.companyConsultationDetailsViewService.deletePendingInvitation(invitationId).subscribe(() => {
      this.pendingEmployeesList = this.pendingEmployeesList.filter(employee => employee.id !== invitationId);
    });
  };

  public openConsultationDetailsModal = (): void => {
    const modalInstance = this.modalService.open(ConsultationDetailsViewComponent).componentInstance;
    modalInstance.serviceId = this.consultationId;
    modalInstance.expertId = this.expertId;
  };
}
