import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AvatarSizeEnum } from '../../user-avatar/user-avatar.component';
import { Animations, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CreateProfileModalComponent } from '../../modals/profile/create-profile/create-profile.component';
import { CreateOrganizationModalComponent } from '../../modals/profile/create-organization/create-organization.component';
import { INavigationItem, NavigationItemGroupsEnum } from '@platform/shared/components/navbar/navigation';
import { FormControl, FormGroup } from '@angular/forms';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { RouterHelpers, RouterPaths } from '@platform/shared/routes/routes';
import { AuthActions } from '@platform/core/actions';

@Component({
  selector: 'plat-navbar-user-menu',
  templateUrl: './navbar-user-menu.component.html',
  styleUrls: ['./navbar-user-menu.component.sass'],
  animations: Animations.slideInOut,
})
export class NavbarUserMenuComponent {
  @Input()
  public set menuItems(menuItems: ReadonlyArray<INavigationItem> | undefined) {
    this.groupMenuItems(menuItems);
  }

  @Input()
  public userName: string;

  @Input()
  public switchAccountAvatarToken: string;

  @Input()
  public isMenuVisible: boolean;

  @Input()
  public userType: UserTypeEnum;

  @Input()
  public set accountId(value: string) {
    this.userProfileUrl = `/${RouterHelpers.replaceParams(RouterPaths.dashboard.user.profile.asPath, {
      [RouterPaths.dashboard.user.profile.params.expertId]: value,
    })}`;
    this.companyProfileUrl = `/${RouterHelpers.replaceParams(RouterPaths.dashboard.company.profile.asPath, {
      [RouterPaths.dashboard.company.profile.params.profileId]: value,
    })}`;
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
  public onSwitchAccount = new EventEmitter<UserTypeEnum>();

  public readonly avatarSize32 = AvatarSizeEnum.X_32;
  public readonly visibilityControlName = 'isVisible';
  public readonly changeVisibilityFormId = 'changeVisibilityFormId';

  public changeVisibilityForm: FormGroup;
  public userTypeEnum: typeof UserTypeEnum = UserTypeEnum;
  public navigationItemGroups: typeof NavigationItemGroupsEnum = NavigationItemGroupsEnum;
  public switchAccountTrKey = '';
  public switchAccountUrl = '';
  public groupedMenuItems: ReadonlyArray<ReadonlyArray<INavigationItem>>;
  public userProfileUrl: string;
  public companyProfileUrl: string;

  private logger: LoggerService;
  private _switchAccountType?: UserTypeEnum;

  constructor(
    private modalService: NgbModal,
    private loggerFactory: LoggerFactory,
    private store: Store<fromCore.IState>,
  ) {
    this.changeVisibilityForm = new FormGroup({
      [this.visibilityControlName]: new FormControl(false),
    });
    this.logger = this.loggerFactory.createLoggerService('NavbarUserMenuComponent');
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

  public openCreateProfileModalAsExpert = (): NgbModalRef => this.modalService.open(CreateProfileModalComponent);

  public openEditProfileModal = (): boolean =>
    (this.modalService.open(CreateProfileModalComponent).componentInstance.isExpertForm = false);

  public switchAccount = (switchAccountUserType: UserTypeEnum): void => {
    this.onSwitchAccount.emit(switchAccountUserType);
  };

  public onInputSwitchClick = (e: Event): void => {
    e.stopPropagation();
  };

  public logout = (): void => {
    this.store.dispatch(new AuthActions.LogoutAction());
  };

  public openCreateOrganizationModal = (): NgbModalRef => this.modalService.open(CreateOrganizationModalComponent);

  private groupMenuItems = (menuItems: ReadonlyArray<INavigationItem> | undefined): void => {
    if (typeof menuItems !== 'undefined') {
      this.groupedMenuItems = Object.values(
        menuItems.reduce((grouppedItems, menuItem) => {
          grouppedItems[menuItem.group] = [...(grouppedItems[menuItem.group] || []), menuItem];

          return grouppedItems;
        }, Object()),
      );
    }
  };

  private setSwitchAccountData = (switchUserType: UserTypeEnum | undefined): void => {
    switch (switchUserType) {
      case UserTypeEnum.COMPANY:
        this.switchAccountTrKey = 'NAVBAR_USER_MENU.SWITCH_TO_ORGANIZATION';
        this.switchAccountUrl = this.companyProfileUrl;
        break;

      case UserTypeEnum.EXPERT:
        this.switchAccountTrKey = 'NAVBAR_USER_MENU.SWITCH_TO_EXPERT';
        this.switchAccountUrl = this.userProfileUrl;
        break;

      case UserTypeEnum.USER:
        this.switchAccountTrKey = 'NAVBAR_USER_MENU.SWITCH_TO_CLIENT';
        this.switchAccountUrl = this.userProfileUrl;
        break;

      default:
        this.logger.debug('handle switch user type', switchUserType);
    }
  };
}
