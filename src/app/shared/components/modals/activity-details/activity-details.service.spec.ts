import { provideMockFactoryLogger } from 'testing/testing';
import { TestBed } from '@angular/core/testing';
import { Deceiver } from 'deceiver-core';
import { cold } from 'jasmine-marbles';
import { LoggerService } from '@anymind-ng/core';
import { of, Observable } from 'rxjs';
import { ActivityDetailsService } from './activity-details.service';
import { CallSessionService } from '@platform/core/services/call/call-session.service';

describe('ActivityDetailsService', () => {
  let service: ActivityDetailsService;

  const loggerService: LoggerService = Deceiver(LoggerService, {
    warn: jest.fn(),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActivityDetailsService,
        {
          provide: CallSessionService,
          useValue: Deceiver(CallSessionService),
        },
        provideMockFactoryLogger(loggerService),
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(ActivityDetailsService);
    (loggerService.warn as jest.Mock).mockClear();
  });

  it('should get chat history', () => {
    const callSessionService = TestBed.get(CallSessionService);
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
    const result = cold('(a|)', {
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

    callSessionService.getCallSession = jest.fn().mockReturnValue({
      machoke: {
        getRoom: (_ratelRoomId: string): Observable<any> =>
          of({
            getMessages: (_offset: number, _limit: number): Observable<any> => of(messages),
          }),
      },
    });
    expect(service.getChatHistory(mockRatelRoomId)).toBeObservable(result);
  });

  it('should return empty array if there is no machoke session', () => {
    const callSessionService = TestBed.get(CallSessionService);
    const mockRatelRoomId = 'mockRatelRoomId';
    const expected = cold('(a|)', { a: [] });

    callSessionService.getCallSession = jest.fn().mockReturnValue(undefined);
    expect(service.getChatHistory(mockRatelRoomId)).toBeObservable(expected);
  });

  it('should log warn when get chat history failed', () => {
    const callSessionService = TestBed.get(CallSessionService);
    const mockRatelRoomId = 'mockRatelRoomId';
    const expected = cold('-#', {}, 'someError');

    callSessionService.getCallSession = jest.fn().mockReturnValue({
      machoke: {
        getRoom: jest.fn().mockReturnValue(cold('-#', {}, 'someError')),
      },
    });
    expect(service.getChatHistory(mockRatelRoomId)).toBeObservable(expected);
    expect(loggerService.warn).toHaveBeenCalledWith('error when try to get chat history', 'someError');
  });
});
