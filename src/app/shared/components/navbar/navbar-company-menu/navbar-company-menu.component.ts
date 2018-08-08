import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AvatarSizeEnum } from '../../user-avatar/user-avatar.component';
import { Animations, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { catchError, takeUntil } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { CreateProfileModalComponent } from '../../modals/profile/create-profile/create-profile.component';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { RouterHelpers, RouterPaths } from '../../../routes/routes';
import { Router } from '@angular/router';
import { NavbarMenuService } from '../navbar-menu-service/navbar-menu.service';

@Component({
  selector: 'plat-navbar-company-menu',
  templateUrl: './navbar-company-menu.component.html',
  styleUrls: ['./navbar-company-menu.component.sass'],
  animations: Animations.slideInOut,
})
export class NavbarCompanyMenuComponent implements OnInit, OnDestroy {
  @Input()
  public companyName: string;

  @Input()
  public companyAvatarToken: string;

  @Input()
  public expertAvatarToken?: string;

  @Input()
  public isExpert: boolean;

  public readonly avatarSize32 = AvatarSizeEnum.X_32;
  public readonly avatarSize48 = AvatarSizeEnum.X_48;

  public isMenuVisible: boolean;

  private ngUnsubscribe$ = new Subject<void>();
  private logger: LoggerService;

  constructor(
    private modalService: NgbModal,
    private navbarMenuService: NavbarMenuService,
    private loggerFactory: LoggerFactory,
    private router: Router,
    private userSessionService: UserSessionService,
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

  public navigateToOrganizationProfile = (): void => {
    this.userSessionService
      .getSession()
      .then(session => {
        const route = RouterHelpers.replaceParams(RouterPaths.dashboard.company.profile.asPath, {
          [RouterPaths.dashboard.company.profile.params.profileId]: session.account.id,
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
  public openEditProfileModal = (): NgbModalRef => this.modalService.open(CreateProfileModalComponent);

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onExpertProfileSwitch = (e: Event): void => e.stopPropagation();

  public logout = (): void => {
    this.navbarMenuService.logout();
  };

  // tslint:disable-next-line:no-any
  private handleError = (err: any): Observable<boolean> => {
    this.logger.warn('failure when try to change navbar menu visibility, ', err);

    return of(false);
  };
}
