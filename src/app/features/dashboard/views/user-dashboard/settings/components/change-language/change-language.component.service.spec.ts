// tslint:disable:no-empty

import { async, TestBed } from '@angular/core/testing';
import { AccountService, PutDetails } from '@anymind-ng/api';
import { Deceiver } from 'deceiver-core';
import { dispatchLoggedUser, importStore, provideMockFactoryLogger } from 'testing/testing';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { ChangeLanguageComponentService } from '@platform/features/dashboard/views/user-dashboard/settings/components/change-language/change-language.component.service';
import { cold } from 'jasmine-marbles';

describe('Service: ChangeLanguageComponentService', () => {
  let store: Store<fromCore.IState>;
  let service: ChangeLanguageComponentService;
  let accountService: AccountService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
      providers: [
        ChangeLanguageComponentService,
        {
          provide: AccountService,
          useValue: Deceiver(AccountService, { putLanguageRoute: jest.fn() }),
        },
        provideMockFactoryLogger(),
      ],
    });
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    service = TestBed.get(ChangeLanguageComponentService);
    accountService = TestBed.get(AccountService);
  });

  it('should return current data from session', done => {
    const currency = 'PLN';
    const language = 'Polish';
    dispatchLoggedUser(store, {
      account: { id: 'accId', currency, language },
      session: {},
    });
    service.currentData.subscribe(data => {
      expect(data.language).toEqual(language);
      expect(data.currency).toEqual(currency);
      done();
    });
  });

  it('should update language', () => {
    accountService.putLanguageRoute = jest.fn(() => cold('-a|', { a: 'OK' }));
    const language = 'PLN';
    service.updateLanguage(language);
    expect(accountService.putLanguageRoute).toHaveBeenCalledWith({ language });
  });
});
