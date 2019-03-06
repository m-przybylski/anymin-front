import { Component, ElementRef, Inject, Input, NgZone } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { GetExpertVisibility } from '@anymind-ng/api';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import * as fromCore from '@platform/core/reducers';
import { Store } from '@ngrx/store';
import { NavbarActions } from '@platform/core/actions';
import { DOCUMENT } from '@angular/common';
import { takeUntil, filter } from 'rxjs/operators';
// tslint:disable-next-line:rxjs-no-internal
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';

@Component({
  selector: 'plat-navbar-user-avatar',
  templateUrl: './navbar-user-avatar.component.html',
  styleUrls: ['./navbar-user-avatar.component.sass'],
})
export class NavbarUserAvatarComponent {
  @Input()
  public avatarToken?: string;

  @Input()
  public isUserVisible: boolean;

  @Input()
  public userType: UserTypeEnum;

  @Input()
  public set isUserMenuVisible(value: boolean) {
    if (value) {
      this.setCloseHandlers();

      return;
    }
    this.navbarMenuClose$.next();
  }

  public readonly avatarSize = AvatarSizeEnum.X_48;
  public visibilityStatusEnum: typeof GetExpertVisibility.VisibilityEnum = GetExpertVisibility.VisibilityEnum;
  public userTypeEnum: typeof UserTypeEnum = UserTypeEnum;

  private navbarMenuClose$ = new Subject<void>();

  constructor(
    private element: ElementRef,
    private store: Store<fromCore.IState>,
    private ngZone: NgZone,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  public toggleMenuVisibility(): void {
    this.store.dispatch(new NavbarActions.ToggleUserMenuVisibility());
  }

  private setCloseHandlers(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent<MouseEvent>(this.document as FromEventTarget<MouseEvent>, 'click')
        .pipe(
          filter(event => !this.element.nativeElement.contains(event.target)),
          takeUntil(this.navbarMenuClose$),
        )
        .subscribe(() => {
          this.ngZone.run(() => {
            this.toggleMenuVisibility();
          });
        });
    });
  }
}
