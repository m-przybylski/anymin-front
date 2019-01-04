import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { ActivitiesActions, BalanceApiActions, ActivitiesApiActions, ActivitiesPageActions } from '../actions';
import { Deceiver } from 'deceiver-core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_CLOSED_WITH_ERROR } from '@platform/shared/components/modals/activity-details/activity-details.view.component';
import { DashboardActions } from '@platform/features/dashboard/actions';
import { ActivitiesListService } from '@platform/features/dashboard/views/activities/services/activities-list.service';
import { ActivitiesEffects } from './activities.effects';

describe('ActivitiesEffects', () => {
  let activitiesEffects: ActivitiesEffects;
  let activitiesListService: ActivitiesListService;
  let modalService: NgbModal;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActivitiesEffects,
        provideMockActions(() => actions$),
        {
          provide: ActivitiesListService,
          useValue: Deceiver(ActivitiesListService, {
            getExpertProfilePayment: jest.fn(),
            getExpertAllActivities: jest.fn(),
            getExpertActivities: jest.fn(),
          }),
        },
        {
          provide: NgbModal,
          useValue: Deceiver(NgbModal, {
            open: jest.fn(),
          }),
        },
      ],
    });

    activitiesEffects = TestBed.get(ActivitiesEffects);
    activitiesListService = TestBed.get(ActivitiesListService);
    modalService = TestBed.get(NgbModal);
  });

  describe('loadExpertAllActivitiesWithBalance$', () => {
    it('should dispach LoadBalanceSuccessAction and LoadExpertAllActivitiesSuccessAction on success', () => {
      const action = new ActivitiesActions.LoadExpertActivitiesWithBalanceAction();
      actions$ = hot('-a---', { a: action });

      const balancePayload = 'balance';
      const getAllActivietiesPayload = 'getAllActivieties';

      (activitiesListService.getExpertProfilePayment as jest.Mock).mockReturnValue(cold('-a|', { a: balancePayload }));
      (activitiesListService.getExpertAllActivities as jest.Mock).mockReturnValue(
        cold('-a|', { a: getAllActivietiesPayload }),
      );

      const balance = new BalanceApiActions.LoadBalanceSuccessAction(balancePayload as any);
      const load = new ActivitiesApiActions.LoadActivitiesWithImportantSuccessAction(getAllActivietiesPayload as any);
      const expected = cold('---(bc)', { b: balance, c: load });

      expect(activitiesEffects.loadAllExpertActivitiesWithBalance$).toBeObservable(expected);
    });
    it('should dispach LoadBalanceErrorAction and LoadExpertAllActivitiesErrorAction on error', () => {
      const action = new ActivitiesActions.LoadExpertActivitiesWithBalanceAction();
      actions$ = hot('-a---', { a: action });

      (activitiesListService.getExpertProfilePayment as jest.Mock).mockReturnValue(cold('-#', {}, 'error'));
      (activitiesListService.getExpertAllActivities as jest.Mock).mockReturnValue(cold('-#', {}, 'error1'));

      const balance = new BalanceApiActions.LoadBalanceFailureAction('error');
      const load = new ActivitiesApiActions.LoadActivitiesWithImportantFailureAction('error');
      const expected = cold('--(bc)', { b: balance, c: load });

      expect(activitiesEffects.loadAllExpertActivitiesWithBalance$).toBeObservable(expected);
    });

    describe('LoadExpertActivitiesWithBalanceAction$', () => {
      it('should dispatch LoadExpertActivitiesSuccessAction on success', () => {
        const action = new ActivitiesPageActions.LoadMoreExpertActivitiesAction({
          currentOffset: 1,
          offsetIterator: 2,
        });
        actions$ = hot('-a--', { a: action });
        const getActivieties = 'getActivieties';
        (activitiesListService.getExpertActivities as jest.Mock).mockReturnValue(cold('-a|', { a: getActivieties }));

        const loadExpertActivitiesSuccessAction = new ActivitiesApiActions.LoadActivitiesSuccessAction(
          getActivieties as any,
        );
        const expected = cold('--b', { b: loadExpertActivitiesSuccessAction });

        expect(activitiesEffects.loadMoreExpertActivities$).toBeObservable(expected);
      });
      it('should dispatch LoadExpertActivitiesFailureAction on failure', () => {
        const action = new ActivitiesPageActions.LoadMoreExpertActivitiesAction({
          currentOffset: 1,
          offsetIterator: 2,
        });
        actions$ = hot('-a--', { a: action });
        (activitiesListService.getExpertActivities as jest.Mock).mockReturnValue(cold('-#', {}, 'error'));

        const loadActivitiesFailureAction = new ActivitiesApiActions.LoadActivitiesFailureAction('error');
        const expected = cold('--b', { b: loadActivitiesFailureAction });

        expect(activitiesEffects.loadMoreExpertActivities$).toBeObservable(expected);
      });
    });

    describe('openActivityDetails$', () => {
      const getProfileActivity: any = 'getProfileActivity';
      describe('non important activity', () => {
        const isImportant = false;
        it('should open dialog and emit empty value for non important activity', () => {
          (modalService.open as jest.Mock).mockReturnValue({ result: of('') });
          const action = new ActivitiesPageActions.ExpertActivityRowClickAction({
            getProfileActivity,
            isImportant,
          });
          actions$ = hot('-a---', { a: action });

          const expected = cold('-b', { b: { type: 'NO_ACTION' } });
          expect(activitiesEffects.openExpertActivityDetails$).toBeObservable(expected);
        });
        it('should open dialog and emit empty value for non important activity with correct value', () => {
          (modalService.open as jest.Mock).mockReturnValue({ result: of(MODAL_CLOSED_WITH_ERROR) });
          const action = new ActivitiesPageActions.ExpertActivityRowClickAction({
            getProfileActivity,
            isImportant,
          });
          actions$ = hot('-a---', { a: action });

          const expected = cold('-b', { b: { type: 'NO_ACTION' } });
          expect(activitiesEffects.openExpertActivityDetails$).toBeObservable(expected);
        });
      });
      describe('non important activity', () => {
        const isImportant = false;
        it('should open dialog and emit empty value', () => {
          (modalService.open as jest.Mock).mockReturnValue({ result: of('') });
          const action = new ActivitiesPageActions.ExpertActivityRowClickAction({
            getProfileActivity,
            isImportant,
          });
          actions$ = hot('-a---', { a: action });

          const expected = cold('-b', { b: { type: 'NO_ACTION' } });
          expect(activitiesEffects.openExpertActivityDetails$).toBeObservable(expected);
        });
        it('should open dialog and emit empty value with correct value', () => {
          (modalService.open as jest.Mock).mockReturnValue({ result: of(MODAL_CLOSED_WITH_ERROR) });
          const action = new ActivitiesPageActions.ExpertActivityRowClickAction({
            getProfileActivity,
            isImportant,
          });
          actions$ = hot('-a---', { a: action });

          const expected = cold('-b', { b: { type: 'NO_ACTION' } });
          expect(activitiesEffects.openExpertActivityDetails$).toBeObservable(expected);
        });
        it('should open dialog and emit empty value with rejected promise', () => {
          (modalService.open as jest.Mock).mockReturnValue({ result: throwError(new Error('oups')) });
          const action = new ActivitiesPageActions.ExpertActivityRowClickAction({
            getProfileActivity,
            isImportant,
          });
          actions$ = hot('-a---', { a: action });

          const expected = cold('-b', { b: { type: 'NO_ACTION' } });
          expect(activitiesEffects.openExpertActivityDetails$).toBeObservable(expected);
        });
      });
      describe('important activity', () => {
        const isImportant = true;
        it('should open dialog and emit empty value', () => {
          (modalService.open as jest.Mock).mockReturnValue({ result: of('') });
          const action = new ActivitiesPageActions.ExpertActivityRowClickAction({
            getProfileActivity,
            isImportant,
          });
          actions$ = hot('-a---', { a: action });

          const decrement = new DashboardActions.DecrementImportantExpertActivitiesCounterAction();
          const closed = new ActivitiesPageActions.ActivityDetailsClosedAction(getProfileActivity);
          const expected = cold('-(bc)', { b: decrement, c: closed });

          expect(activitiesEffects.openExpertActivityDetails$).toBeObservable(expected);
        });
        it('should open dialog and emit empty value with correct value', () => {
          (modalService.open as jest.Mock).mockReturnValue({ result: of(MODAL_CLOSED_WITH_ERROR) });
          const action = new ActivitiesPageActions.ExpertActivityRowClickAction({
            getProfileActivity,
            isImportant,
          });
          actions$ = hot('-a---', { a: action });

          const expected = cold('-b', { b: { type: 'NO_ACTION' } });
          expect(activitiesEffects.openExpertActivityDetails$).toBeObservable(expected);
        });
        it('should open dialog and emit empty value with rejected promise', () => {
          (modalService.open as jest.Mock).mockReturnValue({ result: throwError(new Error('oups')) });
          const action = new ActivitiesPageActions.ExpertActivityRowClickAction({
            getProfileActivity,
            isImportant,
          });
          actions$ = hot('-a---', { a: action });
          const decrement = new DashboardActions.DecrementImportantExpertActivitiesCounterAction();
          const closed = new ActivitiesPageActions.ActivityDetailsClosedAction(getProfileActivity);
          const expected = cold('-(bc)', { b: decrement, c: closed });

          expect(activitiesEffects.openExpertActivityDetails$).toBeObservable(expected);
        });
      });
    });
  });
});
