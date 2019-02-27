import { Account, AccountService, GetSessionWithAccount } from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';

export interface ILanguageAndCurrency {
  currency: string;
  language: string;
}

@Injectable()
export class ChangeLanguageComponentService {
  constructor(private accountService: AccountService, private store: Store<fromCore.IState>) {}

  public get currentData(): Observable<ILanguageAndCurrency> {
    return getNotUndefinedSession(this.store).pipe(
      map((sessionWithAccount: GetSessionWithAccount) => ({
        currency: sessionWithAccount.account.currency,
        language: sessionWithAccount.account.language,
      })),
      take(1),
    );
  }

  public updateLanguage(language: string): Observable<Account> {
    return this.accountService.putLanguageRoute({ language });
  }
}
