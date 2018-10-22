import { Component, Input, OnInit, ComponentRef, ViewContainerRef, ViewChild } from '@angular/core';
import { ModalContainerTypeEnum, ModalComponent } from '@platform/shared/components/modals/modal/modal.component';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import {
  CompanyConsultationDetailsViewService,
  ICompanyConsultationDetails,
} from './company-consultation-details.view.service';
import { GetServiceWithEmployees } from '@anymind-ng/api';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Animations, LoggerFactory } from '@anymind-ng/core';
import { ICompanyEmployeeRowComponent } from '@platform/shared/components/modals/consultation-details/company-consultation-details/company-employee-row/company-employee-row.component';
import { ConsultationDetailsViewComponent } from '@platform/shared/components/modals/consultation-details/consultation-details.view.component';
import { EmployeesInviteModalComponent } from '@platform/shared/components/modals/invitations/employees-invite/employees-invite.component';
import { Logger } from '@platform/core/logger';
import { ConsultationDetailsViewService } from '../consultation-details.view.service';
import { IFooterOutput, IConsultationFooterData } from '../consultation-footers/consultation-footer-helpers';
import { ConsultationFooterResolver } from '../consultation-footers/consultation-footer.resolver';
import { Store, select } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { takeUntil, take } from 'rxjs/operators';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { Subject, forkJoin } from 'rxjs';
import {
  IConsultationDetailActionParameters,
  ConsultationDetailsActionsService,
} from '@platform/shared/components/modals/consultation-details/consultation-details-actions.service';

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
  public consultationDetails: GetServiceWithEmployees;
  public isPending = true;
  public isPendingInvitationLoaded = false;
  public employeesList: ReadonlyArray<ICompanyEmployeeRowComponent> = [];
  public pendingEmployeesList: ReadonlyArray<ICompanyEmployeeRowComponent> = [];
  public tagList: ReadonlyArray<string>;
  public isEmployeesListExist: boolean;
  public avatarToken?: string;
  public expertName?: string;

  @Input()
  public isOwnProfile: boolean;

  @Input()
  public consultationId: string;

  public get isPendingEmployeesListEmpty(): boolean {
    return this.pendingEmployeesList.length === 0;
  }
  public get serviceName(): string {
    return this.consultationDetails.serviceDetails.name;
  }
  public get serviceDescription(): string {
    return this.consultationDetails.serviceDetails.description;
  }
  public get registeredAt(): Date {
    return this.consultationDetails.serviceDetails.createdAt;
  }

  @ViewChild('footerContainer', { read: ViewContainerRef })
  private viewContainerRef: ViewContainerRef;
  @ViewChild(ModalComponent)
  private modalComponent: ModalComponent;
  private footerComponent: ComponentRef<IFooterOutput> | undefined;
  private isCompany: boolean;
  private userType: UserTypeEnum;
  private accountId: string;
  private destroyed$ = new Subject<void>();

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private companyConsultationDetailsViewService: CompanyConsultationDetailsViewService,
    private consultationDetailsViewService: ConsultationDetailsViewService,
    private consultationDetailsActionsService: ConsultationDetailsActionsService,
    private store: Store<fromCore.IState>,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory);
  }

  public ngOnInit(): void {
    forkJoin(
      this.store.pipe(
        select(fromCore.getSessionAndUserType),
        // filter(({ getSession }) => typeof getSession !== 'undefined'),
        take(1),
      ),
      this.companyConsultationDetailsViewService.getConsultationDetails(this.consultationId),
      // tslint:disable-next-line:cyclomatic-complexity
    ).subscribe(([{ getSession, getUserType }, getConsultationDetails]) => {
      this.tagList = getConsultationDetails.tagsList;
      this.consultationDetails = getConsultationDetails.serviceDetails;
      this.expertName =
        getConsultationDetails.serviceDetails.serviceDetails.ownerProfile.organizationDetails &&
        getConsultationDetails.serviceDetails.serviceDetails.ownerProfile.organizationDetails.name;
      this.avatarToken =
        getConsultationDetails.serviceDetails.serviceDetails.ownerProfile.organizationDetails &&
        getConsultationDetails.serviceDetails.serviceDetails.ownerProfile.organizationDetails.logo;
      this.employeesList = getConsultationDetails.employeesList;
      this.isEmployeesListExist = this.employeesList.length > 0;
      this.isCompany = (getSession && getSession.isCompany) || false;
      this.userType = this.userType || getUserType;
      this.accountId = (getSession && getSession.account.id) || '';
      this.footerComponent = this.attachFooter(this.accountId, getConsultationDetails);
      this.modalComponent.stopLoadingAnimation();
      this.isPending = false;
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

  private attachFooter(
    userId: string,
    getConsultationDetails: ICompanyConsultationDetails,
  ): ComponentRef<IFooterOutput> | undefined {
    const component = ConsultationFooterResolver.resolve(
      this.userType,
      this.isCompany,
      this.accountId,
      getConsultationDetails.serviceDetails.serviceDetails.ownerProfile.id,
      getConsultationDetails.employeesList.map(getConsultationDetail => getConsultationDetail.employeeId || ''),
    );
    if (component) {
      const footerComponent = this.consultationDetailsViewService.attachFooter(
        component,
        this.viewContainerRef,
        this.buildFooterData(userId, getConsultationDetails),
      );

      footerComponent.instance.actionTaken$.pipe(takeUntil(this.destroyed$)).subscribe(value => {
        const payload: IConsultationDetailActionParameters = {
          serviceId: this.consultationId,
          modal: this.activeModal,
          employmentId: undefined,
          expertId: undefined,
          createEditConsultationPayload: undefined,
        };
        this.consultationDetailsActionsService[value].call(this.consultationDetailsActionsService, payload);
      });

      return footerComponent;
    }

    return undefined;
  }

  private buildFooterData = (
    userId: string,
    getConsultationDetails: ICompanyConsultationDetails,
  ): IConsultationFooterData => ({
    accountBalance: getConsultationDetails.balance,
    defaultPayment: getConsultationDetails.payment,
    expertsIdList: getConsultationDetails.employeesList.map(employee => employee.id),
    isExpertAvailable: false,
    isFreelance: getConsultationDetails.serviceDetails.serviceDetails.isFreelance,
    ownerId: getConsultationDetails.serviceDetails.serviceDetails.ownerProfile.id,
    price: {
      grossPrice: getConsultationDetails.serviceDetails.serviceDetails.grossPrice,
      price: getConsultationDetails.serviceDetails.serviceDetails.netPrice,
    },
    userId,
  });
}
