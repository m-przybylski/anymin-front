// tslint:disable:max-file-line-count
// tslint:disable:max-line-length
import { IState, reducer } from './activities.reducer';
import { ActivitiesApiActions, ActivitiesPageActions, ActivitiesActions } from '../actions';

describe('activities.reducer', () => {
  const initialState: IState = {
    importantActivitiesList: [],
    importantActivitiesCount: 0,
    activitiesList: [],
    activitiesCount: 0,
    isLoaded: false,
    currentOffset: 0,
    importantActivitiesShow: false,
    displayedImportantActivitiesIds: [],
    offsetIterator: 10,
    importantActivitiesOffset: 3,
  };
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toEqual(initialState);
    });
  });
  describe('LoadExpertActivitiesWithBalance', () => {
    it('should start loading', () => {
      const result_one = reducer(
        { ...initialState, isLoaded: true },
        new ActivitiesActions.LoadCompanyActivitiesWithBalanceAction(),
      );
      expect(result_one).toEqual(initialState);
      const result_two = reducer(
        { ...initialState, isLoaded: true },
        new ActivitiesActions.LoadExpertActivitiesWithBalanceAction(),
      );
      expect(result_two).toEqual(initialState);
    });
  });
  describe('LoadActivitiesWithImportantSuccessAction', () => {
    it('should populate values', () => {
      const payload = {
        importantActivitiesList: {
          activities: [{ id: 'one' }, { id: 'two' }],
          count: 2,
        },
        activitiesList: {
          activities: [{ id: 'one' }, { id: 'two' }, { id: 'three' }, { id: 'four' }],
          count: 56,
        },
      };
      const result = reducer(
        initialState,
        new ActivitiesApiActions.LoadActivitiesWithImportantSuccessAction(payload as any),
      );
      expect(result).toEqual({
        importantActivitiesList: [{ id: 'one' }, { id: 'two' }],
        importantActivitiesCount: 2,
        activitiesList: [{ id: 'one' }, { id: 'two' }, { id: 'three' }, { id: 'four' }],
        activitiesCount: 56,
        isLoaded: true,
        currentOffset: 4,
        importantActivitiesShow: false,
        displayedImportantActivitiesIds: ['one', 'two'],
        offsetIterator: 10,
        importantActivitiesOffset: 3,
      } as any);
    });
  });
  describe('LoadActivitiesWithImportantFailureAction', () => {
    it('should populate values', () => {
      const result = reducer(
        initialState,
        new ActivitiesApiActions.LoadActivitiesWithImportantFailureAction(new Error('oups!')),
      );
      expect(result).toEqual({
        importantActivitiesList: [],
        importantActivitiesCount: 0,
        activitiesList: [],
        activitiesCount: 0,
        isLoaded: true,
        currentOffset: 0,
        importantActivitiesShow: false,
        displayedImportantActivitiesIds: [],
        offsetIterator: 10,
        importantActivitiesOffset: 3,
      } as any);
    });
  });
  describe('LoadExpertActivitiesSuccess', () => {
    it('should add activities', () => {
      const init = {
        importantActivitiesList: [{ id: 'one' }, { id: 'two' }],
        importantActivitiesCount: 2,
        activitiesList: [{ id: 'one' }, { id: 'two' }, { id: 'three' }, { id: 'four' }],
        activitiesCount: 4,
        isLoaded: true,
        currentOffset: 4,
        importantActivitiesShow: false,
        displayedImportantActivitiesIds: ['one', 'two'],
        offsetIterator: 10,
        importantActivitiesOffset: 3,
      };
      const payload = {
        activities: [{ id: 'five' }, { id: 'six' }],
        count: 56,
      };
      const result = reducer(init as any, new ActivitiesApiActions.LoadActivitiesSuccessAction(payload as any));
      expect(result).toEqual({
        importantActivitiesList: [{ id: 'one' }, { id: 'two' }],
        importantActivitiesCount: 2,
        activitiesList: [{ id: 'one' }, { id: 'two' }, { id: 'three' }, { id: 'four' }, { id: 'five' }, { id: 'six' }],
        activitiesCount: 56,
        isLoaded: true,
        currentOffset: 6,
        importantActivitiesShow: false,
        displayedImportantActivitiesIds: ['one', 'two'],
        offsetIterator: 10,
        importantActivitiesOffset: 3,
      } as any);
    });
  });
  describe('ShowImportantActivities && HideImportantActivities', () => {
    const show = {
      importantActivitiesList: [
        { id: 'one' },
        { id: 'two' },
        { id: 'three' },
        { id: 'four' },
        { id: 'five' },
        { id: 'six' },
      ],
      importantActivitiesCount: 2,
      activitiesList: [{ id: 'one' }, { id: 'two' }, { id: 'three' }, { id: 'four' }, { id: 'five' }, { id: 'six' }],
      activitiesCount: 56,
      isLoaded: true,
      currentOffset: 6,
      importantActivitiesShow: true,
      displayedImportantActivitiesIds: ['one', 'two', 'three', 'four', 'five', 'six'],
      offsetIterator: 10,
      importantActivitiesOffset: 3,
    } as any;

    const hide = {
      importantActivitiesList: [
        { id: 'one' },
        { id: 'two' },
        { id: 'three' },
        { id: 'four' },
        { id: 'five' },
        { id: 'six' },
      ],
      importantActivitiesCount: 2,
      activitiesList: [{ id: 'one' }, { id: 'two' }, { id: 'three' }, { id: 'four' }, { id: 'five' }, { id: 'six' }],
      activitiesCount: 56,
      isLoaded: true,
      currentOffset: 6,
      importantActivitiesShow: false,
      displayedImportantActivitiesIds: ['one', 'two', 'three'],
      offsetIterator: 10,
      importantActivitiesOffset: 3,
    } as any;
    it('should display full list of values', () => {
      const result = reducer(hide, new ActivitiesPageActions.ShowImportantActivitiesAction());
      expect(result).toEqual(show);
    });
    it('should display only x number of values', () => {
      const result = reducer(show, new ActivitiesPageActions.HideImportantActivitiesAction());
      expect(result).toEqual(hide);
    });
  });
  describe('ActivityDetailsClosed', () => {
    const show = {
      importantActivitiesList: [
        { id: 'one' },
        { id: 'two' },
        { id: 'three' },
        { id: 'four' },
        { id: 'five' },
        { id: 'six' },
      ],
      importantActivitiesCount: 6,
      activitiesList: [{ id: 'one' }, { id: 'two' }, { id: 'three' }, { id: 'four' }, { id: 'five' }, { id: 'six' }],
      activitiesCount: 56,
      isLoaded: true,
      currentOffset: 6,
      importantActivitiesShow: true,
      displayedImportantActivitiesIds: ['one', 'two', 'three', 'four', 'five', 'six'],
      offsetIterator: 10,
      importantActivitiesOffset: 3,
    } as any;

    const hide = {
      importantActivitiesList: [
        { id: 'one' },
        { id: 'two' },
        { id: 'three' },
        { id: 'four' },
        { id: 'five' },
        { id: 'six' },
      ],
      importantActivitiesCount: 6,
      activitiesList: [{ id: 'one' }, { id: 'two' }, { id: 'three' }, { id: 'four' }, { id: 'five' }, { id: 'six' }],
      activitiesCount: 56,
      isLoaded: true,
      currentOffset: 6,
      importantActivitiesShow: false,
      displayedImportantActivitiesIds: ['one', 'two', 'three'],
      offsetIterator: 10,
      importantActivitiesOffset: 3,
    } as any;
    it('should remove value from display list and provide update list for expanded view', () => {
      const result = reducer(show, new ActivitiesPageActions.ActivityDetailsClosedAction({ id: 'three' } as any));
      expect(result).toEqual({
        importantActivitiesList: [{ id: 'one' }, { id: 'two' }, { id: 'four' }, { id: 'five' }, { id: 'six' }],
        importantActivitiesCount: 5,
        activitiesList: [{ id: 'one' }, { id: 'two' }, { id: 'three' }, { id: 'four' }, { id: 'five' }, { id: 'six' }],
        activitiesCount: 56,
        isLoaded: true,
        currentOffset: 6,
        importantActivitiesShow: true,
        displayedImportantActivitiesIds: ['one', 'two', 'four', 'five', 'six'],
        offsetIterator: 10,
        importantActivitiesOffset: 3,
      } as any);
    });
    it('should remove value from display list and provide update list for collapsed view', () => {
      const result = reducer(hide, new ActivitiesPageActions.ActivityDetailsClosedAction({ id: 'three' } as any));
      expect(result).toEqual({
        importantActivitiesList: [{ id: 'one' }, { id: 'two' }, { id: 'four' }, { id: 'five' }, { id: 'six' }],
        importantActivitiesCount: 5,
        activitiesList: [{ id: 'one' }, { id: 'two' }, { id: 'three' }, { id: 'four' }, { id: 'five' }, { id: 'six' }],
        activitiesCount: 56,
        isLoaded: true,
        currentOffset: 6,
        importantActivitiesShow: false,
        displayedImportantActivitiesIds: ['one', 'two', 'four'],
        offsetIterator: 10,
        importantActivitiesOffset: 3,
      } as any);
    });
  });
  describe('LoadExpertActivitySuccess', () => {
    it('should add activity to important list, and not change activitiesList', () => {
      const state = {
        importantActivitiesList: [{ id: 'one' }, { id: 'two' }],
        importantActivitiesCount: 2,
        activitiesList: [{ id: 'one' }, { id: 'two' }, { id: 'three' }, { id: 'four' }, { id: 'five' }, { id: 'six' }],
        activitiesCount: 56,
        isLoaded: true,
        currentOffset: 6,
        importantActivitiesShow: false,
        displayedImportantActivitiesIds: ['one', 'two', 'three'],
        offsetIterator: 10,
        importantActivitiesOffset: 3,
      } as any;

      const result = reducer(state, new ActivitiesApiActions.LoadActivitySuccessAction({ id: 'three' } as any));

      expect(result).toEqual({
        importantActivitiesList: [{ id: 'three' }, { id: 'one' }, { id: 'two' }],
        importantActivitiesCount: 3,
        activitiesList: [{ id: 'one' }, { id: 'two' }, { id: 'three' }, { id: 'four' }, { id: 'five' }, { id: 'six' }],
        activitiesCount: 56,
        isLoaded: true,
        currentOffset: 6,
        importantActivitiesShow: false,
        displayedImportantActivitiesIds: ['three', 'one', 'two'],
        offsetIterator: 10,
        importantActivitiesOffset: 3,
      } as any);
    });

    it('should add activity to important list, and activitiesList when not exists there', () => {
      const state = {
        importantActivitiesList: [{ id: 'one' }, { id: 'two' }],
        importantActivitiesCount: 2,
        activitiesList: [{ id: 'one' }, { id: 'two' }, { id: 'four' }, { id: 'five' }, { id: 'six' }],
        activitiesCount: 56,
        isLoaded: true,
        currentOffset: 6,
        importantActivitiesShow: false,
        displayedImportantActivitiesIds: ['one', 'two'],
        offsetIterator: 10,
        importantActivitiesOffset: 2,
      } as any;
      const result = reducer(state, new ActivitiesApiActions.LoadActivitySuccessAction({ id: 'three' } as any));

      expect(result).toEqual({
        importantActivitiesList: [{ id: 'three' }, { id: 'one' }, { id: 'two' }],
        importantActivitiesCount: 3,
        activitiesList: [{ id: 'three' }, { id: 'one' }, { id: 'two' }, { id: 'four' }, { id: 'five' }, { id: 'six' }],
        activitiesCount: 56,
        isLoaded: true,
        currentOffset: 7,
        importantActivitiesShow: false,
        displayedImportantActivitiesIds: ['three', 'one', 'two'],
        offsetIterator: 10,
        importantActivitiesOffset: 2,
      } as any);
    });
  });
});
