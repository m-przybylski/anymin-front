import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { AuthActions } from '@platform/core/actions';
import { INavigationItem, NavigationItemGroupsEnum } from '@platform/features/dashboard/components/navbar/navigation';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { CreateProfileModalComponent } from '@platform/shared/components/modals/profile/create-profile/create-profile.component';
import { CreateOrganizationModalComponent } from '@platform/shared/components/modals/profile/create-organization/create-organization.component';
import { RouterHelpers, RouterPaths } from '@platform/shared/routes/routes';
import { Animations } from '@platform/shared/animations/animations';
import { Config } from '../../../../../../config';
import { EditProfileModalComponent } from '@platform/shared/components/modals/profile/edit-profile/edit-profile.component';

@Component({
  selector: 'plat-navbar-user-menu',
  templateUrl: './navbar-user-menu.component.html',
  styleUrls: ['./navbar-user-menu.component.sass'],
  animations: [Animations.menuSlideInOut],
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
  public set accountId(value: string) {
    this.userProfileUrl = `${RouterHelpers.replaceParams(RouterPaths.dashboard.user.profile.asPath, {
      [RouterPaths.dashboard.user.profile.params.expertId]: value,
    })}`;
    this.companyProfileUrl = `${RouterHelpers.replaceParams(RouterPaths.dashboard.company.profile.asPath, {
      [RouterPaths.dashboard.company.profile.params.profileId]: value,
    })}`;
  }

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

  public readonly avatarSize32 = AvatarSizeEnum.X_32;

  public animationState: 'show' | 'hide' = 'hide';
  public userTypeEnum: typeof UserTypeEnum = UserTypeEnum;
  public navigationItemGroups: typeof NavigationItemGroupsEnum = NavigationItemGroupsEnum;
  public switchAccountTrKey = '';
  public switchAccountUrl = '';
  public groupedMenuItems: ReadonlyArray<ReadonlyArray<INavigationItem>>;
  public userProfileUrl: string;
  public companyProfileUrl: string;
  public visibilityControl = new FormControl();

  private logger: LoggerService;
  private _switchAccountType?: UserTypeEnum;
  private _isVisible: boolean;

  constructor(private modalService: NgbModal, private store: Store<fromCore.IState>, loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('NavbarUserMenuComponent');
  }

  public ngOnInit(): void {
    this.visibilityControl.valueChanges.pipe().subscribe(
      (visible: boolean): void => {
        this.switchVisibility.emit(visible);
      },
    );
  }

  public getRouterLink(): string {
    switch (this.userType) {
      case this.userTypeEnum.USER:
        // TODO: consider refactor once client is released to platform
        return '';
      case this.userTypeEnum.EXPERT:
        return this.userProfileUrl;
      case this.userTypeEnum.COMPANY:
        return this.companyProfileUrl;
      default:
        return this.userProfileUrl;
    }
  }

  public onClick = (fnName: string): void => {
    // tslint:disable-next-line:no-any
    if (typeof (this as any)[fnName] === 'function') {
      // tslint:disable-next-line:no-any
      (this as any)[fnName]();

      return;
    }
    this.logger.error('provided function name does not exist in this class: ', fnName);
  };

  public openCreateProfileModalAsClient = (): void => {
    this.modalService.open(CreateProfileModalComponent);
  };

  public openCreateProfileModalAsExpert = (): void => {
    this.modalService.open(EditProfileModalComponent);
  };

  public openCreateProfileModal = (): boolean =>
    (this.modalService.open(CreateProfileModalComponent).componentInstance.isExpertForm = false);

  public onSwitchAccount = (switchAccountUserType: UserTypeEnum): void => {
    this.switchAccount.emit(switchAccountUserType);
  };

  public logout = (): void => {
    this.store.dispatch(new AuthActions.LogoutAction());
  };

  public openCreateOrganizationModal = (): NgbModalRef => this.modalService.open(CreateOrganizationModalComponent);

  public openGooglePlay = (): void => {
    window.open(Config.links.googlePlay, '_blank');
  };

  public openAppStore = (): void => {
    window.open(Config.links.appStore, '_blank');
  };

  private groupMenuItems = (menuItems: ReadonlyArray<INavigationItem> | undefined): void => {
    if (typeof menuItems !== 'undefined') {
      // @ts-ignore
      this.groupedMenuItems = Object.values(
        menuItems.reduce((groupedItems, menuItem) => {
          groupedItems[menuItem.group] = [...(groupedItems[menuItem.group] || []), menuItem];

          return groupedItems;
        }, Object()),
      );
    }
  };

  private setSwitchAccountData = (switchUserType: UserTypeEnum | undefined): void => {
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
  };
}
