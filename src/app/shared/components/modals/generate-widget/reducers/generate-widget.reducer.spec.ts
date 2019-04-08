import { IGenerateWidgetState, reducer } from './generate-widget.reducer';
import { GenerateWidgetActions, GenerateWidgetApiActions } from '../actions';

describe('generate-widget.reducer', () => {
  const initialState: IGenerateWidgetState = {
    fetchWidgetIdPending: false,
  };
  describe('default state', () => {
    it('should apply default state', () => {
      const result = reducer(undefined, {} as any);
      expect(result).toEqual(initialState);
    });
  });
  describe('StartOpenGenerateWidgetModal', () => {
    const action = new GenerateWidgetActions.StartOpenGenerateWidgetAction({
      expertId: 'fake expert id',
      serviceId: 'fake service id',
      shareLink: 'fake url',
    });
    it('should populate state with expert and service', () => {
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });
  describe('FetchWidgetIdSuccess', () => {
    const action = new GenerateWidgetApiActions.FetchWidgetIdSuccessAction({
      expertId: 'fake expert Id',
      serviceId: 'fake service Id',
      widgetId: 'fake widget Id',
    });
    it('should update store with given value', () => {
      const result = reducer({ ...initialState, fetchWidgetIdPending: true }, action);
      expect(result).toMatchSnapshot();
    });
  });
  describe('FetchWidgetIdError', () => {
    const action = new GenerateWidgetApiActions.FetchWidgetIdErrorAction('fake error');
    it('should update store with given value', () => {
      const result = reducer({ ...initialState, fetchWidgetIdPending: true }, action);
      expect(result).toMatchSnapshot();
    });
  });
});
