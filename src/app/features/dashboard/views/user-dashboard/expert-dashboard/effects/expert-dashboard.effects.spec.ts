import { ExpertDashboardEffects } from './expert-dashboard.effects';
import { TestBed } from '@angular/core/testing';
import { ExpertDashboardService } from '../services/expert-dashboard.service';
import { Deceiver } from 'deceiver-core';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { ExpertDashboardApiActions, ExpertDashboardActions } from '../actions';
import { Actions } from '@ngrx/effects';

describe('ExpertDashboardEffects', () => {
  let expertDashboardEffects: ExpertDashboardEffects;
  let expertDashboardService: ExpertDashboardService;
  let actions$: Observable<any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        ExpertDashboardEffects,
        {
          provide: ExpertDashboardService,
          useValue: Deceiver(ExpertDashboardService),
        },
      ],
    });
  });

  beforeEach(() => {
    expertDashboardEffects = TestBed.get(ExpertDashboardEffects);
    expertDashboardService = TestBed.get(ExpertDashboardService);
    actions$ = TestBed.get(Actions);
  });
  it('LoadExpertDashboardAction should dispatch success on service success', () => {
    const apiAnswer: any = '🏳️‍🌈🏳️‍🌈🏳️‍🌈';
    const emitAction = new ExpertDashboardActions.LoadExpertDashboardAction('fake expert');
    const expectedAction = new ExpertDashboardApiActions.LoadExpertDashboardSuccessAction(apiAnswer);
    const expected = cold('--a--', { a: expectedAction });
    expertDashboardService.getExpertProfileData = jest.fn(() => cold('-a|', { a: apiAnswer }));
    actions$ = hot('-a---', { a: emitAction });
    expect(expertDashboardEffects.loadExpertProfile$).toBeObservable(expected);
    expect(expertDashboardService.getExpertProfileData).toHaveBeenCalledWith('fake expert');
  });
  it('ReloadExpertDashboardAfterConsultationsAction should dispatch success on service success', () => {
    const apiAnswer: any = '🏳️‍🌈🏳️‍🌈🏳️‍🌈';
    const emitAction = new ExpertDashboardActions.ReloadExpertDashboardAfterConsultationsAction('fake expert');
    const expectedAction = new ExpertDashboardApiActions.LoadExpertDashboardSuccessAction(apiAnswer);
    const expected = cold('--a--', { a: expectedAction });
    expertDashboardService.getExpertProfileData = jest.fn(() => cold('-a|', { a: apiAnswer }));
    actions$ = hot('-a---', { a: emitAction });
    expect(expertDashboardEffects.loadExpertProfile$).toBeObservable(expected);
    expect(expertDashboardService.getExpertProfileData).toHaveBeenCalledWith('fake expert');
  });
  it('ReloadExpertDashboardAfterCreateConsultationAction should dispatch success on service success', () => {
    const apiAnswer: any = '🏳️‍🌈🏳️‍🌈🏳️‍🌈';
    const emitAction = new ExpertDashboardActions.ReloadExpertDashboardAfterCreateConsultationAction('fake expert');
    const expectedAction = new ExpertDashboardApiActions.LoadExpertDashboardSuccessAction(apiAnswer);
    const expected = cold('--a--', { a: expectedAction });
    expertDashboardService.getExpertProfileData = jest.fn(() => cold('-a|', { a: apiAnswer }));
    actions$ = hot('-a---', { a: emitAction });
    expect(expertDashboardEffects.loadExpertProfile$).toBeObservable(expected);
    expect(expertDashboardService.getExpertProfileData).toHaveBeenCalledWith('fake expert');
  });
  it('ReloadExpertDashboardAfterEditProfileAction should dispatch success on service success', () => {
    const apiAnswer: any = '🏳️‍🌈🏳️‍🌈🏳️‍🌈';
    const emitAction = new ExpertDashboardActions.ReloadExpertDashboardAfterEditProfileAction('fake expert');
    const expectedAction = new ExpertDashboardApiActions.LoadExpertDashboardSuccessAction(apiAnswer);
    const expected = cold('--a--', { a: expectedAction });
    expertDashboardService.getExpertProfileData = jest.fn(() => cold('-a|', { a: apiAnswer }));
    actions$ = hot('-a---', { a: emitAction });
    expect(expertDashboardEffects.loadExpertProfile$).toBeObservable(expected);
    expect(expertDashboardService.getExpertProfileData).toHaveBeenCalledWith('fake expert');
  });
  it('LoadExpertDashboardAction should dispatch error on service error', () => {
    const emitAction = new ExpertDashboardActions.LoadExpertDashboardAction('fake expert');
    const expectedAction = new ExpertDashboardApiActions.LoadExpertDashboardFailureAction('fake error');
    const expected = cold('--a--', { a: expectedAction });
    expertDashboardService.getExpertProfileData = jest.fn(() => cold('-#', {}, 'fake error'));
    actions$ = hot('-a---', { a: emitAction });
    expect(expertDashboardEffects.loadExpertProfile$).toBeObservable(expected);
  });
});
