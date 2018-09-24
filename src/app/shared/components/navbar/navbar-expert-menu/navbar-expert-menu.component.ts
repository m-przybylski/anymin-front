import { Component, Input, OnInit } from '@angular/core';
import { AvatarSizeEnum } from '../../user-avatar/user-avatar.component';
import { Animations, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { catchError, takeUntil } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { CreateCompanyConsultationModalComponent } from '../../modals/create-company-consultation/create-company-consultation.component';
import { CreateOrganizationModalComponent } from '../../modals/profile/create-organization/create-organization.component';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { RouterHelpers, RouterPaths } from '../../../routes/routes';
import { Router } from '@angular/router';
import { NavbarMenuService } from '../navbar-menu-service/navbar-menu.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'plat-navbar-expert-menu',
  templateUrl: './navbar-expert-menu.component.html',
  styleUrls: ['./navbar-expert-menu.component.sass'],
  animations: Animations.slideInOut,
})
export class NavbarExpertMenuComponent implements OnInit {
  @Input()
  public isExpert: boolean;

  @Input()
  public isCompany: boolean;

  @Input()
  public expertName: string;

  @Input()
  public avatarToken: string;

  @Input()
  public companyAvatarToken?: string;

  public readonly avatarSize32 = AvatarSizeEnum.X_32;
  public readonly visibilityControlName = 'isVisible';
  public readonly changeVisibilityFormId = 'changeVisibilityFormId';

  public changeVisibilityForm: FormGroup;
  public isMenuVisible: boolean;
  private ngUnsubscribe$ = new Subject<void>();
  private logger: LoggerService;

  constructor(
    private modalService: NgbModal,
    private navbarMenuService: NavbarMenuService,
    private userSessionService: UserSessionService,
    private router: Router,
    private loggerFactory: LoggerFactory,
  ) {
    this.changeVisibilityForm = new FormGroup({
      [this.visibilityControlName]: new FormControl(false),
    });
  }

  public ngOnInit(): void {
    this.logger = this.loggerFactory.createLoggerService('NavbarExpertMenuComponent');

    this.navbarMenuService
      .getVisibility$()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .pipe(catchError(this.handleError))
      .subscribe(isMenuVisible => (this.isMenuVisible = isMenuVisible));
  }

  public navigateToExpertProfile = (): void => {
    this.userSessionService
      .getSession()
      .then(session => {
        const route = RouterHelpers.replaceParams(RouterPaths.dashboard.user.profile.asPath, {
          [RouterPaths.dashboard.user.profile.params.expertId]: session.account.id,
        });

        return this.router.navigate([route]);
      })
      .then(() => {
        this.logger.debug('Navigation success');
      })
      .catch(err => {
        this.logger.error(err);
      });
  };

  public openCreateOrganizationModal = (): NgbModalRef => this.modalService.open(CreateOrganizationModalComponent);

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public logout = (): void => {
    this.navbarMenuService.logout();
  };

  public onOrganizationProfileSwitch = (e: Event): void => e.stopPropagation();

  public onInputSwitchClick = (e: Event): void => {
    e.stopPropagation();
  };

  public openCreateModal = (): NgbModalRef => this.modalService.open(CreateCompanyConsultationModalComponent);

  // tslint:disable-next-line:no-any
  private handleError = (err: any): Observable<boolean> => {
    this.logger.warn('failure when try to change navbar menu visibility, ', err);

    return of(false);
  };
}
