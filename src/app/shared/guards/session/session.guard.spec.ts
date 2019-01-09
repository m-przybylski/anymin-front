import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import * as fromRoot from '@platform/reducers';
import * as fromCore from '@platform/core/reducers';
import { SessionGuard } from './session.guard';
import { AuthActions, SessionActions, SessionApiActions } from '@platform/core/actions';

describe('SessionGuard', () => {
  let guard: SessionGuard;
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
      providers: [SessionGuard],
    });

    store = TestBed.get(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');
    guard = TestBed.get(SessionGuard);
  });

  it('should return false if the user state is not logged in', () => {
    const action = new SessionApiActions.FetchSessionErrorAction('401');
    store.dispatch(action);
    const expected = cold('(a|)', { a: false });

    expect(guard.canActivate()).toBeObservable(expected);
    expect(dispatchSpy).toHaveBeenCalledWith(new AuthActions.LoginRedirectAction());
  });

  it('should return true if the user state is logged in', () => {
    const session: any = {};
    const action = new AuthActions.LoginSuccessAction(session);
    store.dispatch(action);

    const expected = cold('(a|)', { a: true });

    expect(guard.canActivate()).toBeObservable(expected);
  });

  it('should dispatch call for session action when not in store', fakeAsync(() => {
    guard.canActivate().subscribe();
    tick();
    expect(dispatchSpy).toHaveBeenCalledWith(new SessionActions.FetchSessionAction());
  }));
});
