import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { SessionActions, NavbarActions } from '@platform/core/actions';
import { UserTypeEffects } from '@platform/core/effects/user-type.effects';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';

describe('UserTypeEffects', () => {
  let userTypeEffects: UserTypeEffects;
  let actions$: Observable<any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserTypeEffects, provideMockActions(() => actions$)],
    });

    userTypeEffects = TestBed.get(UserTypeEffects);
    actions$ = TestBed.get(Actions);
  });

  describe('updateSessionAndUserType$', () => {
    it('should dispatch a SetUserType with passed user type', () => {
      const userType = UserTypeEnum.EXPERT;
      const action = new NavbarActions.UpdateUserTypeAndSession(userType);
      const completion = new NavbarActions.SetUserType(userType);

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userTypeEffects.updateSessionAndUserType$).toBeObservable(expected);
    });
  });

  describe('updateSessionAndUserType_Fetch$', () => {
    it('should dispatch a FetchSessionAction', () => {
      const userType = UserTypeEnum.EXPERT;
      const action = new NavbarActions.UpdateUserTypeAndSession(userType);
      const completion = new SessionActions.FetchSessionAction();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userTypeEffects.updateSessionAndUserType_Fetch$).toBeObservable(expected);
    });
  });
});
