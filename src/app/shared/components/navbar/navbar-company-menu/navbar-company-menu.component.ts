// tslint:disable:no-any
// tslint:disable:newline-before-return
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AvatarSizeEnum } from '../../user-avatar/user-avatar.component';
import { Animations, LoggerService, LoggerFactory } from '@anymind-ng/core';
import { Subject, Observable, of } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { EditProfileModalComponent } from '../../modals/profile/edit-profile/edit-profile.component';
import { CreateOrganizationModalComponent } from '../../modals/profile/create-organization/create-organization.component';
import { NavbarMenuService } from '../../../services/navbar-menu-service/navbar-menu.service';

@Component({
  selector: 'plat-navbar-company-menu',
  templateUrl: './navbar-company-menu.component.html',
  styleUrls: ['./navbar-company-menu.component.sass'],
  animations: Animations.slideInOut,
})
export class NavbarCompanyMenuComponent implements OnInit, OnDestroy {
  @Input() public companyName: string;

  @Input() public companyAvatarToken: string;

  @Input() public expertAvatarToken?: string;

  @Input() public isExpert: boolean;

  public readonly avatarSize32 = AvatarSizeEnum.X_32;
  public readonly avatarSize48 = AvatarSizeEnum.X_48;

  public isMenuVisible: boolean;

  private ngUnsubscribe$ = new Subject<void>();
  private logger: LoggerService;

  constructor(
    private modalService: NgbModal,
    private navbarMenuService: NavbarMenuService,
    private loggerFactory: LoggerFactory,
  ) {
    this.logger = this.loggerFactory.createLoggerService('NavbarCompanyMenuComponent');
  }

  public ngOnInit(): void {
    this.navbarMenuService
      .getVisibility$()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .pipe(catchError(this.handleError))
      .subscribe(isMenuVisible => (this.isMenuVisible = isMenuVisible));
  }

  public openEditOrganizationModal = (): NgbModalRef => this.modalService.open(CreateOrganizationModalComponent);

  public openEditProfileModal = (): NgbModalRef => this.modalService.open(EditProfileModalComponent);

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onExpertProfileSwitch = (e: Event): void => e.stopPropagation();

  public logout = (): void => {
    this.navbarMenuService.logout();
  };

  private handleError = (err: any): Observable<boolean> => {
    this.logger.warn('failure when try to change navbar menu visibility, ', err);
    return of(false);
  };
}
