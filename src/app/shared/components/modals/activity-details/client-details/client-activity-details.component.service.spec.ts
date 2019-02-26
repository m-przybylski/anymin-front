// tslint:disable:max-file-line-count
import { ActivitiesService, GetDetailedClientActivity, GetTag, ServiceUsageEventService } from '@anymind-ng/api';
import { dispatchLoggedUser, importStore, provideMockFactoryLogger } from 'testing/testing';
import { TestBed } from '@angular/core/testing';
import { Deceiver } from 'deceiver-core';
import { cold } from 'jasmine-marbles';
import { Alerts, AlertService, LoggerService } from '@anymind-ng/core';
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
  let serviceUsageEventService: ServiceUsageEventService;
  let alertService: AlertService;

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
    comment: {
      commentId: 'commentId',
      expertId: 'expertId',
      content: 'super consultation - hot as fire',
      createdAt: date,
    },
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
          provide: ServiceUsageEventService,
          useValue: Deceiver(ServiceUsageEventService),
        },
        {
          provide: FileUrlResolveService,
          useValue: Deceiver(FileUrlResolveService, {
            getFilePreviewDownloadUrl: jest.fn(token => `preview/${token}`),
          }),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, {
            pushSuccessAlert: jest.fn(),
            pushDangerAlert: jest.fn(),
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
    serviceUsageEventService = TestBed.get(ServiceUsageEventService);
    alertService = TestBed.get(AlertService);
    (loggerService.warn as jest.Mock).mockClear();
  });

  it('should get activity details and mark important activity as viewed', () => {
    const expectedResponse: IClientActivityDetails = {
      activityDetails: {
        serviceName: 'HotRelax',
        clientAvatarUrl: 'preview/clientAvatar',
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
        comment: {
          commentId: 'commentId',
          content: 'super consultation - hot as fire',
          expertId: 'expertId',
          sueId: 'serviceUsageEventId',
          callDurationInSeconds: 44,
          clientDetails: {
            clientId: 'clientId',
            avatar: 'clientAvatar',
          },
          createdAt: date,
        },
        ratelRoomId: 'ratelRoomId',
      },
      chatHistory: [],
    };

    dispatchLoggedUser(store, { account: { details: { clientId: 'clientId', avatar: 'clientAvatar' } } });
    activitiesService.getClientActivityRoute = jest.fn().mockReturnValue(cold('-(a|)', { a: getClientActivityRoute }));
    activitiesService.putUnimportantClientActivityRoute = jest.fn().mockReturnValue(cold('-(a|)', { a: undefined }));
    activityDetailsService.getChatHistory = jest.fn().mockReturnValue(cold('--(b|)', { b: [] }));

    const expected = cold('---(c|)', { c: expectedResponse });

    expect(service.getActivityDetails('someId', true)).toBeObservable(expected);
  });

  it('should log warn when mark important activity as viewed fails', () => {
    dispatchLoggedUser(store, { account: { details: { clientId: 'clientId', avatar: 'clientAvatar' } } });
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
        clientAvatarUrl: 'preview/clientAvatar',
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
    dispatchLoggedUser(store, { account: { details: { clientId: 'clientId', avatar: 'clientAvatar' } } });
    activitiesService.getClientActivityRoute = jest.fn().mockReturnValue(cold('-(a|)', { a: response }));
    activitiesService.putUnimportantClientActivityRoute = jest.fn().mockReturnValue(cold('-(a|)', { a: undefined }));
    activityDetailsService.getChatHistory = jest.fn();

    const expected = cold('--(c|)', { c: expectedResponse });

    expect(service.getActivityDetails('someId', true)).toBeObservable(expected);
    expect(activityDetailsService.getChatHistory).not.toHaveBeenCalled();
  });

  it('should log warn when get activity details fails', () => {
    dispatchLoggedUser(store, { account: { details: { clientId: 'clientId', avatar: 'clientAvatar' } } });
    activitiesService.getClientActivityRoute = jest.fn().mockReturnValue(cold('-#', {}, 'someError'));
    const expected = cold('-#', {}, 'someError');

    expect(service.getActivityDetails('someId', false)).toBeObservable(expected);
    expect(loggerService.warn).toHaveBeenCalledWith('error when try to get client activity details ', 'someError');
  });

  it('should show success alert when report complaint succeed', () => {
    serviceUsageEventService.postClientComplaintRoute = jest.fn().mockReturnValue(cold('-(a|)', { a: undefined }));
    const expected = cold('-(a|)', { a: undefined });

    expect(service.reportComplaint('sueID', { message: '', complaintType: 'OTHER' })).toBeObservable(expected);
    expect(alertService.pushSuccessAlert).toHaveBeenCalledWith(
      'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.CLIENT_REPORT.SUCCESS',
    );
  });

  it('should show danger alert, log warn when report complaint fails', () => {
    serviceUsageEventService.postClientComplaintRoute = jest.fn().mockReturnValue(cold('-#', {}, 'someError'));
    const expected = cold('-|', {});

    expect(service.reportComplaint('sueID', { message: '', complaintType: 'OTHER' })).toBeObservable(expected);
    expect(alertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
    expect(loggerService.warn).toHaveBeenCalledWith('Error when try to report complaint', 'someError');
  });
});
