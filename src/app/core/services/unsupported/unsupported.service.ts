import { Injectable } from '@angular/core';
import { BrowserUtils } from 'machoke-sdk';
import { UserAgentService } from '@platform/core/services/unsupported/user-agent.service';

@Injectable()
export class UnsupportedService {
  private botsUserAgents: ReadonlyArray<string> = [
    'Googlebot',
    'bingbot',
    'yandexbot',
    'duckduckbot',
    'slurp',
    'twitterbot',
    'facebookexternalhit',
    'LinkedInBot',
    'embedly',
    'baidusspider',
    'pinterest',
    'slackbot',
    'vkShare',
    'outbrain',
    'W3C_Validator',
    'Facebot',
    'HeadlessChrome', // Rendertron
  ].map(bot => bot.toLowerCase());

  constructor(private userAgentService: UserAgentService) {}

  public isSupported(): boolean {
    return BrowserUtils.isBrowserSupported() || this.isCrawlerBot();
  }

  private isCrawlerBot(): boolean {
    const userAgent = this.userAgentService.userAgent.toLowerCase();

    return this.botsUserAgents.map(bot => userAgent.includes(bot)).includes(true);
  }
}
