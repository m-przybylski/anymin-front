import { TestBed } from '@angular/core/testing';
import { UserAgentService } from '@platform/core/services/crawler/user-agent.service';
import { CrawlerService } from '@platform/core/services/crawler/crawler.service';

describe('CrawlerService', () => {
  let service: CrawlerService;
  let userAgentService: UserAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrawlerService, UserAgentService],
    });

    userAgentService = TestBed.get(UserAgentService);
    service = TestBed.get(CrawlerService);
  });

  it('return false if useragent is not a bot', () => {
    const userAgentSpy = jest.spyOn(userAgentService, 'userAgent', 'get').mockReturnValue('AppleWebkit');

    expect(service.isCrawlerBot()).toBeFalsy();
    expect(userAgentSpy).toHaveBeenCalled();
  });

  it('return true if useragent is a bot', () => {
    const userAgentSpy = jest.spyOn(userAgentService, 'userAgent', 'get').mockReturnValue('Googlebot');

    expect(service.isCrawlerBot()).toBeTruthy();
    expect(userAgentSpy).toHaveBeenCalled();
  });
});
