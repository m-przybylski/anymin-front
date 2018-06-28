// tslint:disable:no-any
// tslint:disable:newline-before-return
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AvatarSizeEnum } from '../../user-avatar/user-avatar.component';
import { Animations } from '@anymind-ng/components';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { NavbarMenuService }
from '../../../services/navbar-menu-service/navbar-menu.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { EditProfileModalComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'plat-navbar-user-menu',
  templateUrl: './navbar-user-menu.component.html',
  styleUrls: ['./navbar-user-menu.component.sass'],
  animations: Animations.slideInOut
})

export class NavbarUserMenuComponent implements OnInit, OnDestroy {

  public readonly avatarSize48 = AvatarSizeEnum.X_48;
  public isMenuVisible: boolean;

  private logger: LoggerService;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(private modalService: NgbModal,
              private loggerFactory: LoggerFactory,
              private navbarMenuService: NavbarMenuService) {
  }

  public ngOnInit(): void {
    this.logger = this.loggerFactory.createLoggerService('NavbarUserMenuComponent');

    this.navbarMenuService.getVisibility$()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .pipe(catchError(this.handleError))
      .subscribe(isMenuVisible => this.isMenuVisible = isMenuVisible);
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public openEditProfileModal = (): NgbModalRef =>
    this.modalService.open(EditProfileModalComponent)

  public logout = (): void => {
    this.navbarMenuService.logout();
  }

  private handleError = (err: any): Observable<boolean> => {
    this.logger.warn('failure when try to change navbar menu visibility, ', (err));
    return of(false);
  }

}
