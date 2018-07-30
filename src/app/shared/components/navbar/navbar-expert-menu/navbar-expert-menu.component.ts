// tslint:disable:no-duplicate-imports
// tslint:disable:no-any
// tslint:disable:newline-before-return
import { Component, Input, OnInit } from '@angular/core';
import { AvatarSizeEnum } from '../../user-avatar/user-avatar.component';
import { Animations } from '@anymind-ng/core';
import { Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { NavbarMenuService } from '../../../services/navbar-menu-service/navbar-menu.service';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { CreateCompanyConsultationModalComponent } from '../../modals/create-company-consultation/create-company-consultation.component';
import { CreateOrganizationModalComponent } from '../../modals/profile/create-organization/create-organization.component';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { Router } from '@angular/router';
import { RouterPaths } from '../../../routes/routes';

@Component({
  selector: 'plat-navbar-expert-menu',
  templateUrl: './navbar-expert-menu.component.html',
  styleUrls: ['./navbar-expert-menu.component.sass'],
  animations: Animations.slideInOut,
})
export class NavbarExpertMenuComponent implements OnInit {
  @Input() public expertName: string;

  @Input() public isExpert: boolean;

  @Input() public isCompany: boolean;

  @Input() public avatarUrl: string;

  @Input() public companyAvatarUrl?: string;

  public readonly avatarSize32 = AvatarSizeEnum.X_32;
  public isMenuVisible: boolean;
  private ngUnsubscribe$ = new Subject<void>();
  private logger: LoggerService;

  constructor(
    private modalService: NgbModal,
    private navbarMenuService: NavbarMenuService,
    private loggerFactory: LoggerFactory,
    private userSessionService: UserSessionService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.logger = this.loggerFactory.createLoggerService('NavbarExpertMenuComponent');

    this.navbarMenuService
      .getVisibility$()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .pipe(catchError(this.handleError))
      .subscribe(isMenuVisible => (this.isMenuVisible = isMenuVisible));
  }

  public openEditProfileModal = (): void => {
    this.userSessionService
      .getSession()
      .then(session => {
        const route = RouterPaths.helper.replaceParams(RouterPaths.dashboard.expert.asPath, {
          [RouterPaths.dashboard.expert.params.expertId]: session.accountId,
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
  // this.modalService.open(EditProfileModalComponent)

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

  private handleError = (err: any): Observable<boolean> => {
    this.logger.warn('failure when try to change navbar menu visibility, ', err);
    return of(false);
  };
}
