import { Component, Input, OnInit } from '@angular/core';
import { UserNavigationComponentService } from './user-navigation.component.service';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';

@Component({
  selector: 'plat-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.sass'],
  providers: [UserNavigationComponentService]
})
export class UserNavigationComponent implements OnInit {

  @Input()
  public isCompany: boolean;
  public isUserExpert: boolean;

  private logger: LoggerService;

  constructor(private userNavigationComponentService: UserNavigationComponentService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('UserNavigationComponent');
  }

  public ngOnInit(): void {
    this.userNavigationComponentService.getSession().then((session) => {
      this.isUserExpert = session.account !== void 0 && session.account.isExpert;
    }).catch(() => {
      this.logger.error('Can not get session');
    });
  }
}
