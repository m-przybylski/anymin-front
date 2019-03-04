import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { INavigationItem, NavigationItemGroupsEnum } from '@platform/features/dashboard/components/navbar/navigation';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { IS_EXPERT_FORM } from '@platform/shared/components/modals/profile/create-profile/create-profile.component';
import { RouterHelpers, RouterPaths } from '@platform/shared/routes/routes';
import { Animations } from '@platform/shared/animations/animations';
import { Config } from '../../../../../../config';
import { Router } from '@angular/router';
import { EditProfileModalComponent } from '@platform/shared/components/modals/profile/edit-profile/edit-profile.component';
import { NavbarUserMenuService, INavbarUserMenuPayload } from './navbar-user-menu.service';

@Component({
  selector: 'plat-navbar-user-menu',
  templateUrl: './navbar-user-menu.component.html',
  styleUrls: ['./navbar-user-menu.component.sass'],
  animations: [Animations.menuSlideInOut],
  providers: [NavbarUserMenuService],
})
export class NavbarUserMenuComponent implements OnInit {
  @Input()
  public set menuItems(menuItems: ReadonlyArray<INavigationItem> | undefined) {
    this.groupMenuItems(menuItems);
  }

  @Input()
  public userName: string;

  @Input()
  public switchAccountAvatarToken: string;

  @Input()
  public set isUserMenuVisible(value: boolean) {
    this.animationState = value ? 'show' : 'hide';
  }

  @Input()
  public userType: UserTypeEnum;

  @Input()
  public expertProfileId?: string;

  @Input()
  public organizationProfileId?: string;

  @Input()
  public set isVisible(value: boolean) {
    this._isVisible = value;
    this.visibilityControl.setValue(value, { emitEvent: false });
  }

  public get isVisible(): boolean {
    return this._isVisible;
  }

  @Input()
  public set switchAccountType(value: UserTypeEnum | undefined) {
    this._switchAccountType = value;
    this.setSwitchAccountData(value);
  }

  public get switchAccountType(): UserTypeEnum | undefined {
    return this._switchAccountType;
  }

  @Output()
  public switchAccount = new EventEmitter<UserTypeEnum>();

  @Output()
  public switchVisibility = new EventEmitter<boolean>();

  public get showSwitchAccount(): boolean {
    return !(this.expertProfileId === undefined || this.organizationProfileId === undefined);
  }
  public readonly avatarSize32 = AvatarSizeEnum.X_32;

  public animationState: 'show' | 'hide' = 'hide';
  public userTypeEnum: typeof UserTypeEnum = UserTypeEnum;
  public navigationItemGroups: typeof NavigationItemGroupsEnum = NavigationItemGroupsEnum;
  public switchAccountTrKey = '';
  public switchAccountUrl = '';
  public groupedMenuItems: ReadonlyArray<ReadonlyArray<INavigationItem>>;
  public visibilityControl = new FormControl();

  private logger: LoggerService;
  private _switchAccountType?: UserTypeEnum;
  private _isVisible: boolean;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private store: Store<fromCore.IState>,
    private navbarUserMenuService: NavbarUserMenuService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('NavbarUserMenuComponent');
  }

  public ngOnInit(): void {
    this.visibilityControl.valueChanges.pipe().subscribe(
      (visible: boolean): void => {
        this.switchVisibility.emit(visible);
      },
    );
  }

  public navigateToProfile(): void {
    switch (this.userType) {
      case this.userTypeEnum.COMPANY:
        const companyProfileUrl = `${RouterHelpers.replaceParams(RouterPaths.dashboard.company.profile.asPath, {
          [RouterPaths.dashboard.company.profile.params.profileId]: this.organizationProfileId || '',
        })}`;

        this.router.navigate([companyProfileUrl]);
        break;

      case this.userTypeEnum.USER:
      case this.userTypeEnum.EXPERT:
        const userProfileUrl = `${RouterHelpers.replaceParams(RouterPaths.dashboard.user.profile.asPath, {
          [RouterPaths.dashboard.user.profile.params.expertId]: this.expertProfileId || '',
        })}`;

        this.router.navigate([userProfileUrl]);
        break;

      default:
        return;
    }
  }

  public onClick(fnName: keyof NavbarUserMenuService): void {
    const payload: INavbarUserMenuPayload = {
      store: this.store,
    };
    this.navbarUserMenuService[fnName].call(this.navbarUserMenuService, payload);
  }

  public openEditProfileModalAsClient(e: Event): void {
    e.stopPropagation();

    this.animationState = 'hide';

    const options: NgbModalOptions = {
      injector: Injector.create({
        providers: [{ provide: IS_EXPERT_FORM, useValue: false }],
      }),
    };

    this.modalService.open(EditProfileModalComponent, options);
  }

  public onSwitchAccount(switchAccountUserType: UserTypeEnum): void {
    this.switchAccount.emit(switchAccountUserType);
  }

  public openGooglePlay(): void {
    window.open(Config.links.googlePlay, '_blank');
  }

  public openAppStore(): void {
    window.open(Config.links.appStore, '_blank');
  }

  private groupMenuItems(menuItems: ReadonlyArray<INavigationItem> | undefined): void {
    if (typeof menuItems !== 'undefined') {
      // @ts-ignore
      this.groupedMenuItems = Object.values(
        menuItems.reduce((groupedItems, menuItem) => {
          groupedItems[menuItem.group] = [...(groupedItems[menuItem.group] || []), menuItem];

          return groupedItems;
        }, Object()),
      );
    }
  }

  private setSwitchAccountData(switchUserType: UserTypeEnum | undefined): void {
    switch (switchUserType) {
      case UserTypeEnum.COMPANY:
        this.switchAccountTrKey = 'NAVBAR_USER_MENU.SWITCH_TO_ORGANIZATION';
        this.switchAccountUrl = RouterPaths.dashboard.company.activities.asPath;
        break;

      case UserTypeEnum.EXPERT:
        this.switchAccountTrKey = 'NAVBAR_USER_MENU.SWITCH_TO_EXPERT';
        this.switchAccountUrl = RouterPaths.dashboard.user.activities.expert.asPath;
        break;

      case UserTypeEnum.USER:
        this.switchAccountTrKey = 'NAVBAR_USER_MENU.SWITCH_TO_CLIENT';
        this.switchAccountUrl = RouterPaths.dashboard.user.activities.client.asPath;
        break;

      default:
        this.logger.debug('handle switch user type', switchUserType);
    }
  }
}
