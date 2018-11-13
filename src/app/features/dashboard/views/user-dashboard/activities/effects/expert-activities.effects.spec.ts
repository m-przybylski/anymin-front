import { TestBed } from '@angular/core/testing';
import { ExpertActivitiesEffects } from './expert-activities.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import {
  ExpertActivitiesActions,
  BalanceApiActions,
  ExpertActivitiesApiActions,
  ExpertActivitiesPageActions,
} from '../actions';
import { ExpertActivitiesService } from '@platform/features/dashboard/views/user-dashboard/activities/services/expert-activities.service';
import { Deceiver } from 'deceiver-core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_CLOSED_WITH_ERROR } from '@platform/shared/components/modals/activity-details/activity-details.view.component';
import { ActivitiesActions } from '@platform/features/dashboard/actions';

describe('ExpertActivitiesEffects', () => {
  let expertActivitiesEffects: ExpertActivitiesEffects;
  let expertActivitiesService: ExpertActivitiesService;
  let modalService: NgbModal;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExpertActivitiesEffects,
        provideMockActions(() => actions$),
        {
          provide: ExpertActivitiesService,
          useValue: Deceiver(ExpertActivitiesService, {
            getProfilePayment: jasmine.createSpy('getProfilePayment'),
            getAllActivieties: jasmine.createSpy('getAllActivieties'),
            getActivieties: jasmine.createSpy('getActivieties'),
          }),
        },
        {
          provide: NgbModal,
          useValue: Deceiver(NgbModal, {
            open: jasmine.createSpy('open'),
          }),
        },
      ],
    });

    expertActivitiesEffects = TestBed.get(ExpertActivitiesEffects);
    expertActivitiesService = TestBed.get(ExpertActivitiesService);
    modalService = TestBed.get(NgbModal);
  });

  describe('loadExpertAllActivitiesWithBalance$', () => {
    it('should dispach LoadBalanceSuccessAction and LoadExpertAllActivitiesSuccessAction on success', () => {
      const action = new ExpertActivitiesActions.LoadExpertActivitiesWithBalance();
      actions$ = hot('-a---', { a: action });

      const balancePayload = 'balance';
      const getAllActivietiesPayload = 'getAllActivieties';

      (expertActivitiesService.getProfilePayment as jasmine.Spy).and.returnValue(cold('-a|', { a: balancePayload }));
      (expertActivitiesService.getAllActivieties as jasmine.Spy).and.returnValue(
        cold('-a|', { a: getAllActivietiesPayload }),
      );

      const balance = new BalanceApiActions.LoadExpertBalanceSuccessAction(balancePayload as any);
      const load = new ExpertActivitiesApiActions.LoadExpertActivitiesWithImportantSuccessAction(
        getAllActivietiesPayload as any,
      );
      const expected = cold('---(bc)', { b: balance, c: load });

      expect(expertActivitiesEffects.loadExpertAllActivitiesWithBalance$).toBeObservable(expected);
    });
    it('should dispach LoadBalanceErrorAction and LoadExpertAllActivitiesErrorAction on error', () => {
      const action = new ExpertActivitiesActions.LoadExpertActivitiesWithBalance();
      actions$ = hot('-a---', { a: action });

      (expertActivitiesService.getProfilePayment as jasmine.Spy).and.returnValue(cold('-#', {}, 'error'));
      (expertActivitiesService.getAllActivieties as jasmine.Spy).and.returnValue(cold('-#', {}, 'error1'));

      const balance = new BalanceApiActions.LoadExpertBalanceFailureAction('error');
      const load = new ExpertActivitiesApiActions.LoadExpertActivitiesWithImportantFailureAction('error');
      const expected = cold('--(bc)', { b: balance, c: load });

      expect(expertActivitiesEffects.loadExpertAllActivitiesWithBalance$).toBeObservable(expected);
    });

    describe('loadExpertActivitiesWithBalance$', () => {
      it('should dispatch LoadExpertActivitiesSuccessAction on success', () => {
        const action = new ExpertActivitiesPageActions.LoadMoreExpertActivitiesAction({
          currentOffset: 1,
          offsetIterator: 2,
        });
        actions$ = hot('-a--', { a: action });
        const getActivieties = 'getActivieties';
        (expertActivitiesService.getActivieties as jasmine.Spy).and.returnValue(cold('-a|', { a: getActivieties }));

        const loadExpertActivitiesSuccessAction = new ExpertActivitiesApiActions.LoadExpertActivitiesSuccessAction(
          getActivieties as any,
        );
        const expected = cold('--b', { b: loadExpertActivitiesSuccessAction });

        expect(expertActivitiesEffects.loadMoreExpertActivities$).toBeObservable(expected);
      });
      it('should dispatch LoadExpertActivitiesFailureAction on failure', () => {
        const action = new ExpertActivitiesPageActions.LoadMoreExpertActivitiesAction({
          currentOffset: 1,
          offsetIterator: 2,
        });
        actions$ = hot('-a--', { a: action });
        (expertActivitiesService.getActivieties as jasmine.Spy).and.returnValue(cold('-#', {}, 'error'));

        const loadExpertActivitiesSuccessAction = new ExpertActivitiesApiActions.LoadExpertActivitiesFailureAction(
          'error',
        );
        const expected = cold('--b', { b: loadExpertActivitiesSuccessAction });

        expect(expertActivitiesEffects.loadMoreExpertActivities$).toBeObservable(expected);
      });
    });

    describe('openActivityDetails$', () => {
      const getProfileActivity: any = 'getProfileActivity';
      describe('non important activity', () => {
        const isImportant = false;
        it('should open dialog and emit empty value for non important activity', () => {
          (modalService.open as jasmine.Spy).and.returnValue({ result: of('') });
          const action = new ExpertActivitiesPageActions.ActivityRowClickAction({
            getProfileActivity,
            isImportant,
          });
          actions$ = hot('-a---', { a: action });

          const expected = cold('-b', { b: { type: 'NO_ACTION' } });
          expect(expertActivitiesEffects.openActivityDetails$).toBeObservable(expected);
        });
        it('should open dialog and emit empty value for non important activity with correct value', () => {
          (modalService.open as jasmine.Spy).and.returnValue({ result: of(MODAL_CLOSED_WITH_ERROR) });
          const action = new ExpertActivitiesPageActions.ActivityRowClickAction({
            getProfileActivity,
            isImportant,
          });
          actions$ = hot('-a---', { a: action });

          const expected = cold('-b', { b: { type: 'NO_ACTION' } });
          expect(expertActivitiesEffects.openActivityDetails$).toBeObservable(expected);
        });
      });
      describe('non important activity', () => {
        const isImportant = false;
        it('should open dialog and emit empty value', () => {
          (modalService.open as jasmine.Spy).and.returnValue({ result: of('') });
          const action = new ExpertActivitiesPageActions.ActivityRowClickAction({
            getProfileActivity,
            isImportant,
          });
          actions$ = hot('-a---', { a: action });

          const expected = cold('-b', { b: { type: 'NO_ACTION' } });
          expect(expertActivitiesEffects.openActivityDetails$).toBeObservable(expected);
        });
        it('should open dialog and emit empty value with correct value', () => {
          (modalService.open as jasmine.Spy).and.returnValue({ result: of(MODAL_CLOSED_WITH_ERROR) });
          const action = new ExpertActivitiesPageActions.ActivityRowClickAction({
            getProfileActivity,
            isImportant,
          });
          actions$ = hot('-a---', { a: action });

          const expected = cold('-b', { b: { type: 'NO_ACTION' } });
          expect(expertActivitiesEffects.openActivityDetails$).toBeObservable(expected);
        });
        it('should open dialog and emit empty value with rejected promise', () => {
          (modalService.open as jasmine.Spy).and.returnValue({ result: throwError(new Error('oups')) });
          const action = new ExpertActivitiesPageActions.ActivityRowClickAction({
            getProfileActivity,
            isImportant,
          });
          actions$ = hot('-a---', { a: action });

          const expected = cold('-b', { b: { type: 'NO_ACTION' } });
          expect(expertActivitiesEffects.openActivityDetails$).toBeObservable(expected);
        });
      });
      describe('important activity', () => {
        const isImportant = true;
        it('should open dialog and emit empty value', () => {
          (modalService.open as jasmine.Spy).and.returnValue({ result: of('') });
          const action = new ExpertActivitiesPageActions.ActivityRowClickAction({
            getProfileActivity,
            isImportant,
          });
          actions$ = hot('-a---', { a: action });

          const decrement = new ActivitiesActions.DecrementImportantExpertActivitiesCounterAction();
          const closed = new ExpertActivitiesPageActions.ActivityDetailsClosedAction(getProfileActivity);
          const expected = cold('-(bc)', { b: decrement, c: closed });

          expect(expertActivitiesEffects.openActivityDetails$).toBeObservable(expected);
        });
        it('should open dialog and emit empty value with correct value', () => {
          (modalService.open as jasmine.Spy).and.returnValue({ result: of(MODAL_CLOSED_WITH_ERROR) });
          const action = new ExpertActivitiesPageActions.ActivityRowClickAction({
            getProfileActivity,
            isImportant,
          });
          actions$ = hot('-a---', { a: action });

          const expected = cold('-b', { b: { type: 'NO_ACTION' } });
          expect(expertActivitiesEffects.openActivityDetails$).toBeObservable(expected);
        });
        it('should open dialog and emit empty value with rejected promise', () => {
          (modalService.open as jasmine.Spy).and.returnValue({ result: throwError(new Error('oups')) });
          const action = new ExpertActivitiesPageActions.ActivityRowClickAction({
            getProfileActivity,
            isImportant,
          });
          actions$ = hot('-a---', { a: action });
          const decrement = new ActivitiesActions.DecrementImportantExpertActivitiesCounterAction();
          const closed = new ExpertActivitiesPageActions.ActivityDetailsClosedAction(getProfileActivity);
          const expected = cold('-(bc)', { b: decrement, c: closed });

          expect(expertActivitiesEffects.openActivityDetails$).toBeObservable(expected);
        });
      });
    });
  });
});
