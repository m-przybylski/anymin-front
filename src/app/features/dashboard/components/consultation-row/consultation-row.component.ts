import {
  Component,
  Input,
  EventEmitter,
  Output,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
  OnInit,
} from '@angular/core';
import { EmploymentWithService, MoneyDto, GetProfile, GetSessionWithAccount } from '@anymind-ng/api';
import { Config } from 'config';
import {
  IConsultationFooterData,
  IFooterOutput,
} from '@platform/shared/components/modals/consultation-details/consultation-footers/consultation-footer-helpers';
import {
  ConsultationFooterResolver,
  IFooterResolverPayload,
} from '@platform/shared/components/modals/consultation-details/consultation-footers/consultation-footer.resolver';
import { map, switchMap, take, takeUntil } from 'rxjs/operators';
import {
  ConsultationDetailsActionsService,
  IConsultationDetailActionParameters,
} from '@platform/shared/components/modals/consultation-details/consultation-details-actions.service';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { ConsultationDetailsViewService } from '@platform/shared/components/modals/consultation-details/consultation-details.view.service';
import { Observable, Subject } from 'rxjs';
import { Animations } from '@platform/shared/animations/animations';
import { IPaymentMethod } from '@platform/features/dashboard/components/consultation-row/consultation-row.component.interface';

@Component({
  selector: 'plat-consultation-row',
  templateUrl: './consultation-row.component.html',
  styleUrls: ['./consultation-row.component.sass'],
  animations: [Animations.rowCollapse],
})
export class ConsultationRowComponent implements OnInit {
  @Input()
  public consultation: EmploymentWithService;

  @Input()
  public isOwnProfile: boolean;

  @Input()
  public isExpended = false;

  @Input()
  public expertId: string;

  @Input()
  public expertAccountId: string;

  @Input()
  public isExpertAvailable: boolean;

  @Input()
  public consultationDetails: Observable<IPaymentMethod>;

  @Output()
  public openConsultationDetails = new EventEmitter<string>();

  public readonly minutesForPrice = 20;
  public twentyMinutesPrice: string;
  public collapsed = 'invisible';

  @ViewChild('footerContainer', { read: ViewContainerRef })
  private viewContainerRef: ViewContainerRef;

  private userType: UserTypeEnum | undefined;
  private destroyed$ = new Subject<void>();

  constructor(
    private consultationDetailsActionsService: ConsultationDetailsActionsService,
    private store: Store<fromCore.IState>,
    private consultationDetailsViewService: ConsultationDetailsViewService,
  ) {}

  public get header(): string {
    return this.consultation.serviceDetails.name;
  }

  public get company(): string | undefined {
    return this.consultation.serviceDetails.ownerProfile.profileType === GetProfile.ProfileTypeEnum.ORG
      ? this.consultation.serviceDetails.ownerProfile.name
      : '';
  }

  public get price(): MoneyDto {
    return this.consultation.serviceDetails.price;
  }

  public get usageCounter(): number {
    return this.consultation.usageCounter;
  }

  public get rating(): number | undefined {
    return this.consultation.rating;
  }

  public get ratingCounter(): number {
    return this.consultation.ratingCounter;
  }

  public get serviceId(): string {
    return this.consultation.serviceDetails.id;
  }

  public showConsultationDetails(serviceId: string): void {
    this.isOwnProfile ? this.openConsultationDetails.emit(serviceId) : this.toggleConsultation();
  }

  public ngOnInit(): void {
    this.twentyMinutesPrice = this.calculateMinutesPrice();
    if (!this.isOwnProfile) {
      this.consultationDetails
        .pipe(
          switchMap(paymentMethod =>
            this.store.pipe(
              select(fromCore.selectSession),
              map(session => ({ session, paymentMethod })),
            ),
          ),
          take(1),
        )
        .subscribe(({ session, paymentMethod }) => {
          this.attachFooter(session.session as GetSessionWithAccount, paymentMethod, this.isExpertAvailable);
        });
    }
  }

  private calculateMinutesPrice(): string {
    return Math.round(
      (this.minutesForPrice * this.consultation.serviceDetails.price.value) / Config.moneyDivider,
    ).toString();
  }

  private toggleConsultation(): void {
    this.collapsed === 'visible' ? (this.collapsed = 'invisible') : (this.collapsed = 'visible');
  }

  private attachFooter(
    getSessionWithAccount: GetSessionWithAccount,
    paymentMethod: IPaymentMethod,
    isExpertAvailable: boolean,
  ): ComponentRef<IFooterOutput> | undefined {
    const accountId = (getSessionWithAccount && getSessionWithAccount.account.id) || '';
    const resolverPayload: IFooterResolverPayload = {
      userType: this.userType,
      userAccountId: accountId,
      userExpertProfileId: getSessionWithAccount && getSessionWithAccount.session.expertProfileId,
      userOrganizationProfileId: getSessionWithAccount && getSessionWithAccount.session.organizationProfileId,
      serviceOwnerProfileId: this.consultation.serviceDetails.ownerProfile.id,
      expertProfileIdList: [],
    };
    const component = ConsultationFooterResolver.resolve(resolverPayload);
    if (component) {
      const footerComponent = this.consultationDetailsViewService.attachFooter(
        component,
        this.viewContainerRef,
        this.buildFooterData(accountId, this.consultation, paymentMethod, isExpertAvailable, this.expertId),
      );

      footerComponent.instance.actionTaken$.pipe(takeUntil(this.destroyed$)).subscribe(value => {
        const payload: IConsultationDetailActionParameters = {
          serviceId: this.serviceId,
          // to be removed. when expert profile moved to view.
          modal: undefined as any,
          employmentId: this.consultation.employeeId,
          expertId: this.expertId,
          expertAccountId: this.expertAccountId,
          defaultPaymentMethod: paymentMethod.defaultPaymentMethod,
        };
        this.consultationDetailsActionsService[value].call(this.consultationDetailsActionsService, payload);
      });

      return footerComponent;
    }

    return undefined;
  }

  private buildFooterData(
    userId: string,
    getConsultationDetails: EmploymentWithService,
    paymentMethod: IPaymentMethod,
    isExpertAvailable: boolean,
    expertId: string,
  ): IConsultationFooterData {
    return {
      defaultPaymentMethod: paymentMethod.defaultPaymentMethod,
      expertsIdList: [],
      isExpertAvailable,
      isFreelance: getConsultationDetails.serviceDetails.isFreelance,
      ownerAccountId: getConsultationDetails.serviceDetails.ownerProfile.accountId,
      price: getConsultationDetails.serviceDetails.price,
      userId,
      vatRateType: getConsultationDetails.vatRateType,
      creditCards: paymentMethod.getCreditCard || [],
      selectedExpertId: expertId,
    };
  }
}
