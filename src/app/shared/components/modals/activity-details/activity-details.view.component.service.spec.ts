// tslint:disable:max-file-line-count
import { ActivityDetailsViewComponentService } from './activity-details.view.component.service';
import { ActivitiesService, ViewsService } from '@anymind-ng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { provideMockFactoryLogger } from '../../../../../testing/testing';
import { TestBed } from '@angular/core/testing';
import { Deceiver } from 'deceiver-core';
import { GetTag } from 'profitelo-api-ng/model/GetTag';
import { cold } from 'jasmine-marbles';
import { CommunicatorService, LoggerService } from '@anymind-ng/core';
import { of, Observable } from 'rxjs';
import { FileUrlResolveService } from '@platform/shared/services/file-url-resolve/file-url-resolve.service';

describe('ActivityDetailsViewComponentService', () => {
  let service: ActivityDetailsViewComponentService;

  const loggerService: LoggerService = Deceiver(LoggerService, {
    warn: jasmine.createSpy('warn'),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActivityDetailsViewComponentService,
        {
          provide: ViewsService,
          useValue: Deceiver(ViewsService),
        },
        {
          provide: ActivitiesService,
          useValue: Deceiver(ActivitiesService),
        },
        {
          provide: Router,
          useValue: Deceiver(Router),
        },
        {
          provide: ActivatedRoute,
          useValue: Deceiver(ActivatedRoute),
        },
        {
          provide: CommunicatorService,
          useValue: Deceiver(CommunicatorService),
        },
        {
          provide: FileUrlResolveService,
          useValue: Deceiver(FileUrlResolveService, {
            getFileDownloadUrl: (token: string): string =>
              token ? `http://www.anymind.com/files/${token}/download` : '',
          }),
        },
        provideMockFactoryLogger(loggerService),
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(ActivityDetailsViewComponentService);
    (loggerService.warn as jasmine.Spy).calls.reset();
  });

  it('should activity details with client avatar and expert avatar', () => {
    const viewsService = TestBed.get(ViewsService);
    const mockSueId = 'id123';
    const answeredAtDate = new Date();
    const response = {
      isRecommended: true,
      isRecommendable: true,
      recommendedTags: [
        {
          id: 'id',
          name: 'superTag',
          status: GetTag.StatusEnum.ACCEPTED,
        },
      ],
      comment: {
        commentId: 'commentId',
        content: 'Arturek jest super',
        answer: {
          content: 'Potwierdzam!',
          createdAt: new Date(),
        },
        createdAt: new Date(),
      },
      clientDetails: {
        clientId: 'clientId',
        nickname: 'MalyRozbojnik123',
        avatar: 'clientAvatar',
      },
      service: {
        id: 'serviceId',
        ownerId: 'ownerId',
        name: 'superService',
        description: 'the best service',
        price: {
          amount: 123,
          currency: 'PLN',
        },
        language: 'PL',
        isSuspended: false,
        isFreelance: false,
        createdAt: new Date(),
      },
      serviceOwnerProfile: {
        id: 'serviceOwnerProfileId',
        isActive: true,
      },
      expertProfile: {
        id: 'expertProfileId',
        isActive: true,
        expertDetails: {
          name: 'Arturek',
          avatar: 'expertAvatar',
          description: 'jestem super',
          links: [''],
        },
      },
      serviceUsageDetails: {
        serviceUsageEventId: 'serviceUsageEventId',
        ratelCallId: 'ratelCallId',
        ratelRoomId: 'ratelRoomId',
        answeredAt: answeredAtDate,
        ratePerMinute: {
          amount: 123,
          currency: 'PLN',
        },
        financialOperation: {
          amount: 234,
          currency: 'PLN',
        },
        callDuration: 22,
      },
    };
    const expectedValue = {
      sueId: mockSueId,
      serviceName: 'superService',
      clientName: 'MalyRozbojnik123',
      clientAvatarUrl: 'http://www.anymind.com/files/clientAvatar/download',
      expertAvatarUrl: 'http://www.anymind.com/files/expertAvatar/download',
      answeredAt: answeredAtDate,
      callDuration: 22,
      servicePrice: {
        amount: 123,
        currency: 'PLN',
      },
      financialOperation: {
        amount: 234,
        currency: 'PLN',
      },
      isRecommended: true,
    };
    const expectedResult = cold('-(a|)', { a: expectedValue });
    const getCallDetails = cold('-(a|)', { a: response });

    viewsService.getDashboardCallDetailsRoute = jasmine
      .createSpy('getDashboardCallDetailsRoute')
      .and.returnValue(getCallDetails);
    expect(service.getCallDetails(mockSueId)).toBeObservable(expectedResult);
  });

  it('should activity details without client and expert avatar', () => {
    const viewsService = TestBed.get(ViewsService);
    const mockSueId = 'id123';
    const answeredAtDate = new Date();
    const response = {
      isRecommended: true,
      isRecommendable: true,
      recommendedTags: [
        {
          id: 'id',
          name: 'superTag',
          status: GetTag.StatusEnum.ACCEPTED,
        },
      ],
      comment: {
        commentId: 'commentId',
        content: 'Arturek jest super',
        answer: {
          content: 'Potiwerdzam!',
          createdAt: new Date(),
        },
        createdAt: new Date(),
      },
      clientDetails: {
        clientId: 'clientId',
        nickname: 'MalyRozbojnik123',
      },
      service: {
        id: 'serviceId',
        ownerId: 'ownerId',
        name: 'superService',
        description: 'the best service',
        price: {
          amount: 123,
          currency: 'PLN',
        },
        language: 'PL',
        isSuspended: false,
        isFreelance: false,
        createdAt: new Date(),
      },
      serviceOwnerProfile: {
        id: 'serviceOwnerProfileId',
        isActive: true,
      },
      expertProfile: {
        id: 'expertProfileId',
        isActive: true,
      },
      serviceUsageDetails: {
        serviceUsageEventId: 'serviceUsageEventId',
        ratelCallId: 'ratelCallId',
        ratelRoomId: 'ratelRoomId',
        answeredAt: answeredAtDate,
        ratePerMinute: {
          amount: 123,
          currency: 'PLN',
        },
        financialOperation: {
          amount: 234,
          currency: 'PLN',
        },
        callDuration: 22,
      },
    };
    const expectedValue = {
      sueId: mockSueId,
      serviceName: 'superService',
      clientName: 'MalyRozbojnik123',
      clientAvatarUrl: '',
      expertAvatarUrl: '',
      answeredAt: answeredAtDate,
      callDuration: 22,
      servicePrice: {
        amount: 123,
        currency: 'PLN',
      },
      financialOperation: {
        amount: 234,
        currency: 'PLN',
      },
      isRecommended: true,
    };
    const expectedResult = cold('-(a|)', { a: expectedValue });
    const getCallDetails = cold('-(a|)', { a: response });

    viewsService.getDashboardCallDetailsRoute = jasmine
      .createSpy('getDashboardCallDetailsRoute')
      .and.returnValue(getCallDetails);
    expect(service.getCallDetails(mockSueId)).toBeObservable(expectedResult);
  });

  it('should log warn error when mark activity as unimportant failed', () => {
    const activitiesService = TestBed.get(ActivitiesService);
    const putUnimportantActivity = cold('-#', {}, 'someError');
    const mockActivityId = 'mockActivityId';
    const expected = cold('-|');

    activitiesService.putUnimportantProfileActivityRoute = jasmine
      .createSpy('putUnimportantProfileActivityRoute')
      .and.returnValue(putUnimportantActivity);

    expect(service.markActivityAsUnimportant(mockActivityId)).toBeObservable(expected);
    expect(loggerService.warn).toHaveBeenCalledWith('Error when try to mark activity as unimportant', 'someError');
  });

  it('should get chat history', () => {
    const communicatorService = TestBed.get(CommunicatorService);
    const mockRatelRoomId = 'mockRatelRoomId';
    const messages = {
      items: [
        {
          tag: 'room_custom_message_sent',
          authorId: 'Arturek',
        },
        {
          tag: 'room_custom_message_sent',
          authorId: 'Arturek',
        },
        {
          tag: 'room_custom_message_sent',
          authorId: 'Macius',
        },
      ],
    };
    const connectObj = {
      session: {
        chat: {
          getRoom: (_ratelRoomId: string): Observable<any> =>
            of({
              getMessages: (_offset: number, _limit: number): Observable<any> => of(messages),
            }),
        },
      },
    };
    const result = cold('-(a|)', {
      a: [
        [
          {
            tag: 'room_custom_message_sent',
            authorId: 'Arturek',
          },
          {
            tag: 'room_custom_message_sent',
            authorId: 'Arturek',
          },
        ],
        [
          {
            tag: 'room_custom_message_sent',
            authorId: 'Macius',
          },
        ],
      ],
    });

    communicatorService.connectionEstablishedEvent$ = cold('-a|', { a: connectObj });
    expect(service.getChatHistory(mockRatelRoomId)).toBeObservable(result);
  });

  it('should log warn when get chat history failed', () => {
    const communicatorService = TestBed.get(CommunicatorService);
    const mockRatelRoomId = 'mockRatelRoomId';
    const expected = cold('-|');

    communicatorService.connectionEstablishedEvent$ = cold('-#', {}, 'someError');
    expect(service.getChatHistory(mockRatelRoomId)).toBeObservable(expected);
    expect(loggerService.warn).toHaveBeenCalledWith('error when try to get chat history', 'someError');
  });
});
