import { ActivitiesService, GetDetailedClientActivity, GetTag } from '@anymind-ng/api';
import { dispatchLoggedUser, importStore, provideMockFactoryLogger } from 'testing/testing';
import { TestBed } from '@angular/core/testing';
import { Deceiver } from 'deceiver-core';
import { cold } from 'jasmine-marbles';
import { LoggerService } from '@anymind-ng/core';
import {
  ClientActivityDetailsComponentService,
  IClientActivityDetails,
} from '@platform/shared/components/modals/activity-details/client-details/client-activity-details.component.service';
import { ActivityDetailsService } from '@platform/shared/components/modals/activity-details/activity-details.service';
import { Store } from '@ngrx/store';
import { FileUrlResolveService } from '@platform/shared/services/file-url-resolve/file-url-resolve.service';

describe('ClientActivityDetailsComponentService', () => {
  let service: ClientActivityDetailsComponentService;
  let store: Store<any>;
  let activitiesService: ActivitiesService;
  let activityDetailsService: ActivityDetailsService;

  const loggerService: LoggerService = Deceiver(LoggerService, {
    warn: jest.fn(),
  });

  const date = new Date('2019-02-12T10:00:35.039Z');
  const getClientActivityRoute: GetDetailedClientActivity = {
    id: 'activityId',
    accountId: 'accountId',
    activityType: GetDetailedClientActivity.ActivityTypeEnum.SUE,
    sue: {
      serviceUsageEventId: 'serviceUsageEventId',
      ratelCallId: 'ratelCallId',
      ratelRoomId: 'ratelRoomId',
      answeredAt: date,
      ratePerMinute: {
        value: 12,
        currency: 'PLN',
      },
      amount: {
        value: 34,
        currency: 'PLN',
      },
      callDuration: 44,
    },
    recommendedTags: [
      {
        id: 'tagId',
        name: 'goraceKonsultacjeOnlineTylkoDlaCiebie',
        status: GetTag.StatusEnum.ACCEPTED,
      },
      {
        id: 'tagId',
        name: 'RelaksujacyRelaks',
        status: GetTag.StatusEnum.ACCEPTED,
      },
    ],
    details: {
      expertAvatar: 'expertAvatar',
      expertName: 'Lolita',
      serviceName: 'HotRelax',
      amount: {
        value: 22,
        currency: 'PLN',
      },
    },
    initializedAt: date,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
      providers: [
        ClientActivityDetailsComponentService,
        {
          provide: ActivitiesService,
          useValue: Deceiver(ActivitiesService),
        },
        {
          provide: ActivityDetailsService,
          useValue: Deceiver(ActivityDetailsService),
        },
        {
          provide: FileUrlResolveService,
          useValue: Deceiver(FileUrlResolveService, {
            getFilePreviewDownloadUrl: jest.fn(token => `preview/${token}`),
          }),
        },
        provideMockFactoryLogger(loggerService),
      ],
    });
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    service = TestBed.get(ClientActivityDetailsComponentService);
    activitiesService = TestBed.get(ActivitiesService);
    activityDetailsService = TestBed.get(ActivityDetailsService);
    (loggerService.warn as jest.Mock).mockClear();
  });

  it('should get activity details and mark important activity as viewed', () => {
    const expectedResponse: IClientActivityDetails = {
      activityDetails: {
        serviceName: 'HotRelax',
        clientAvatarUrl: '',
        expertAvatarUrl: 'preview/expertAvatar',
        sueId: 'serviceUsageEventId',
        answeredAt: date,
        callDuration: 44,
        servicePrice: {
          value: 12,
          currency: 'PLN',
        },
        recommendedTags: 'goraceKonsultacjeOnlineTylkoDlaCiebie, RelaksujacyRelaks',
        isSueExpert: false,
        expertName: 'Lolita',
        financialOperation: {
          value: 34,
          currency: 'PLN',
        },
        rate: undefined,
        comment: undefined,
        ratelRoomId: 'ratelRoomId',
      },
      chatHistory: [],
    };

    activitiesService.getClientActivityRoute = jest.fn().mockReturnValue(cold('-(a|)', { a: getClientActivityRoute }));
    activitiesService.putUnimportantClientActivityRoute = jest.fn().mockReturnValue(cold('-(a|)', { a: undefined }));
    activityDetailsService.getChatHistory = jest.fn().mockReturnValue(cold('--(b|)', { b: [] }));

    const expected = cold('---(c|)', { c: expectedResponse });

    expect(service.getActivityDetails('someId', true)).toBeObservable(expected);
  });

  it('should log warn when mark important activity as viewed fails', () => {
    activitiesService.getClientActivityRoute = jest.fn().mockReturnValue(cold('-(a|)', { a: getClientActivityRoute }));
    activitiesService.putUnimportantClientActivityRoute = jest.fn().mockReturnValue(cold('-#', {}, 'someError'));
    activityDetailsService.getChatHistory = jest.fn().mockReturnValue(cold('--(b|)', { b: [] }));

    const expected = cold('--#', {}, 'someError');

    expect(service.getActivityDetails('someId', true)).toBeObservable(expected);
    expect(loggerService.warn).toHaveBeenCalledWith('Error when try to mark activity as unimportant', 'someError');
  });

  it('should return empty array chat history if there is no ratel room id', () => {
    const response: GetDetailedClientActivity = {
      id: 'activityId',
      accountId: 'accountId',
      activityType: GetDetailedClientActivity.ActivityTypeEnum.SUE,
      sue: {
        serviceUsageEventId: 'serviceUsageEventId',
        ratelCallId: 'ratelCallId',
        answeredAt: date,
        ratePerMinute: {
          value: 12,
          currency: 'PLN',
        },
        amount: {
          value: 34,
          currency: 'PLN',
        },
        callDuration: 44,
      },
      recommendedTags: [
        {
          id: 'tagId',
          name: 'goraceKonsultacjeOnlineTylkoDlaCiebie',
          status: GetTag.StatusEnum.ACCEPTED,
        },
        {
          id: 'tagId',
          name: 'RelaksujacyRelaks',
          status: GetTag.StatusEnum.ACCEPTED,
        },
      ],
      details: {
        expertAvatar: 'expertAvatar',
        expertName: 'Lolita',
        serviceName: 'HotRelax',
        amount: {
          value: 22,
          currency: 'PLN',
        },
      },
      initializedAt: date,
    };

    const expectedResponse: IClientActivityDetails = {
      activityDetails: {
        serviceName: 'HotRelax',
        clientAvatarUrl: '',
        expertAvatarUrl: 'preview/expertAvatar',
        sueId: 'serviceUsageEventId',
        answeredAt: date,
        callDuration: 44,
        servicePrice: {
          value: 12,
          currency: 'PLN',
        },
        recommendedTags: 'goraceKonsultacjeOnlineTylkoDlaCiebie, RelaksujacyRelaks',
        isSueExpert: false,
        expertName: 'Lolita',
        financialOperation: {
          value: 34,
          currency: 'PLN',
        },
        rate: undefined,
        comment: undefined,
      },
      chatHistory: [],
    };
    activitiesService.getClientActivityRoute = jest.fn().mockReturnValue(cold('-(a|)', { a: response }));
    activitiesService.putUnimportantClientActivityRoute = jest.fn().mockReturnValue(cold('-(a|)', { a: undefined }));

    const expected = cold('--(c|)', { c: expectedResponse });

    expect(service.getActivityDetails('someId', true)).toBeObservable(expected);
  });

  it('should log warn when get activity details fails', () => {
    activitiesService.getClientActivityRoute = jest.fn().mockReturnValue(cold('-#', {}, 'someError'));
    const expected = cold('-#', {}, 'someError');

    expect(service.getActivityDetails('someId', false)).toBeObservable(expected);
    expect(loggerService.warn).toHaveBeenCalledWith('error when try to get client activity details ', 'someError');
  });

  it('should get user avatar from store', () => {
    dispatchLoggedUser(store, { account: { details: { avatar: 'someAvatar' } } });
    const expected = cold('(a|)', { a: 'preview/someAvatar' });
    expect(service.getUserAvatarUrl()).toBeObservable(expected);
  });
});
