import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { GetExpertVisibility } from 'profitelo-api-ng/model/models';
import { AvatarSizeEnum } from '../../user-avatar/user-avatar.component';
import { Subject } from 'rxjs/Subject';
import { NavbarMenuService }
from '../../../services/navbar-menu-service/navbar-menu.service';
import { catchError, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';

@Component({
  selector: 'plat-navbar-user-avatar',
  templateUrl: './navbar-user-avatar.component.html',
  styleUrls: ['./navbar-user-avatar.component.sass']
})
export class NavbarUserAvatarComponent implements OnInit, OnDestroy {

  @Input()
  public avatarToken?: string;

  @Input()
  public userVisibility?: GetExpertVisibility.VisibilityEnum;

  public readonly avatarSize = AvatarSizeEnum.X_48;
  public visibilityStatusEnum: typeof GetExpertVisibility.VisibilityEnum = GetExpertVisibility.VisibilityEnum;
  public isMenuVisible = false;

  private ngUnsubscribe$ = new Subject<void>();
  private logger: LoggerService;

  constructor(private navbarMenuService: NavbarMenuService,
              private element: ElementRef,
              private loggerFactory: LoggerFactory) {
  }

  public ngOnInit(): void {
    this.logger = this.loggerFactory.createLoggerService('NavbarUserAvatarComponent');

    this.navbarMenuService.getVisibility$()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .pipe(catchError(this.handleError))
      .subscribe(isMenuVisible => this.isMenuVisible = isMenuVisible);
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  @HostListener('document:click', ['$event'])
  public handleClick(event: Event): void {
    if (!this.element.nativeElement.contains(event.target)) {
      this.isMenuVisible = false;
      this.navbarMenuService.getVisibility$().next(this.isMenuVisible);
    }
  }

  public toggleMenuVisibility = (): void => {
    this.isMenuVisible = !this.isMenuVisible;
    this.navbarMenuService.getVisibility$().next(this.isMenuVisible);
  }

  private handleError = (err: any): Observable<boolean> => {
    this.logger.warn('failure when try to change navbar menu visibility, ', (err));
    return of(false);
  }

}
