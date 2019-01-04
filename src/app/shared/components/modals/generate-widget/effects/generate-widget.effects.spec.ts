import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { GenerateWidgetEffects } from './generate-widget.effects';
import * as GenerateWidgetActions from '../actions/generate-widget.actions';
import { WidgetService } from '@anymind-ng/api';
import { Deceiver } from 'deceiver-core';
import { AlertService } from '@anymind-ng/core';
import { GenerateWidgetService } from '../services/generate-widget.service';
import { provideMockFactoryLogger } from 'testing/testing';

describe('GenerateWidgetEffects', () => {
  let generateWidgetEffects: GenerateWidgetEffects;
  let actions$: Observable<any>;
  const widgetService: WidgetService = Deceiver(WidgetService);
  const alertService: AlertService = Deceiver(AlertService);
  const generateWidgetService: GenerateWidgetService = Deceiver(GenerateWidgetService);

  beforeEach(() => {
    widgetService.postGenerateWidgetRoute = jest.fn();
    alertService.pushWarningAlert = jest.fn();
    generateWidgetService.openModal = jest.fn();
    TestBed.configureTestingModule({
      providers: [
        GenerateWidgetEffects,
        provideMockFactoryLogger(),
        provideMockActions(() => actions$),
        {
          provide: WidgetService,
          useValue: widgetService,
        },
        {
          provide: AlertService,
          useValue: alertService,
        },
        {
          provide: GenerateWidgetService,
          useValue: generateWidgetService,
        },
      ],
    });

    generateWidgetEffects = TestBed.get(GenerateWidgetEffects);
    actions$ = TestBed.get(Actions);
  });
  beforeEach(() => {
    [widgetService.postGenerateWidgetRoute, alertService.pushWarningAlert].forEach((fn: jest.Mock) => {
      fn.mockClear();
    });
  });
  describe('fetchWidgetId$', () => {
    it('should fetch data from backend and return Success Action', () => {
      const widget = { id: 'widget1', expertId: 'expert123', serviceId: 'service123' };
      const backend = cold('-a|', { a: widget });
      (widgetService.postGenerateWidgetRoute as jest.Mock).mockReturnValue(backend);

      const payload = { expertId: 'expert123', serviceId: 'service123' };
      const action = new GenerateWidgetActions.FetchWidgetIdAction(payload);
      const expected = new GenerateWidgetActions.FetchWidgetIdSuccessAction({
        widgetId: 'widget1',
        serviceId: 'service123',
        expertId: 'expert123',
      });

      actions$ = hot('--a-', { a: action });

      expect(generateWidgetEffects.fetchWidgetId$).toBeObservable(cold('---x', { x: expected }));
    });
    it('should fetch data from backend with error and return Faulure Action', () => {
      const backend = cold('-#', {}, 'oups');
      (widgetService.postGenerateWidgetRoute as jest.Mock).mockReturnValue(backend);

      const payload = { expertId: 'expert123', serviceId: 'service123' };
      const action = new GenerateWidgetActions.FetchWidgetIdAction(payload);
      const expected = new GenerateWidgetActions.FetchWidgetIdErrorAction('oups');

      actions$ = hot('--a-', { a: action });

      expect(generateWidgetEffects.fetchWidgetId$).toBeObservable(cold('---x', { x: expected }));
    });
  });
  describe('startOpeningModal$', () => {
    it('should fetch data from server and dispatch OpenGenerateWidgetAction', () => {
      // preapare data
      const inputPayload = { serviceId: 'serwis 1', expertId: 'ekspert 1' };
      const backendPayload = { serviceId: 'serwis 1', expertId: 'ekspert 1', id: 'widget 1' };
      const backendResponse = cold('-a|', { a: backendPayload });
      const inputAction = new GenerateWidgetActions.StartOpenGenerateWidgetAction(inputPayload);
      const outputAction = new GenerateWidgetActions.OpenGenerateWidgetAction({
        serviceId: 'serwis 1',
        expertId: 'ekspert 1',
        widgetId: 'widget 1',
      });
      const expected = cold('---r-', { r: outputAction });

      // mock executeion
      (widgetService.postGenerateWidgetRoute as jest.Mock).mockReturnValue(backendResponse);
      actions$ = hot('--a--', { a: inputAction });

      // expect
      expect(generateWidgetEffects.startOpeningModal$).toBeObservable(expected);
    });
    it('should fetch data from server and dispatch OpenGenerateWidgetAction', () => {
      // preapare data
      const inputPayload = { serviceId: 'serwis 1', expertId: 'ekspert 1' };
      const backendResponse = cold('-#', {}, 'oups');
      const inputAction = new GenerateWidgetActions.StartOpenGenerateWidgetAction(inputPayload);
      const outputAction = new GenerateWidgetActions.FetchWidgetIdErrorAction('oups');
      const expected = cold('---r-', { r: outputAction });

      // mock executeion
      (widgetService.postGenerateWidgetRoute as jest.Mock).mockReturnValue(backendResponse);
      actions$ = hot('--a--', { a: inputAction });

      // expect
      expect(generateWidgetEffects.startOpeningModal$).toBeObservable(expected);
    });
  });
  describe('openGerenateWidgetModal$', () => {
    it('should call modal open', () => {
      // preapare data
      const acionPayload = { serviceId: 'service 1', widgetId: 'widget 2', expertId: 'expert 1' };
      const inputAction = new GenerateWidgetActions.OpenGenerateWidgetAction(acionPayload);
      // mock executeion
      actions$ = hot('--a--', { a: inputAction });
      generateWidgetEffects.openGerenateWidgetModal$.subscribe(() => {
        expect(generateWidgetService.openModal).toHaveBeenCalled();
      });
    });
  });
  describe('fetchWidgetIdErrorAction$', () => {
    it('should call error message', () => {
      // preapare data
      const inputAction = new GenerateWidgetActions.FetchWidgetIdErrorAction('oups');
      // mock executeion
      actions$ = hot('--a--', { a: inputAction });

      generateWidgetEffects.fetchWidgetIdErrorAction$.subscribe(() => {
        expect(alertService.pushWarningAlert).toHaveBeenCalled();
      });
    });
  });
});
