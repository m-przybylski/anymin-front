import { Injectable } from '@angular/core';
import { UserAgentService } from '@platform/core/services/crawler/user-agent.service';

@Injectable()
export class CrawlerService {
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

  public isCrawlerBot(): boolean {
    const userAgent = this.userAgentService.userAgent.toLowerCase();

    return this.botsUserAgents.map(bot => userAgent.includes(bot)).includes(true);
  }
}
