import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { ActivitiesEffects } from '@platform/features/dashboard/effects/activities.effects';
import { ActivitiesService } from '@anymind-ng/api';
import { Deceiver } from 'deceiver-core';
import { ActivitiesActions } from '@platform/features/dashboard/actions';

describe('ActivitiesEffects', () => {
  let activitiesEffects: ActivitiesEffects;
  let activitiesService: ActivitiesService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActivitiesEffects,
        {
          provide: ActivitiesService,
          useValue: Deceiver(ActivitiesService, {
            getImportantActivitiesCountersRoute: jasmine.createSpy(
              'ActivitiesService.getImportantActivitiesCountersRoute',
            ),
          }),
        },
        provideMockActions(() => actions$),
      ],
    });

    activitiesEffects = TestBed.get(ActivitiesEffects);
    activitiesService = TestBed.get(ActivitiesService);
    actions$ = TestBed.get(Actions);
  });

  describe('fetchImportantActivitiesCounter$', () => {
    it('should return a FetchImportantActivitiesCounterSuccessAction, with counters if fetch succeeds', () => {
      const counters = {} as any;
      const action = new ActivitiesActions.FetchImportantActivitiesCounterAction();
      const completion = new ActivitiesActions.FetchImportantActivitiesCounterSuccessAction(counters);

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: counters });
      const expected = cold('--b', { b: completion });
      activitiesService.getImportantActivitiesCountersRoute = jasmine.createSpy('').and.returnValue(response);

      expect(activitiesEffects.fetchImportantActivitiesCounter$).toBeObservable(expected);
    });

    it('should return a FetchImportantActivitiesCounterErrorAction, with error if fetch fails', () => {
      const error = 'Something is wrong';
      const action = new ActivitiesActions.FetchImportantActivitiesCounterAction();
      const completion = new ActivitiesActions.FetchImportantActivitiesCounterErrorAction(error);

      actions$ = hot('-a---', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: completion });
      activitiesService.getImportantActivitiesCountersRoute = jasmine.createSpy('').and.returnValue(response);

      expect(activitiesEffects.fetchImportantActivitiesCounter$).toBeObservable(expected);
    });
  });
});
