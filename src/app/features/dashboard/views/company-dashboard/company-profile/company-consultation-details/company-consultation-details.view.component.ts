// tslint:disable:max-file-line-count
import {
  Component,
  OnInit,
  ComponentRef,
  ViewContainerRef,
  ViewChild,
  Injector,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { ICompanyConsultationDetails, ICompanyEmployeeRowComponent } from '../services/company-consultation.service';
import { GetSessionWithAccount } from '@anymind-ng/api';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LoggerFactory, SeoService } from '@anymind-ng/core';
import {
  ConsultationDetailsModalComponent,
  EXPERT_ACCOUNT_ID,
  EXPERT_ID,
  SERVICE_ID,
} from '@platform/shared/components/modals/consultation-details/consultation-details.view.component';
import {
  EMPLOYEES_INVITE_MODAL_CLOSED_WITH_CHANGES,
  EmployeesInviteModalComponent,
  IEmployeeInvitePayload,
} from '@platform/shared/components/modals/invitations/employees-invite/employees-invite.component';
import { Logger } from '@platform/core/logger';
import { Store, select } from '@ngrx/store';
import { takeUntil, filter, take } from 'rxjs/operators';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { Subject, forkJoin, Observable } from 'rxjs';
import {
  IConsultationDetailActionParameters,
  ConsultationDetailsActionsService,
} from '@platform/shared/components/modals/consultation-details/consultation-details-actions.service';
import { INVITATION_PAYLOAD } from '@platform/shared/components/modals/invitations/employees-invite/employee-invite';
import { ConsultationDetailsViewService } from '@platform/shared/components/modals/consultation-details/consultation-details.view.service';
import {
  IFooterOutput,
  IConsultationFooterData,
} from '@platform/shared/components/modals/consultation-details/consultation-footers/consultation-footer-helpers';
import {
  IFooterResolverPayload,
  ConsultationFooterResolver,
} from '@platform/shared/components/modals/consultation-details/consultation-footers/consultation-footer.resolver';
import { ActivatedRoute } from '@angular/router';
import { RouterPaths } from '@platform/shared/routes/routes';
import { CompanyConsultationPageActions } from '../actions';
import * as fromConsultationView from '../reducers';
import * as fromCore from '@platform/core/reducers';

@Component({
  selector: 'plat-company-consultation-details-view',
  templateUrl: './company-consultation-details.view.component.html',
  styleUrls: ['./company-consultation-details.view.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyConsultationDetailsViewComponent extends Logger implements OnInit, OnDestroy {
  public readonly avatarSize: AvatarSizeEnum = AvatarSizeEnum.X_96;
  public companyConsultationDetails$ = this.store.pipe(select(fromConsultationView.getConsultationData));
  public isLoading$ = this.store.pipe(select(fromConsultationView.getIsConsultationLoading));
  public isOwnService$ = this.store.pipe(select(fromConsultationView.getIsOwnService));
  public isInviteLoading$ = this.store.pipe(select(fromConsultationView.getIsInviteLoading));
  public pendingEmployeesList$ = this.store.pipe(select(fromConsultationView.getConsultationInvites));

  @ViewChild('footerContainer', { read: ViewContainerRef })
  private viewContainerRef: ViewContainerRef;
  private userType: UserTypeEnum | undefined;
  private destroyed$ = new Subject<void>();

  constructor(
    private modalService: NgbModal,
    private consultationDetailsViewService: ConsultationDetailsViewService,
    private consultationDetailsActionsService: ConsultationDetailsActionsService,
    private store: Store<fromCore.IState>,
    private injector: Injector,
    private seoService: SeoService,
    private route: ActivatedRoute,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('CompanyConsultationDetailsViewComponent'));
  }

  public ngOnInit(): void {
    this.store
      .pipe(
        select(fromCore.getSessionAndUserType),
        take(1),
      )
      .subscribe(({ getSession, getUserType }) => {
        this.store.dispatch(
          new CompanyConsultationPageActions.LoadConsultationsAction({
            serviceId: this.serviceId,
            getSessionWithAccount: getSession,
            userType: getUserType,
          }),
        );
      });

    forkJoin(
      this.store.pipe(
        select(fromCore.selectSession),
        take(1),
      ),
      this.companyConsultationDetails$.pipe(
        filter(companyConsultationDetails => companyConsultationDetails !== undefined),
        take(1),
      ) as Observable<ICompanyConsultationDetails>,
    ).subscribe(([getSession, companyConsultationDetails]) => {
      this.seoService.updateTags({
        title: companyConsultationDetails.serviceDetails.serviceDetails.name,
        description: companyConsultationDetails.serviceDetails.serviceDetails.description,
      });
      this.attachFooter(companyConsultationDetails, getSession && getSession.session);
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.store.dispatch(new CompanyConsultationPageActions.ClearAction());
  }
  public getAvatarToken(data?: ICompanyConsultationDetails): string | undefined {
    return data && data.serviceDetails.serviceDetails.ownerProfile.avatar;
  }
  public getExpertName(data?: ICompanyConsultationDetails): string | undefined {
    return data && data.serviceDetails.serviceDetails.ownerProfile.name;
  }

  public getServiceName(data?: ICompanyConsultationDetails): string | undefined {
    return data && data.serviceDetails.serviceDetails.name;
  }

  public getRegisteredAt(data?: ICompanyConsultationDetails): Date | undefined {
    return data && data.serviceDetails.serviceDetails.createdAt;
  }

  public getServiceDescription(data?: ICompanyConsultationDetails): string | undefined {
    return data && data.serviceDetails.serviceDetails.description;
  }

  public getTagList(data?: ICompanyConsultationDetails): ReadonlyArray<string> | undefined {
    return data && data.tagsList;
  }

  public hasEmployees(data?: ICompanyConsultationDetails): boolean {
    return (data && data.employeesList.length > 0) || false;
  }

  public getEmployeesList(data?: ICompanyConsultationDetails): ReadonlyArray<ICompanyEmployeeRowComponent> | undefined {
    return data && data.employeesList;
  }

  public hasInvites(data?: ReadonlyArray<ICompanyEmployeeRowComponent> | undefined): boolean {
    if (data === undefined || data.length === 0) {
      return false;
    }

    return true;
  }

  public onAddEmployees(data: ICompanyConsultationDetails): void {
    const payload: IEmployeeInvitePayload = {
      serviceId: this.serviceId,
      isFreelanceService: data.serviceDetails.serviceDetails.isFreelance,
    };
    const modalOptions: NgbModalOptions = {
      injector: Injector.create({
        providers: [{ provide: INVITATION_PAYLOAD, useValue: payload }],
        parent: this.injector,
      }),
    };
    const modal = this.modalService.open(EmployeesInviteModalComponent, modalOptions);
    modal.result
      .then(result => {
        if (result === EMPLOYEES_INVITE_MODAL_CLOSED_WITH_CHANGES) {
          this.store.dispatch(new CompanyConsultationPageActions.LoadPendingInvitesAction(this.serviceId));
        }
      })
      .catch(err => this.loggerService.warn(err));
  }

  public onDeleteEmployee(row: ICompanyEmployeeRowComponent): void {
    if (row.employeeId !== undefined) {
      this.store.dispatch(new CompanyConsultationPageActions.DeleteEmploymentAction(row.employeeId));
    }
  }

  public onDeletePendingInvitation(row: ICompanyEmployeeRowComponent): void {
    this.store.dispatch(new CompanyConsultationPageActions.DeleteInviteAction(row.id));
  }

  public openConsultationDetailsModal(employee: ICompanyEmployeeRowComponent): void {
    const options: NgbModalOptions = {
      injector: Injector.create({
        providers: [
          { provide: SERVICE_ID, useValue: this.serviceId },
          { provide: EXPERT_ID, useValue: employee.employeeId },
          { provide: EXPERT_ACCOUNT_ID, useValue: employee.expertAccountId },
        ],
      }),
    };
    this.modalService.open(ConsultationDetailsModalComponent, options);
  }

  private attachFooter(
    getConsultationDetails: ICompanyConsultationDetails,
    getSessionWithAccount?: GetSessionWithAccount,
  ): ComponentRef<IFooterOutput> | undefined {
    const accountId = (getSessionWithAccount && getSessionWithAccount.account.id) || '';
    const expertProfileIdList = getConsultationDetails.serviceDetails.employeesDetails
      .map(employeesDetail => employeesDetail.employeeProfile.id || '')
      /**
       * need to add extra element to the list
       * in case there is only one item system displays user footer
       * empty string is dangerous so any value do the trick
       */
      .concat('$');
    const resolverPayload: IFooterResolverPayload = {
      userType: this.userType,
      userAccountId: accountId,
      userExpertProfileId: getSessionWithAccount && getSessionWithAccount.session.expertProfileId,
      userOrganizationProfileId: getSessionWithAccount && getSessionWithAccount.session.organizationProfileId,
      serviceOwnerProfileId: getConsultationDetails.serviceDetails.serviceDetails.ownerProfile.id,
      expertProfileIdList,
    };

    const component = ConsultationFooterResolver.resolve(resolverPayload);
    if (component) {
      const footerComponent = this.consultationDetailsViewService.attachFooter(
        component,
        this.viewContainerRef,
        this.buildFooterData(accountId, getConsultationDetails),
      );

      footerComponent.instance.actionTaken$.pipe(takeUntil(this.destroyed$)).subscribe(value => {
        const payload: IConsultationDetailActionParameters = {
          serviceId: this.serviceId,
          // to be removed. when expert profile moved to view.
          modal: undefined as any,
          employmentId: undefined,
          expertId: undefined,
          expertAccountId: undefined,
          defaultPaymentMethod: getConsultationDetails.defaultPaymentMethod,
          createEditConsultationPayload: {
            isExpertConsultation: false,
            profileId: '',
            // make a copy of an object. Not sure what if other component does not mutate the object
            serviceDetails: { ...getConsultationDetails.serviceDetails.serviceDetails },
            tags: getConsultationDetails.tagsList,
            isOwnerEmployee: getConsultationDetails.serviceDetails.employeesDetails.some(
              employee =>
                employee.employeeProfile.accountId ===
                getConsultationDetails.serviceDetails.serviceDetails.ownerProfile.accountId,
            ),
          },
        };
        this.consultationDetailsActionsService[value].call(this.consultationDetailsActionsService, payload);
      });

      return footerComponent;
    }

    return undefined;
  }

  private buildFooterData(
    userId: string,
    getConsultationDetails: ICompanyConsultationDetails,
  ): IConsultationFooterData {
    return {
      defaultPaymentMethod: getConsultationDetails.defaultPaymentMethod,
      expertsIdList: getConsultationDetails.employeesList.map(employee => employee.id),
      isExpertAvailable: false,
      isFreelance: getConsultationDetails.serviceDetails.serviceDetails.isFreelance,
      ownerAccountId: getConsultationDetails.serviceDetails.serviceDetails.ownerProfile.accountId,
      price: getConsultationDetails.serviceDetails.serviceDetails.price,
      userId,
      creditCards: getConsultationDetails.creditCards,
      getCommissions: getConsultationDetails.getCommissions,
    };
  }

  private get serviceId(): string {
    return this.route.snapshot.paramMap.get(RouterPaths.dashboard.company.profile.service.params.serviceId) as string;
  }
}
