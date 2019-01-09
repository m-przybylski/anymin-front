import { TestBed } from '@angular/core/testing';
import { AnonymousGuard } from './anonymous.guard';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import * as fromCore from '@platform/core/reducers';
import { SessionApiActions } from '@platform/core/actions';
import { cold } from 'jasmine-marbles';

describe('AnonymousGuard', () => {
  let guard: AnonymousGuard;
  let store: Store<any>;
  let dispatchSpy: jest.SpyInstance;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          core: combineReducers(fromCore.reducers),
        }),
      ],
      providers: [AnonymousGuard],
    });

    guard = TestBed.get(AnonymousGuard);
    store = TestBed.get(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');
  });

  it('should return true if user is not logged in', () => {
    const action = new SessionApiActions.FetchSessionErrorAction('401');
    const expected = cold('(a|)', { a: true });

    store.dispatch(action);

    expect(guard.canActivate()).toBeObservable(expected);
  });

  it('should return false and redirect to dashboard page if user is logged in', () => {
    const session: any = {};
    const action = new SessionApiActions.FetchSessionSuccessAction(session);
    const expected = cold('(a|)', { a: false });

    store.dispatch(action);

    expect(guard.canActivate()).toBeObservable(expected);
  });
});
