import { TestBed } from '@angular/core/testing';
import { BrowserUtils } from 'machoke-sdk';
import { UnsupportedService } from '@platform/core/services/unsupported/unsupported.service';
import { CrawlerService } from '@platform/core/services/crawler/crawler.service';
import { UserAgentService } from '@platform/core/services/crawler/user-agent.service';

describe('UnsupportedService', () => {
  let service: UnsupportedService;
  let crawlerService: CrawlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnsupportedService, CrawlerService, UserAgentService],
    });

    crawlerService = TestBed.get(CrawlerService);
    service = TestBed.get(UnsupportedService);
  });

  it('return supported if browser is supported', () => {
    jest.spyOn(BrowserUtils, 'isBrowserSupported').mockReturnValue(true);
    const crawlerBotSpy = jest.spyOn(crawlerService, 'isCrawlerBot');

    expect(service.isSupported()).toBeTruthy();
    expect(BrowserUtils.isBrowserSupported).toHaveBeenCalled();
    expect(crawlerBotSpy).not.toHaveBeenCalled();
  });

  it('return unsupported if browser is unsupported and useragent is not a bot', () => {
    jest.spyOn(BrowserUtils, 'isBrowserSupported').mockReturnValue(false);
    const crawlerBotSpy = jest.spyOn(crawlerService, 'isCrawlerBot').mockReturnValue(false);

    expect(service.isSupported()).toBeFalsy();
    expect(BrowserUtils.isBrowserSupported).toHaveBeenCalled();
    expect(crawlerBotSpy).toHaveBeenCalled();
  });

  it('return supported if browser is unsupported and useragent is a bot', () => {
    jest.spyOn(BrowserUtils, 'isBrowserSupported').mockReturnValue(false);
    const crawlerBotSpy = jest.spyOn(crawlerService, 'isCrawlerBot').mockReturnValue(true);

    expect(service.isSupported()).toBeTruthy();
    expect(BrowserUtils.isBrowserSupported).toHaveBeenCalled();
    expect(crawlerBotSpy).toHaveBeenCalled();
  });
});
