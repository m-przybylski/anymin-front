import { CallSummaryService } from './call-summary.service';
import { Deceiver } from 'deceiver-core';
import { PostClientComplaint, PostTechnicalProblem, ServiceUsageEventService, ViewsService } from '@anymind-ng/api';
import { LoggerFactory } from '@anymind-ng/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideMockFactoryLogger } from 'testing/testing';
import { cold } from 'jasmine-marbles';
import { NEVER, Subject } from 'rxjs';
import { AnymindWebsocketService } from '@platform/core/services/anymind-websocket/anymind-websocket.service';
import { LongPollingService } from '@platform/core/services/long-polling/long-polling.service';

describe('CallSummaryService', () => {
  let callSummaryService: CallSummaryService;
  let loggerFactory: LoggerFactory;

  const mockedCallSummaryWS = new Subject<string>();

  const anymindWebsocketService = Deceiver(AnymindWebsocketService, { callSummary: mockedCallSummaryWS });

  const serviceUsageEventService = Deceiver(ServiceUsageEventService, {
    postExpertComplaintRoute: jest.fn(),
    postTechnicalProblemRoute: jest.fn(),
    postCommentRoute: jest.fn(),
    postSueRatingRoute: jest.fn(),
    putSueRatingRoute: jest.fn(),
    postClientComplaintRoute: jest.fn(),
  });
  const viewsService = Deceiver(ViewsService, {
    getExpertCallSummaryRoute: jest.fn(),
    getClientCallSummaryRoute: jest.fn(),
  });
  const longPollingService = Deceiver(LongPollingService, { longPollData: jest.fn() });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockFactoryLogger()],
    });
    loggerFactory = TestBed.get(LoggerFactory);

    callSummaryService = new CallSummaryService(
      viewsService,
      serviceUsageEventService,
      longPollingService,
      anymindWebsocketService,
      loggerFactory,
    );
  });

  it('should be created', () => {
    expect(callSummaryService).toBeTruthy();
  });

  it('should get expert call summary data from http request', () => {
    const currentCall = {
      getSueId: (): string => '1234321',
    } as any;

    const result = cold('--(a|)', { a: 'summary' });
    const getExpertCallSummaryRoute = cold('--a--', { a: 'summary' });
    (longPollingService.longPollData as jest.Mock).mockReturnValue(getExpertCallSummaryRoute);

    expect(callSummaryService.getExpertCallSummary(currentCall)).toBeObservable(result);
  });

  it('should get client call summary data from http request', () => {
    const currentCall = {
      getSueId: (): string => '1234321',
    } as any;

    const result = cold('--(a|)', { a: 'summary' });
    const getClientCallSummaryRoute = cold('--a--', { a: 'summary' });
    (longPollingService.longPollData as jest.Mock).mockReturnValue(getClientCallSummaryRoute);

    expect(callSummaryService.getClientCallSummary(currentCall)).toBeObservable(result);
  });

  it('should get expert call summary data from websocket', fakeAsync(() => {
    const currentCall = {
      getSueId: (): string => '1234321',
    } as any;

    (longPollingService.longPollData as jest.Mock).mockReturnValue(NEVER);
    setTimeout(() => mockedCallSummaryWS.next('summary'), Number.parseInt('300'));
    const spy = jest.fn();
    callSummaryService.getExpertCallSummary(currentCall).subscribe(spy);
    tick(Number.parseInt('299'));
    expect(spy).not.toHaveBeenCalled();
    tick(1);
    expect(spy).toHaveBeenCalled();
  }));

  it('should report client', () => {
    const result = cold('-a|', { a: 'client-reported' });
    const postExpertComplaintRoute = cold('-a|', { a: 'client-reported' });
    (serviceUsageEventService.postExpertComplaintRoute as jest.Mock).mockReturnValue(postExpertComplaintRoute);
    expect(callSummaryService.reportClient('123', 'tak')).toBeObservable(result);
  });

  it('should report technical problem', () => {
    const result = cold('-a|', { a: 'tech-problem-reported' });
    const postTechnicalProblemRoute = cold('-a|', { a: 'tech-problem-reported' });
    (serviceUsageEventService.postTechnicalProblemRoute as jest.Mock).mockReturnValue(postTechnicalProblemRoute);
    expect(
      callSummaryService.reportTechnicalProblem('123', PostTechnicalProblem.ProblemTypeEnum.OTHER, 'Opis'),
    ).toBeObservable(result);
  });

  it('should not report technical problem', () => {
    const result = cold('-|', {}, 'error');
    const postTechnicalProblemRoute = cold('-#', {}, 'error');
    (serviceUsageEventService.postTechnicalProblemRoute as jest.Mock).mockReturnValue(postTechnicalProblemRoute);
    expect(
      callSummaryService.reportTechnicalProblem('123', PostTechnicalProblem.ProblemTypeEnum.OTHER, 'Opis'),
    ).toBeObservable(result);
  });

  it('should report client complaint', () => {
    const result = cold('-a|', { a: 'client-complaint' });
    const postClientComplaintRoute = cold('-a|', { a: 'client-complaint' });
    (serviceUsageEventService.postClientComplaintRoute as jest.Mock).mockReturnValue(postClientComplaintRoute);
    expect(
      callSummaryService.clientReportComplaint('123', PostClientComplaint.ComplaintTypeEnum.IMPOLITEEXPERT, ''),
    ).toBeObservable(result);
  });

  it('should not report client complaint', () => {
    const result = cold('-|');
    const postClientComplaintRoute = cold('-#');
    (serviceUsageEventService.postClientComplaintRoute as jest.Mock).mockReturnValue(postClientComplaintRoute);
    expect(
      callSummaryService.clientReportComplaint('123', PostClientComplaint.ComplaintTypeEnum.IMPOLITEEXPERT, ''),
    ).toBeObservable(result);
  });

  it('should comment call', () => {
    const result = cold('-a|', { a: 'comment' });
    const postCommentRoute = cold('-a|', { a: 'comment' });
    (serviceUsageEventService.postCommentRoute as jest.Mock).mockReturnValue(postCommentRoute);
    expect(callSummaryService.commentExpert('123', '')).toBeObservable(result);
  });

  it('should rate expert positive with tags', () => {
    const result = cold('--a|', { a: 'positive' });
    const postSueRatingRoute = cold('-a|', { a: 'positive' });
    (serviceUsageEventService.postSueRatingRoute as jest.Mock).mockReturnValue(postSueRatingRoute);
    (serviceUsageEventService.putSueRatingRoute as jest.Mock).mockReturnValue(postSueRatingRoute);

    expect(callSummaryService.rateExpertPositiveWithTags('123', ['1212'])).toBeObservable(result);
  });

  it('should rate expert positive without tags', () => {
    const result = cold('-a|', { a: 'positive' });
    const postSueRatingRoute = cold('-a|', { a: 'positive' });
    (serviceUsageEventService.postSueRatingRoute as jest.Mock).mockReturnValue(postSueRatingRoute);
    (serviceUsageEventService.putSueRatingRoute as jest.Mock).mockReturnValue(postSueRatingRoute);

    expect(callSummaryService.rateExpertPositiveWithTags('123', [])).toBeObservable(result);
  });

  it('should rate expert negative with comment', () => {
    const result = cold('--a|', { a: 'negative' });
    const postSueRatingRoute = cold('-a|', { a: 'negative' });
    (serviceUsageEventService.postSueRatingRoute as jest.Mock).mockReturnValue(postSueRatingRoute);
    (serviceUsageEventService.postCommentRoute as jest.Mock).mockReturnValue(postSueRatingRoute);
    expect(callSummaryService.rateExpertNegative('123', 'Słabo')).toBeObservable(result);
  });

  it('should rate expert negative without comment', () => {
    const result = cold('-a|', { a: 'negative' });
    const postSueRatingRoute = cold('-a|', { a: 'negative' });
    (serviceUsageEventService.postSueRatingRoute as jest.Mock).mockReturnValue(postSueRatingRoute);
    (serviceUsageEventService.postCommentRoute as jest.Mock).mockReturnValue(postSueRatingRoute);
    expect(callSummaryService.rateExpertNegative('123')).toBeObservable(result);
  });
});
