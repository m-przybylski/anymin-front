import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { DashboardEffects } from '@platform/features/dashboard/effects/activities.effects';
import { ActivitiesService } from '@anymind-ng/api';
import { Deceiver } from 'deceiver-core';
import { DashboardActions } from '@platform/features/dashboard/actions';

describe('DashboardEffects', () => {
  let dashboardEffects: DashboardEffects;
  let activitiesService: ActivitiesService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DashboardEffects,
        {
          provide: ActivitiesService,
          useValue: Deceiver(ActivitiesService, {
            getImportantActivitiesCountersRoute: jest.fn(),
          }),
        },
        provideMockActions(() => actions$),
      ],
    });

    dashboardEffects = TestBed.get(DashboardEffects);
    activitiesService = TestBed.get(ActivitiesService);
    actions$ = TestBed.get(Actions);
  });

  describe('fetchImportantActivitiesCounter$', () => {
    it('should return a FetchImportantActivitiesCounterSuccessAction, with counters if fetch succeeds', () => {
      const counters = {} as any;
      const action = new DashboardActions.FetchImportantActivitiesCounterAction();
      const completion = new DashboardActions.FetchImportantActivitiesCounterSuccessAction(counters);

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: counters });
      const expected = cold('--b', { b: completion });
      activitiesService.getImportantActivitiesCountersRoute = jest.fn(() => response);

      expect(dashboardEffects.fetchImportantActivitiesCounter$).toBeObservable(expected);
    });

    it('should return a FetchImportantActivitiesCounterErrorAction, with error if fetch fails', () => {
      const error = 'Something is wrong';
      const action = new DashboardActions.FetchImportantActivitiesCounterAction();
      const completion = new DashboardActions.FetchImportantActivitiesCounterErrorAction(error);

      actions$ = hot('-a---', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: completion });
      activitiesService.getImportantActivitiesCountersRoute = jest.fn(() => response);

      expect(dashboardEffects.fetchImportantActivitiesCounter$).toBeObservable(expected);
    });
  });
});
