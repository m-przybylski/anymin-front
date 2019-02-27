import { Injectable } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { Config } from '../../config';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

export interface ISeoTags {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  defaultSecureImg?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(private meta: Meta, private router: Router, private translate: TranslateService) {}

  public init(): void {
    return this.initMetaTags(this.getMetaDefinitions({}));
  }

  public updateTags(seoTags: ISeoTags): void {
    return this.getMetaDefinitions(seoTags).forEach(tag => this.meta.updateTag(tag));
  }

  private initMetaTags(tags: ReadonlyArray<MetaDefinition>): void {
    return tags.forEach(tag => this.meta.addTag(tag));
  }

  private getMetaDefinitions(seoTags: ISeoTags): ReadonlyArray<MetaDefinition> {
    const title = seoTags.title || this.translate.instant('META.DEFAULT.TITLE');
    const desc = seoTags.description || this.translate.instant('META.DEFAULT.DESCRIPTION');
    const image = seoTags.image || Config.meta.defaultSecureImg;
    const siteName = seoTags.siteName || Config.meta.defaultName;

    return [
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: Config.meta.twitterId },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: desc },
      { name: 'twitter:image', content: image },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: siteName },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:image', content: image },
      { property: 'og:url', content: this.router.url },
    ];
  }
}
