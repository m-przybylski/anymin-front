// tslint:disable:max-file-line-count
import {
  ActivitiesService,
  GetCallDetails,
  GetClientComplaint,
  GetTag,
  ServiceUsageEventService,
  ViewsService,
} from '@anymind-ng/api';
import { dispatchLoggedUser, importStore, provideMockFactoryLogger } from 'testing/testing';
import { TestBed } from '@angular/core/testing';
import { Deceiver } from 'deceiver-core';
import { cold } from 'jasmine-marbles';
import { LoggerService } from '@anymind-ng/core';
import { ActivityDetailsService } from '@platform/shared/components/modals/activity-details/activity-details.service';
import { Store } from '@ngrx/store';
import {
  ExpertCompanyActivityDetailsComponentService,
  IExpertCompanyActivityDetails,
} from '@platform/shared/components/modals/activity-details/expert-company-details/expert-company-activity-details.component.service';
import { FileUrlResolveService } from '@platform/shared/services/file-url-resolve/file-url-resolve.service';
import { BackendErrors } from '@platform/shared/models/backend-error/backend-error';

describe('ExpertCompanyActivityDetailsComponentService', () => {
  let service: ExpertCompanyActivityDetailsComponentService;
  let store: Store<any>;
  let viewsService: ViewsService;
  let activitiesService: ActivitiesService;
  let activityDetailsService: ActivityDetailsService;
  let serviceUsageEventService: ServiceUsageEventService;

  const loggerService: LoggerService = Deceiver(LoggerService, {
    warn: jest.fn(),
  });
  const date = new Date('2019-02-12T10:00:35.039Z');
  const getCallDetails: GetCallDetails = {
    isRecommended: true,
    rate: GetCallDetails.RateEnum.POSITIVE,
    isRecommendable: true,
    recommendedTags: [
      {
        id: 'tagId',
        name: 'budowanieDachu',
        status: GetTag.StatusEnum.ACCEPTED,
      },
      {
        id: 'tagId',
        name: 'developerkaNaPropsie',
        status: GetTag.StatusEnum.ACCEPTED,
      },
    ],
    comment: {
      commentId: 'commentId',
      expertId: 'expertId',
      content: 'super extra cool consultation',
      createdAt: date,
    },
    clientDetails: {
      clientId: 'clientId',
      nickname: 'Arturek',
      avatar: 'clientAvatar',
    },
    service: {
      id: 'serviceId',
      ownerId: 'ownerId',
      name: 'Deweloper - Szybko Tanio Profesjonalnie',
      description: 'some description',
      price: {
        value: 12,
        currency: 'PLN',
      },
      language: 'PL',
      isSuspended: false,
      isFreelance: false,
      createdAt: date,
    },
    serviceOwnerProfile: {
      id: 'serviceOwnerProfileId',
      isActive: true,
    },
    expertProfile: {
      id: 'expertProfileId',
      isActive: true,
      expertDetails: {
        name: 'SuperMajster',
        avatar: 'expertAvatar',
        description: 'bedzie pan zadowolony',
        links: [],
      },
    },
    serviceUsageDetails: {
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
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
      providers: [
        ExpertCompanyActivityDetailsComponentService,
        {
          provide: ViewsService,
          useValue: Deceiver(ViewsService),
        },
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
        provideMockFactoryLogger(loggerService),
      ],
    });
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    service = TestBed.get(ExpertCompanyActivityDetailsComponentService);
    viewsService = TestBed.get(ViewsService);
    activitiesService = TestBed.get(ActivitiesService);
    activityDetailsService = TestBed.get(ActivityDetailsService);
    serviceUsageEventService = TestBed.get(ServiceUsageEventService);
    (loggerService.warn as jest.Mock).mockClear();
  });

  it('should get call details, client complaint and mark important activity as viewed', () => {
    const getClientComplaint: GetClientComplaint = {
      id: 'clientComplaintId',
      expertId: 'expertId',
      clientId: 'clientId',
      sueId: 'sueId',
      message: 'i do not like it',
      complaintType: GetClientComplaint.ComplaintTypeEnum.INCOMPETENTEXPERT,
      status: GetClientComplaint.StatusEnum.NEW,
    };
    const expectedResponse: IExpertCompanyActivityDetails = {
      activityDetails: {
        sueId: 'sueId',
        serviceName: 'Deweloper - Szybko Tanio Profesjonalnie',
        clientName: 'Arturek',
        clientAvatarUrl: 'preview/clientAvatar',
        expertAvatarUrl: 'preview/expertAvatar',
        answeredAt: date,
        callDuration: 44,
        servicePrice: {
          value: 12,
          currency: 'PLN',
        },
        recommendedTags: 'budowanieDachu, developerkaNaPropsie',
        isSueExpert: false,
        expertName: 'SuperMajster',
        financialOperation: {
          value: 34,
          currency: 'PLN',
        },
        rate: GetCallDetails.RateEnum.POSITIVE,
        comment: {
          commentId: 'commentId',
          content: 'super extra cool consultation',
          expertId: 'expertProfileId',
          sueId: 'serviceUsageEventId',
          callDurationInSeconds: 44,
          clientDetails: {
            clientId: 'clientId',
            nickname: 'Arturek',
            avatar: 'clientAvatar',
          },
          createdAt: date,
        },
      },
      complaint: getClientComplaint,
      chatHistory: [],
    };

    dispatchLoggedUser(store, { account: { id: 'accId' } });
    viewsService.getDashboardCallDetailsRoute = jest.fn().mockReturnValue(cold('-(a|)', { a: getCallDetails }));
    serviceUsageEventService.getClientComplaintForExpertRoute = jest
      .fn()
      .mockReturnValue(cold('-(b|)', { b: getClientComplaint }));
    activitiesService.putUnimportantProfileActivityRoute = jest.fn().mockReturnValue(cold('-(a|)', { a: undefined }));
    activityDetailsService.getChatHistory = jest.fn().mockReturnValue(cold('--(b|)', { b: [] }));

    const expected = cold('---(c|)', { c: expectedResponse });

    expect(
      service.getCallDetails({
        sueId: 'sueId',
        activityId: 'activityId',
        isImportantActivity: true,
        isCompanyActivity: false,
        ratelRoomId: 'ratelRoomId',
      }),
    ).toBeObservable(expected);
  });

  it(
    'should return empty array chat history when there is no ratel room id' +
      'and undefined as client complaint when there is no complaint',
    () => {
      const expectedResponse: IExpertCompanyActivityDetails = {
        activityDetails: {
          sueId: 'sueId',
          serviceName: 'Deweloper - Szybko Tanio Profesjonalnie',
          clientName: 'Arturek',
          clientAvatarUrl: 'preview/clientAvatar',
          expertAvatarUrl: 'preview/expertAvatar',
          answeredAt: date,
          callDuration: 44,
          servicePrice: {
            value: 12,
            currency: 'PLN',
          },
          recommendedTags: 'budowanieDachu, developerkaNaPropsie',
          isSueExpert: false,
          expertName: 'SuperMajster',
          financialOperation: {
            value: 34,
            currency: 'PLN',
          },
          rate: GetCallDetails.RateEnum.POSITIVE,
          comment: {
            commentId: 'commentId',
            content: 'super extra cool consultation',
            expertId: 'expertProfileId',
            sueId: 'serviceUsageEventId',
            callDurationInSeconds: 44,
            clientDetails: {
              clientId: 'clientId',
              nickname: 'Arturek',
              avatar: 'clientAvatar',
            },
            createdAt: date,
          },
        },
        chatHistory: [],
      };

      dispatchLoggedUser(store, { account: { id: 'accId' } });
      viewsService.getDashboardCallDetailsRoute = jest.fn().mockReturnValue(cold('-(a|)', { a: getCallDetails }));
      serviceUsageEventService.getClientComplaintForExpertRoute = jest.fn().mockReturnValue(
        cold(
          '-#',
          {},
          {
            error: {
              code: BackendErrors.CannotGetClientComplaint,
              message: 'error',
            },
          },
        ),
      );
      activitiesService.putUnimportantProfileActivityRoute = jest.fn().mockReturnValue(cold('-(a|)', { a: undefined }));

      const expected = cold('--(c|)', { c: expectedResponse });

      expect(
        service.getCallDetails({
          sueId: 'sueId',
          activityId: 'activityId',
          isImportantActivity: true,
          isCompanyActivity: false,
        }),
      ).toBeObservable(expected);
    },
  );

  it('should log warn when mark important activity fails', () => {
    dispatchLoggedUser(store, { account: { id: 'accId' } });
    viewsService.getDashboardCallDetailsRoute = jest.fn().mockReturnValue(cold('-(a|)', { a: getCallDetails }));
    serviceUsageEventService.getClientComplaintForExpertRoute = jest.fn().mockReturnValue(cold('-(b|)', { b: {} }));
    activitiesService.putUnimportantProfileActivityRoute = jest.fn().mockReturnValue(cold('-#', {}, 'someError'));

    const expected = cold('--#', {}, 'someError');
    expect(
      service.getCallDetails({
        sueId: 'sueId',
        activityId: 'activityId',
        isImportantActivity: true,
        isCompanyActivity: true,
      }),
    ).toBeObservable(expected);
    expect(loggerService.warn).toHaveBeenCalledWith('Error when try to mark activity as unimportant', 'someError');
  });

  it('should log warn when get client complaints fails', () => {
    dispatchLoggedUser(store, { account: { id: 'accId' } });
    viewsService.getDashboardCallDetailsRoute = jest.fn().mockReturnValue(cold('-(a|)', { a: getCallDetails }));
    serviceUsageEventService.getClientComplaintForExpertRoute = jest.fn().mockReturnValue(cold('-#', {}, 'someError'));

    const expected = cold('-#', {}, 'someError');
    expect(
      service.getCallDetails({
        sueId: 'sueId',
        activityId: 'activityId',
        isImportantActivity: true,
        isCompanyActivity: true,
      }),
    ).toBeObservable(expected);
    expect(loggerService.warn).toHaveBeenCalledWith('error when try to get call activity details ', 'someError');
  });

  it('should log warn when get call details fails', () => {
    dispatchLoggedUser(store, { account: { id: 'accId' } });
    serviceUsageEventService.getClientComplaintForExpertRoute = jest.fn().mockReturnValue(cold('-#', {}, 'err'));
    viewsService.getDashboardCallDetailsRoute = jest.fn().mockReturnValue(cold('-#', {}, 'someError'));
    const expected = cold('-#', {}, 'someError');

    expect(
      service.getCallDetails({
        sueId: 'sueId',
        activityId: 'activityId',
        isImportantActivity: true,
        isCompanyActivity: true,
        ratelRoomId: 'ratelRoomId',
      }),
    ).toBeObservable(expected);
    expect(loggerService.warn).toHaveBeenCalledWith('error when try to get call activity details ', 'someError');
  });
});
