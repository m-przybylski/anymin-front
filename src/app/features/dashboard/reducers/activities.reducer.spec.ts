// tslint:disable:max-line-length
import { IState, reducer } from './activities.reducer';
import { DashboardActions } from '../actions';

describe('activities.reducer', () => {
  const initialState: IState = {
    isPending: false,
    activitiesCounters: {
      clientActivitiesCount: 0,
      expertProfileActivitiesCount: 0,
      organizationProfileActivitiesCount: 0,
    },
  };
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toEqual(initialState);
    });
  });
  describe('FetchImportantActivitiesCounterSuccessAction', () => {
    it('should populate values', () => {
      const payload = {
        clientActivitiesCount: 2,
        expertProfileActivitiesCount: 5,
        organizationProfileActivitiesCount: 1,
      };
      const result = reducer(
        initialState,
        new DashboardActions.FetchImportantActivitiesCounterSuccessAction(payload as any),
      );
      expect(result).toEqual({
        isPending: false,
        activitiesCounters: {
          clientActivitiesCount: 2,
          expertProfileActivitiesCount: 5,
          organizationProfileActivitiesCount: 1,
        },
      } as any);
    });
  });
  describe('IncrementImportantExpertActivitiesCounterAction', () => {
    it('should add 1 to expert activities', () => {
      const result = reducer(initialState, new DashboardActions.IncrementImportantExpertActivitiesCounterAction());
      expect(result).toEqual({
        isPending: false,
        activitiesCounters: {
          clientActivitiesCount: 0,
          expertProfileActivitiesCount: 1,
          organizationProfileActivitiesCount: 0,
        },
      });
    });
  });
  describe('DecrementImportantExpertActivitiesCounterAction', () => {
    it('should remove 1 from expert activities', () => {
      const result = reducer(initialState, new DashboardActions.DecrementImportantExpertActivitiesCounterAction());
      expect(result).toEqual({
        isPending: false,
        activitiesCounters: {
          clientActivitiesCount: 0,
          expertProfileActivitiesCount: -1,
          organizationProfileActivitiesCount: 0,
        },
      });
    });
  });
  describe('IncrementImportantClientActivitiesCounterAction', () => {
    it('should add 1 to client activities', () => {
      const result = reducer(initialState, new DashboardActions.IncrementImportantClientActivitiesCounterAction());
      expect(result).toEqual({
        isPending: false,
        activitiesCounters: {
          clientActivitiesCount: 1,
          expertProfileActivitiesCount: 0,
          organizationProfileActivitiesCount: 0,
        },
      });
    });
  });
  describe('DecrementImportantClientActivitiesCounterAction', () => {
    it('should remove 1 from client activities', () => {
      const result = reducer(initialState, new DashboardActions.DecrementImportantClientActivitiesCounterAction());
      expect(result).toEqual({
        isPending: false,
        activitiesCounters: {
          clientActivitiesCount: -1,
          expertProfileActivitiesCount: 0,
          organizationProfileActivitiesCount: 0,
        },
      });
    });
  });
  describe('IncrementImportantOrganizationActivitiesCounterAction', () => {
    it('should add 1 to organization activities', () => {
      const result = reducer(
        initialState,
        new DashboardActions.IncrementImportantOrganizationActivitiesCounterAction(),
      );
      expect(result).toEqual({
        isPending: false,
        activitiesCounters: {
          clientActivitiesCount: 0,
          expertProfileActivitiesCount: 0,
          organizationProfileActivitiesCount: 1,
        },
      });
    });
  });
  describe('DecrementImportantOrganizationActivitiesCounterAction', () => {
    it('should remove 1 from organization activities', () => {
      const result = reducer(
        initialState,
        new DashboardActions.DecrementImportantOrganizationActivitiesCounterAction(),
      );
      expect(result).toEqual({
        isPending: false,
        activitiesCounters: {
          clientActivitiesCount: 0,
          expertProfileActivitiesCount: 0,
          organizationProfileActivitiesCount: -1,
        },
      });
    });
  });
});
