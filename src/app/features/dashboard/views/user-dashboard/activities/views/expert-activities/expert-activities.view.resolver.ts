import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import * as NavbarActions from '@platform/core/actions/navbar.actions';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';

@Injectable()
export class ExpertActivitiesViewResolver extends Logger implements Resolve<UserTypeEnum> {
  constructor(private store: Store<fromCore.IState>, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('ExpertActivitiesViewResolver'));
  }

  public resolve = (): UserTypeEnum => {
    this.store.dispatch(new NavbarActions.SetUserType(UserTypeEnum.EXPERT));
    this.loggerService.debug('User type set as Expert');

    return UserTypeEnum.EXPERT;
  };
}
