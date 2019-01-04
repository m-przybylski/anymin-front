import { GetExpertVisibility, PresenceService } from '@anymind-ng/api';
import { inject, TestBed } from '@angular/core/testing';
import { Deceiver } from 'deceiver-core';
import { VisibilityUiActions, VisibilityApiActions, VisibilityInitActions } from '@platform/features/dashboard/actions';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { VisibilityEffects } from '@platform/features/dashboard/effects/visibility/visibility.effects';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { AlertService } from '@anymind-ng/core';

describe('VisibilityEffects', () => {
  let visibilityEffects: VisibilityEffects;
  let alertService: AlertService;
  let presenceService: PresenceService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VisibilityEffects,
        {
          provide: PresenceService,
          useValue: Deceiver(PresenceService, {
            expertVisibilityRoute: jest.fn(),
            expertVisibleRoute: jest.fn(),
            expertInvisibleRoute: jest.fn(),
          }),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, {
            pushDangerAlert: jest.fn(),
          }),
        },
        provideMockActions(() => actions$),
      ],
    });
    visibilityEffects = TestBed.get(VisibilityEffects);
    presenceService = TestBed.get(PresenceService);
    alertService = TestBed.get(AlertService);
    actions$ = TestBed.get(Actions);
  });

  it('should be created', inject([PresenceService], (service: PresenceService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a FetchInitVisilbilitySuccessAction, when visibility if fetch succeeds', () => {
    const visibility = { visibility: GetExpertVisibility.VisibilityEnum.Visible };

    const action = new VisibilityInitActions.FetchInitVisibilityAction();
    const result = new VisibilityApiActions.FetchApiVisibilitySuccessAction(visibility);

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: visibility });
    const expected = cold('--b', { b: result });

    presenceService.expertVisibilityRoute = jest.fn().mockReturnValue(response);
    expect(visibilityEffects.fetchVisibilityStatus$).toBeObservable(expected);
  });

  it('should return a SetUiVisilbilityVisibleSuccessAction, with visibility if fetch succeeds', () => {
    const action = new VisibilityUiActions.SetUiVisibilityVisibleAction();
    const result = new VisibilityApiActions.SetUiVisibilityVisibleSuccessAction();

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|');
    const expected = cold('--b', { b: result });

    presenceService.expertVisibleRoute = jest.fn().mockReturnValue(response);
    expect(visibilityEffects.setVisibilityVisible$).toBeObservable(expected);
  });

  it('should return a SetUiVisilbilityVisibleErrorAction, with visibility if fetch fails', () => {
    const action = new VisibilityUiActions.SetUiVisibilityVisibleAction();
    const result = new VisibilityApiActions.SetUiVisibilityVisibleErrorAction();

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {});
    const expected = cold('--b', { b: result });

    presenceService.expertVisibleRoute = jest.fn().mockReturnValue(response);
    expect(visibilityEffects.setVisibilityVisible$).toBeObservable(expected);
  });

  it('should return a SetUiVisilbilityInvisibleSuccessAction, with visibility if fetch succeeds', () => {
    const action = new VisibilityUiActions.SetUiVisibilityInvisibleAction();
    const result = new VisibilityApiActions.SetUiVisibilityInvisibleSuccessAction();

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|');
    const expected = cold('--b', { b: result });

    presenceService.expertInvisibleRoute = jest.fn().mockReturnValue(response);
    expect(visibilityEffects.setVisibilityInvisible$).toBeObservable(expected);
  });

  it('should return a SetUiVisilbilityInvisibleErrorAction, with visibility if fetch fails', () => {
    const action = new VisibilityUiActions.SetUiVisibilityInvisibleAction();
    const result = new VisibilityApiActions.SetUiVisibilityInvisibleErrorAction();

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {});
    const expected = cold('--b', { b: result });

    presenceService.expertInvisibleRoute = jest.fn().mockReturnValue(response);
    expect(visibilityEffects.setVisibilityInvisible$).toBeObservable(expected);
  });
});
