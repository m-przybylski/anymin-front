// tslint:disable:no-duplicate-imports
// tslint:disable:no-any
// tslint:disable:newline-before-return
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AvatarSizeEnum } from '../../user-avatar/user-avatar.component';
import { Animations } from '@anymind-ng/core';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { NavbarMenuService } from '../../../services/navbar-menu-service/navbar-menu.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileModalComponent } from '../../modals/profile/edit-profile/edit-profile.component';
import { CreateOrganizationModalComponent } from '../../modals/profile/create-organization/create-organization.component';

@Component({
  selector: 'plat-navbar-user-menu',
  templateUrl: './navbar-user-menu.component.html',
  styleUrls: ['./navbar-user-menu.component.sass'],
  animations: Animations.slideInOut,
})
export class NavbarUserMenuComponent implements OnInit, OnDestroy {
  @Input() public isCompany: boolean;

  @Input() public isExpert: boolean;

  @Input() public clientName: string;

  @Input() public avatarUrl: string;

  @Input() public companyAvatarUrl: string;

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
    (this.modalService.open(EditProfileModalComponent).componentInstance.isExpertForm = false);

  public openEditProfileAsExpertModal = (): NgbModalRef => this.modalService.open(EditProfileModalComponent);

  public onOrganizationProfileSwitch = (e: Event): void => e.stopPropagation();

  public logout = (): void => {
    this.navbarMenuService.logout();
  };

  public openCreateOrganizationModal = (): NgbModalRef => this.modalService.open(CreateOrganizationModalComponent);

  private handleError = (err: any): Observable<boolean> => {
    this.logger.warn('failure when try to change navbar menu visibility, ', err);
    return of(false);
  };
}
