import { TestBed } from '@angular/core/testing';
import { AnonymousGuard } from './anonymous.guard';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import * as fromCore from '@platform/core/reducers';
import { SessionActions } from '@platform/core/actions';
import { cold } from 'jasmine-marbles';

describe('AnonymousGuard', () => {
  let guard: AnonymousGuard;
  let store: Store<any>;
  let dispatchSpy: jasmine.Spy;
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
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
  });

  it('should return true if user is not logged in', () => {
    const action = new SessionActions.FetchSessionErrorAction('401');
    const expected = cold('(a|)', { a: true });

    store.dispatch(action);

    expect(guard.canActivate()).toBeObservable(expected);
  });

  it('should return false and redirect to dashboard page if user is loged in', () => {
    const session: any = {};
    const action = new SessionActions.FetchSessionSuccessAction(session);
    const expected = cold('(a|)', { a: false });

    store.dispatch(action);

    expect(guard.canActivate()).toBeObservable(expected);
  });
});
