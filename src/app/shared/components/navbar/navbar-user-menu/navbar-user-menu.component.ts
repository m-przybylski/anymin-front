import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AvatarSizeEnum } from '../../user-avatar/user-avatar.component';
import { Animations, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Subject, of, Observable } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CreateProfileModalComponent } from '../../modals/profile/create-profile/create-profile.component';
import { CreateOrganizationModalComponent } from '../../modals/profile/create-organization/create-organization.component';
import { NavbarMenuService } from '../navbar-menu-service/navbar-menu.service';

@Component({
  selector: 'plat-navbar-user-menu',
  templateUrl: './navbar-user-menu.component.html',
  styleUrls: ['./navbar-user-menu.component.sass'],
  animations: Animations.slideInOut,
})
export class NavbarUserMenuComponent implements OnInit, OnDestroy {
  @Input()
  public isCompany: boolean;

  @Input()
  public isExpert: boolean;

  @Input()
  public clientName: string;

  @Input()
  public avatarToken: string;

  @Input()
  public companyAvatarToken: string;

  public readonly avatarSize48 = AvatarSizeEnum.X_48;
  public isMenuVisible: boolean;
  private logger: LoggerService;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private modalService: NgbModal,
    private loggerFactory: LoggerFactory,
    private navbarMenuService: NavbarMenuService,
  ) {}

  public ngOnInit(): void {
    this.logger = this.loggerFactory.createLoggerService('NavbarUserMenuComponent');
    this.navbarMenuService
      .getVisibility$()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .pipe(catchError(this.handleError))
      .subscribe(isMenuVisible => (this.isMenuVisible = isMenuVisible));
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public openEditProfileModal = (): boolean =>
    (this.modalService.open(CreateProfileModalComponent).componentInstance.isExpertForm = false);

  public openEditProfileAsExpertModal = (): NgbModalRef => this.modalService.open(CreateProfileModalComponent);

  public onOrganizationProfileSwitch = (e: Event): void => e.stopPropagation();

  public logout = (): void => {
    this.navbarMenuService.logout();
  };

  public openCreateOrganizationModal = (): NgbModalRef => this.modalService.open(CreateOrganizationModalComponent);

  // tslint:disable-next-line:no-any
  private handleError = (err: any): Observable<boolean> => {
    this.logger.warn('failure when try to change navbar menu visibility, ', err);

    return of(false);
  };
}
