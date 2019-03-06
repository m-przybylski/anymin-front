import { TestBed } from '@angular/core/testing';
import { BrowserUtils } from 'machoke-sdk';
import { UnsupportedService } from '@platform/core/services/unsupported/unsupported.service';
import { UserAgentService } from '@platform/core/services/unsupported/user-agent.service';

describe('UnsupportedService', () => {
  let service: UnsupportedService;
  let userAgentService: UserAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnsupportedService, UserAgentService],
    });

    userAgentService = TestBed.get(UserAgentService);
    service = TestBed.get(UnsupportedService);
  });

  it('return supported if browser is supported', () => {
    jest.spyOn(BrowserUtils, 'isBrowserSupported').mockReturnValue(true);
    const userAgentSpy = jest.spyOn(userAgentService, 'userAgent', 'get');

    expect(service.isSupported()).toBeTruthy();
    expect(BrowserUtils.isBrowserSupported).toHaveBeenCalled();
    expect(userAgentSpy).not.toHaveBeenCalled();
  });

  it('return unsupported if browser is unsupported and useragent is not a bot', () => {
    jest.spyOn(BrowserUtils, 'isBrowserSupported').mockReturnValue(false);
    const userAgentSpy = jest.spyOn(userAgentService, 'userAgent', 'get').mockReturnValue('AppleWebkit');

    expect(service.isSupported()).toBeFalsy();
    expect(BrowserUtils.isBrowserSupported).toHaveBeenCalled();
    expect(userAgentSpy).toHaveBeenCalled();
  });

  it('return supported if browser is unsupported and useragent is a bot', () => {
    jest.spyOn(BrowserUtils, 'isBrowserSupported').mockReturnValue(false);
    const userAgentSpy = jest.spyOn(userAgentService, 'userAgent', 'get').mockReturnValue('Googlebot');

    expect(service.isSupported()).toBeTruthy();
    expect(BrowserUtils.isBrowserSupported).toHaveBeenCalled();
    expect(userAgentSpy).toHaveBeenCalled();
  });
});
