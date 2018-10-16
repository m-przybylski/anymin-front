// tslint:disable:max-file-line-count
import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  Injector,
  OnDestroy,
  ComponentRef,
  ComponentFactoryResolver,
  Input,
} from '@angular/core';
import { AvatarSizeEnum } from '../../user-avatar/user-avatar.component';
import { ConsultationDetailsViewService, IConsultationDetails } from './consultation-details.view.service';
import { filter, take, takeUntil } from 'rxjs/operators';
import {
  ConsultationDetailsActionsService,
  IConsultationDetailActionParameters,
} from './consultation-details-actions.service';
import { forkJoin, Subject } from 'rxjs';
import { EmploymentWithService, GetComment, GetSessionWithAccount } from '@anymind-ng/api';
import { ModalAnimationComponentService } from '../modal/animation/modal-animation.animation.service';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import {
  IConsultationFooterData,
  CONSULTATION_FOOTER_DATA,
  IFooterOutput,
} from './consultation-footers/consultation-footer-helpers';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsultationFooterResolver } from './consultation-footers/consultation-footer.resolver';
import { ICreateEditConsultationPayload } from '@platform/shared/components/modals/create-edit-consultation/create-edit-consultation.component';
import { ServiceWithOwnerProfile } from '@anymind-ng/api/model/serviceWithOwnerProfile';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';

@Component({
  selector: 'plat-consultation-details-view',
  templateUrl: './consultation-details.view.component.html',
  styleUrls: ['./consultation-details.view.component.sass'],
  providers: [ConsultationDetailsViewService],
})
export class ConsultationDetailsViewComponent implements OnInit, OnDestroy {
  public readonly avatarSize96: AvatarSizeEnum = AvatarSizeEnum.X_96;
  public readonly modalType: ModalContainerTypeEnum = ModalContainerTypeEnum.NO_PADDING;

  public serviceName: string;
  public serviceDescription: string;
  public registeredAt: Date;
  public tagList: ReadonlyArray<string> = [];
  public expertName: string;
  public companyName: string;
  public companyLogo: string;
  public expertAvatar: string;
  public consultation: EmploymentWithService;
  public usageCounter: number;
  public commentCounter: number;
  public ratingCounter: number;
  public commentsConsultation: ReadonlyArray<GetComment> = [];
  public employmentId: string;
  public ifMaxCommentsLengthReached = false;
  public isCommentsRequestPending = false;
  public isPending = true;
  public accountId: string;
  public isOwner: boolean;

  @Input()
  public userType: UserTypeEnum;

  @Input()
  public serviceId: string;

  @Input()
  public expertId: string;

  @ViewChild('footerContainer', { read: ViewContainerRef })
  private viewContainerRef: ViewContainerRef;
  private destroyed$ = new Subject<void>();
  private footerComponent: ComponentRef<IFooterOutput> | undefined;
  private editConsultationPayload: ICreateEditConsultationPayload;
  private isCompany: boolean;

  constructor(
    private store: Store<fromCore.IState>,
    private consultationDetailsViewService: ConsultationDetailsViewService,
    private consultationDetailsActionsService: ConsultationDetailsActionsService,
    private modalAnimationComponentService: ModalAnimationComponentService,
    private activeModal: NgbActiveModal,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
  ) {
    this.store
      .pipe(
        select(fromCore.getSessionAndUserType),
        filter(({ getSession }) => typeof getSession !== 'undefined'),
      )
      .subscribe(({ getSession, getUserType }: { getSession: GetSessionWithAccount; getUserType: UserTypeEnum }) => {
        this.isCompany = getSession.isCompany;
        this.userType = this.userType || getUserType;
      });
  }

  public ngOnInit(): void {
    forkJoin(
      this.store.pipe(
        select(fromCore.getSession),
        take(1),
      ),
      this.consultationDetailsViewService.getServicesTagList(this.serviceId),
      this.consultationDetailsViewService.getServiceDetails(this.serviceId, this.expertId),
      this.consultationDetailsViewService.getExpertAvailability(this.expertId),
    ).subscribe(([getSession, tags, getServiceDetails, expertIsAvailable]) => {
      if (getSession !== undefined) {
        this.accountId = getSession.account.id;
      }
      this.tagList = tags;
      this.assignExpertConsultationDetails(getServiceDetails);
      this.assignEditConsultationPayload(getServiceDetails);
      this.footerComponent = this.attachFooter(this.accountId, getServiceDetails, expertIsAvailable);
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    if (this.footerComponent) {
      this.footerComponent.destroy();
    }
  }

  public onAddAnswer = (comment: GetComment): void => {
    this.commentsConsultation = this.consultationDetailsViewService.addTemporaryComment(
      comment,
      this.commentsConsultation,
    );
  };

  public onLoadMoreComments = (): void => {
    const commentOffset = this.commentsConsultation.length;
    const commentLimitLength = 10;
    this.isCommentsRequestPending = true;

    this.consultationDetailsViewService
      .getComments(this.employmentId, commentLimitLength.toString(), commentOffset.toString())
      .subscribe((commentsList: ReadonlyArray<GetComment>) => {
        this.ifMaxCommentsLengthReached = commentsList.length < commentLimitLength;
        this.isCommentsRequestPending = false;
        this.commentsConsultation = this.consultationDetailsViewService.loadMoreComments(
          commentsList,
          this.commentsConsultation,
        );
      });
  };

  private buildFooterData = (
    userId: string,
    getServiceDetails: IConsultationDetails,
    expertIsAvailable: boolean,
  ): IConsultationFooterData => ({
    userId,
    ownerId: getServiceDetails.getServiceWithEmployees.serviceDetails.ownerProfile.id,
    expertsIdList: getServiceDetails.expertIds,
    isExpertAvailable: expertIsAvailable,
    isFreelance: getServiceDetails.getServiceWithEmployees.serviceDetails.isFreelance,
    defaultPayment: getServiceDetails.payment,
    accountBalance: getServiceDetails.balance,
    price: {
      grossPrice: getServiceDetails.getServiceWithEmployees.serviceDetails.grossPrice,
      price: getServiceDetails.getServiceWithEmployees.serviceDetails.netPrice,
    },
  });
  private assignExpertConsultationDetails = ({
    expertDetails,
    expertProfileViewDetails,
    getServiceWithEmployees,
    getComments,
    employmentId,
  }: IConsultationDetails): void => {
    const maxCommentsForInitialLoad = 3;
    this.serviceName = getServiceWithEmployees.serviceDetails.name;
    this.serviceDescription = getServiceWithEmployees.serviceDetails.description;
    this.registeredAt = getServiceWithEmployees.serviceDetails.createdAt;
    this.employmentId = employmentId;

    if (expertDetails.profile.organizationDetails !== undefined) {
      this.companyName = expertDetails.profile.organizationDetails.name;
      this.companyLogo = expertDetails.profile.organizationDetails.logo;
    }
    if (expertDetails.profile.expertDetails !== undefined) {
      this.expertName = expertDetails.profile.expertDetails.name;
      this.expertAvatar = expertDetails.profile.expertDetails.avatar;
    }

    this.modalAnimationComponentService.onModalContentChange().next(false);
    this.isPending = false;

    this.expertName = expertProfileViewDetails.expertProfile.name;
    this.expertAvatar = expertProfileViewDetails.expertProfile.avatar;

    const employmentWithService = expertProfileViewDetails.employments.find(
      service => service.serviceDetails.id === this.serviceId,
    );

    this.commentsConsultation = getComments;
    this.ifMaxCommentsLengthReached = getComments.length === maxCommentsForInitialLoad;

    if (employmentWithService !== undefined) {
      this.usageCounter = employmentWithService.usageCounter;
      this.commentCounter = employmentWithService.commentCounter;
      this.ratingCounter = employmentWithService.ratingCounter;
    }
  };

  private attachFooter(
    userId: string,
    getServiceDetails: IConsultationDetails,
    expertIsAvailable: boolean,
  ): ComponentRef<IFooterOutput> | undefined {
    const component = ConsultationFooterResolver.resolve(
      this.userType,
      this.isCompany,
      this.accountId,
      getServiceDetails.expertDetails.profile.id,
      getServiceDetails.expertIds,
    );
    if (component) {
      const footerComponent = this.viewContainerRef.createComponent(
        this.componentFactoryResolver.resolveComponentFactory(component),
        undefined,
        Injector.create({
          providers: [
            {
              provide: CONSULTATION_FOOTER_DATA,
              useValue: this.buildFooterData(userId, getServiceDetails, expertIsAvailable),
            },
          ],
          parent: this.injector,
        }),
      );
      footerComponent.instance.actionTaken$.pipe(takeUntil(this.destroyed$)).subscribe(value => {
        const payload: IConsultationDetailActionParameters = {
          serviceId: this.serviceId,
          modal: this.activeModal,
          employmentId: this.employmentId,
          expertId: this.expertId,
          createEditConsultationPayload: this.editConsultationPayload,
        };
        this.consultationDetailsActionsService[value].call(this.consultationDetailsActionsService, payload);
      });

      return footerComponent;
    }

    return undefined;
  }

  private assignEditConsultationPayload = (consultationDetails: IConsultationDetails): void => {
    this.editConsultationPayload = {
      isExpertConsultation: this.isExpertConsultation(consultationDetails.getServiceWithEmployees.serviceDetails),
      serviceDetails: consultationDetails.getServiceWithEmployees.serviceDetails,
      tags: this.tagList,
      isOwnerEmployee: consultationDetails.expertIds.some(
        expertId => expertId === consultationDetails.getServiceWithEmployees.serviceDetails.ownerProfile.id,
      ),
    };
  };

  private isExpertConsultation = (serviceDetails: ServiceWithOwnerProfile): boolean =>
    typeof serviceDetails.ownerProfile.organizationDetails === 'undefined';
}
