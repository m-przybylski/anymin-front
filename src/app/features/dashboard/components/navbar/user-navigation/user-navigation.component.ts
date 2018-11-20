// tslint:disable:no-object-literal-type-assertion
import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  ViewChildren,
  QueryList,
  EventEmitter,
  Output,
} from '@angular/core';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Subject, Observable } from 'rxjs';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { INavigationItem, NavigationItemGroupsEnum } from '@platform/features/dashboard/components/navbar/navigation';

@Component({
  selector: 'plat-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.sass'],
})
export class UserNavigationComponent implements AfterViewChecked {
  @Input()
  public userAvatarToken: string;

  @Input()
  public userName: string;

  @Input()
  public isMenuVisible: boolean;

  @Input()
  public switchAccountAvatarToken: string;

  @Input()
  public userType: UserTypeEnum;

  @Input()
  public switchAccountType?: UserTypeEnum;

  @Input()
  public accountId: string;

  @Input()
  public isUserVisible: boolean;

  @Input()
  public set navigationItems(navigationItems: ReadonlyArray<INavigationItem> | undefined) {
    if (typeof navigationItems !== 'undefined') {
      this.navbarItems = navigationItems.filter(navItem => navItem.group === NavigationItemGroupsEnum.NAVBAR);
      this.menuItems = navigationItems;
    }
  }

  @Output()
  public onSwitchAccount = new EventEmitter<UserTypeEnum>();

  @Output()
  public onChangeVisibility = new EventEmitter<boolean>();

  public get currentElement(): Observable<ElementRef> {
    return this.currentElement$.asObservable();
  }

  public menuItems: ReadonlyArray<INavigationItem>;
  public navbarItems: ReadonlyArray<INavigationItem>;
  private readonly activeElementClassName = 'active';
  private currentElement$ = new Subject<ElementRef>();
  private logger: LoggerService;

  @ViewChildren('listElement')
  private listOfNavbarElements: QueryList<ElementRef>;

  constructor(loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('UserNavigationComponent');
  }

  public onSwitchVisibility = (isVisibile: boolean): void => {
    this.onChangeVisibility.emit(isVisibile);
  };

  public ngAfterViewChecked(): void {
    const activeElement = this.listOfNavbarElements.filter(element =>
      String(element.nativeElement.className).includes(this.activeElementClassName),
    );
    if (activeElement[0]) {
      this.currentElement$.next(activeElement[0]);

      return;
    }
    this.currentElement$.next(undefined);
  }

  public emitSwitchAccountUserType = (userType: UserTypeEnum): void => {
    this.onSwitchAccount.emit(userType);
  };
}
