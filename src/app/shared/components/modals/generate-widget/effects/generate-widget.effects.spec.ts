import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { GenerateWidgetEffects } from './generate-widget.effects';
import { GenerateWidgetActions, GenerateWidgetApiActions } from '../actions';
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

  describe('startOpeningModal$', () => {
    it('should fetch data from server and dispatch FetchWidgetIdSuccessAction on success', () => {
      // preapare data
      const inputPayload = { serviceId: 'serwis 1', expertId: 'ekspert 1', shareUrl: 'url' };
      const backendPayload = { serviceId: 'serwis 1', expertId: 'ekspert 1', id: 'widget 1' };
      const backendResponse = cold('-a|', { a: backendPayload });
      const inputAction = new GenerateWidgetActions.StartOpenGenerateWidgetAction(inputPayload);
      const outputAction = new GenerateWidgetApiActions.FetchWidgetIdSuccessAction({
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
      expect(generateWidgetService.openModal).toHaveBeenCalled();
    });
    it('should fetch data from server and dispatch FetchWidgetIdSuccessAction with origin data', () => {
      // preapare data
      const inputPayload = { serviceId: 'serwis 1', expertId: 'ekspert 1', shareUrl: 'url' };
      const backendPayload = { id: 'widget 1' };
      const backendResponse = cold('-a|', { a: backendPayload });
      const inputAction = new GenerateWidgetActions.StartOpenGenerateWidgetAction(inputPayload);
      const outputAction = new GenerateWidgetApiActions.FetchWidgetIdSuccessAction({
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
      expect(generateWidgetService.openModal).toHaveBeenCalled();
    });
    it('should fetch data from server and dispatch FetchWidgetIdErrorAction on error', () => {
      // preapare data
      const inputPayload = { serviceId: 'serwis 1', expertId: 'ekspert 1', shareUrl: 'url' };
      const backendResponse = cold('-#', {}, 'oups');
      const inputAction = new GenerateWidgetActions.StartOpenGenerateWidgetAction(inputPayload);
      const outputAction = new GenerateWidgetApiActions.FetchWidgetIdErrorAction('oups');
      const expected = cold('---r-', { r: outputAction });

      // mock executeion
      (widgetService.postGenerateWidgetRoute as jest.Mock).mockReturnValue(backendResponse);
      actions$ = hot('--a--', { a: inputAction });

      // expect
      expect(generateWidgetEffects.startOpeningModal$).toBeObservable(expected);
      expect(alertService.pushWarningAlert).toHaveBeenCalled();
    });
  });
});
