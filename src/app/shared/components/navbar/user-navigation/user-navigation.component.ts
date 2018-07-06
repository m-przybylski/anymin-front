import {
  AfterViewChecked,
  Component, ElementRef, Input, OnInit, ViewChildren, QueryList, OnDestroy
} from '@angular/core';
import { UserNavigationComponentService } from './user-navigation.component.service';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Subject } from 'rxjs';
import { NavbarComponentService } from '../navbar.component.service';
import { Alerts, AlertService } from '@anymind-ng/components';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'plat-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.sass'],
  providers: [UserNavigationComponentService]
})

export class UserNavigationComponent implements OnInit, OnDestroy, AfterViewChecked {

  @Input()
  public isCompany: boolean;

  public isUserExpert: boolean;
  public userSessionStatus$ = new Subject<boolean>();
  public currentElement$ = new Subject<ElementRef>();

  private readonly activeElementClassName = 'active';
  @ViewChildren('listElement') private listOfNavbarElements: QueryList<ElementRef>;
  private logger: LoggerService;

  constructor(private userNavigationComponentService: UserNavigationComponentService,
              private navbarComponentService: NavbarComponentService,
              private alertService: AlertService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('UserNavigationComponent');
  }

  public ngAfterViewChecked(): void {
    const activeElement = this.listOfNavbarElements.filter(element =>
      element.nativeElement && element.nativeElement.className === this.activeElementClassName);
    if (activeElement[0]) {
      this.currentElement$.next(activeElement[0]);
    }
  }

  public ngOnDestroy(): void {
    this.userSessionStatus$.next();
    this.userSessionStatus$.complete();
  }

  public ngOnInit(): void {
    this.userNavigationComponentService.getSession().then((session) => {
      this.isUserExpert = session.account !== void 0 && session.account.isExpert;
    }).catch(() => {
      this.logger.error('Can not get session');
    });

    this.navbarComponentService.getExpertSessionStatus$()
      .pipe(takeUntil(this.userSessionStatus$))
      .subscribe((isExpertProfile) => {
        this.changeNavigationMenu(isExpertProfile);
      }, (err) => {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        this.logger.warn('Can not set session as expert', err);
      });
  }

  private changeNavigationMenu = (isExpertProfile: boolean): void => {
    this.isUserExpert = isExpertProfile;
  }

}
