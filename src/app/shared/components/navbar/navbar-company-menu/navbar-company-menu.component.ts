import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AvatarSizesEnum } from '../../user-avatar/user-avatar.component';
import { Animations } from '@anymind-ng/components';
import { Subject } from 'rxjs/Subject';
import { catchError, takeUntil } from 'rxjs/operators';
import {
  NavbarMenuService
}
  from '../../../services/navbar-menu-service/navbar-menu.service';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { EditProfileModalComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'plat-navbar-company-menu',
  templateUrl: './navbar-company-menu.component.html',
  styleUrls: ['./navbar-company-menu.component.sass'],
  animations: Animations.slideInOut
})

export class NavbarCompanyMenuComponent implements OnInit, OnDestroy {

  @Input()
  public companyName: string;

  @Input()
  public companyAvatarToken: string;

  @Input()
  public expertAvatarToken?: string;

  public readonly avatarSize32 = AvatarSizesEnum.x32;
  public readonly avatarSize48 = AvatarSizesEnum.x48;
  public isExpert: boolean;
  public isMenuVisible: boolean;

  private ngUnsubscribe$ = new Subject<void>();
  private logger: LoggerService;

  constructor(private modalService: NgbModal,
              private navbarMenuService: NavbarMenuService,
              private loggerFactory: LoggerFactory) {
  }

  public ngOnInit(): void {
    this.isExpert = this.navbarMenuService.hasUserExpertProfile();

    this.logger = this.loggerFactory.createLoggerService('NavbarCompanyMenuComponent');

    this.navbarMenuService.getVisibility$()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .pipe(catchError(this.handleError))
      .subscribe(isMenuVisible => this.isMenuVisible = isMenuVisible);
  }

  public openEditProfileModal = (): NgbModalRef =>
    this.modalService.open(EditProfileModalComponent)

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public logout = (): void => {
    this.navbarMenuService.logout();
  }

  private handleError = (err: any): Observable<boolean> => {
    this.logger.warn('failure when try to change navbar menu visibility, ', (err));
    return of(false);
  }

}
