import {
  AfterViewChecked,
  Component, ElementRef, Input, OnInit, ViewChildren, QueryList
} from '@angular/core';
import { UserNavigationComponentService } from './user-navigation.component.service';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'plat-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.sass'],
  providers: [UserNavigationComponentService]
})

export class UserNavigationComponent implements OnInit, AfterViewChecked {

  @Input()
  public isCompany: boolean;

  public isUserExpert: boolean;
  public currentElement$ = new Subject<ElementRef>();

  private readonly activeElementClassName = 'active';
  @ViewChildren('listElement') private listOfNavbarElements: QueryList<ElementRef>;
  private logger: LoggerService;

  constructor(private userNavigationComponentService: UserNavigationComponentService,
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

  public ngOnInit(): void {
    this.userNavigationComponentService.getSession().then((session) => {
      this.isUserExpert = session.account !== void 0 && session.account.isExpert;
    }).catch(() => {
      this.logger.error('Can not get session');
    });
  }

}
