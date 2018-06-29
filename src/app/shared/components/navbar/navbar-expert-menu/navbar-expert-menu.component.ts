// tslint:disable:no-duplicate-imports
// tslint:disable:no-any
// tslint:disable:newline-before-return
import { Component, Input, OnInit } from '@angular/core';
import { AvatarSizeEnum } from '../../user-avatar/user-avatar.component';
import { Animations } from '@anymind-ng/core';
import { Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import {
  NavbarMenuService
}
  from '../../../services/navbar-menu-service/navbar-menu.service';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileModalComponent } from '../edit-profile/edit-profile.component';
import { CreateExpertConsultationModalComponent }
from '../../modals/create-expert-consultation/create-expert-consultation.component';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';

@Component({
  selector: 'plat-navbar-expert-menu',
  templateUrl: './navbar-expert-menu.component.html',
  styleUrls: ['./navbar-expert-menu.component.sass'],
  animations: Animations.slideInOut
})

export class NavbarExpertMenuComponent implements OnInit {

  @Input()
  public expertName: string;

  @Input()
  public expertAvatarToken: string;

  @Input()
  public companyAvatarToken?: string;

  public readonly avatarSize32 = AvatarSizeEnum.X_32;
  public readonly avatarSize48 = AvatarSizeEnum.X_48;
  public isCompany: boolean;
  public isMenuVisible: boolean;

  private ngUnsubscribe$ = new Subject<void>();
  private logger: LoggerService;

  constructor(private modalService: NgbModal,
              private navbarMenuService: NavbarMenuService,
              private loggerFactory: LoggerFactory) {
  }

  public ngOnInit(): void {
    this.isCompany = this.navbarMenuService.hasUserCompanyProfile();

    this.logger = this.loggerFactory.createLoggerService('NavbarExpertMenuComponent');

    this.navbarMenuService.getVisibility$()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .pipe(catchError(this.handleError))
      .subscribe(isMenuVisible => this.isMenuVisible = isMenuVisible);
  }

  public openEditProfileModal = (): boolean =>
    this.modalService.open(EditProfileModalComponent).componentInstance.isOpenAsExpert = !this.isCompany

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public logout = (): void => {
    this.navbarMenuService.logout();
  }

  public onInputSwitchClick = (e: Event): void => {
    e.stopPropagation();
  }

  public openCreateExpertConsultationModal = (): NgbModalRef =>
    this.modalService.open(CreateExpertConsultationModalComponent)

  private handleError = (err: any): Observable<boolean> => {
    this.logger.warn('failure when try to change navbar menu visibility, ', (err));
    return of(false);
  }

}
