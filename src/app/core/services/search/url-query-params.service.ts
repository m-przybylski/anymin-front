import { Injectable } from '@angular/core';
import { RouterPaths } from '@platform/shared/routes/routes';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IURLQueryParams {
  tags: ReadonlyArray<string>;
  query: string;
  showOnlyAvailable: boolean | undefined;
}

@Injectable()
export class URLQueryParamsService {
  constructor(private router: Router, private route: ActivatedRoute) {}

  public getUrlQueryParams(): Observable<Params> {
    return this.route.queryParams.pipe(
      map(queryParams => ({
        tags: this.getUniqueArrayValues(this.parseTagsQueryParams(queryParams.tags)),
        query: typeof queryParams.query !== 'undefined' && queryParams.query.length > 0 ? queryParams.query : '',
        showOnlyAvailable: !queryParams.showOnlyAvailable ? undefined : true,
      })),
    );
  }

  public updateAddressUrl(queryParams: IURLQueryParams): void {
    const flatQueryParamsTags = queryParams.tags[0] ? queryParams.tags.join() : '';

    this.router.navigate([RouterPaths.search.asPath], {
      relativeTo: this.route,
      queryParams: {
        tags: this.getQueryParam(flatQueryParamsTags),
        query: this.getQueryParam(queryParams.query),
        showOnlyAvailable: !queryParams.showOnlyAvailable ? undefined : true,
      },
      queryParamsHandling: 'merge',
    });
  }

  public updateQueryParam(queryParam: string): void {
    this.router.navigate([RouterPaths.search.asPath], {
      queryParams: { query: queryParam },
      queryParamsHandling: 'merge',
    });
  }

  private getQueryParam(queryParams: string): string | undefined {
    return queryParams.length === 0 ? undefined : queryParams;
  }

  private parseTagsQueryParams(tagsQuery: string): ReadonlyArray<string> {
    if (tagsQuery && tagsQuery.indexOf(',') !== -1) {
      return [...tagsQuery.split(',')];
    } else {
      return [tagsQuery];
    }
  }

  private getUniqueArrayValues(array: ReadonlyArray<string>): ReadonlyArray<string> {
    return Array.from(new Set(array));
  }
}
