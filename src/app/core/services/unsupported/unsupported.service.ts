import { Injectable } from '@angular/core';
import { BrowserUtils } from 'machoke-sdk';
import { CrawlerService } from '@platform/core/services/crawler/crawler.service';

@Injectable()
export class UnsupportedService {
  constructor(private crawlerService: CrawlerService) {}

  public isSupported(): boolean {
    return BrowserUtils.isBrowserSupported() || this.crawlerService.isCrawlerBot();
  }
}
