import { Injectable } from '@angular/core';
import { RouterPaths } from '@platform/shared/routes/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IURLQueryParams {
  tags: ReadonlyArray<string>;
  query: string;
  visibleConsultations: boolean | undefined;
}

@Injectable()
export class URLQueryParamsService {
  private currentQueryParams$ = new Subject<IURLQueryParams>();
  private queryParams: IURLQueryParams = {
    tags: [],
    query: '',
    visibleConsultations: undefined,
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  public get queryParamsChange(): Observable<IURLQueryParams> {
    return this.currentQueryParams$.asObservable();
  }

  public getUrlQueryParams(): Observable<IURLQueryParams> {
    return this.route.queryParams.pipe(
      map(res => ({
        tags: this.deleteMultipleArrayValues(this.parseTagsQueryParams(res.tags)),
        query: typeof res.query !== 'undefined' && res.query.length > 0 ? res.query : '',
        visibleConsultations: res.visibleConsultations,
      })),
    );
  }

  public updateAddressUrl(queryParams: IURLQueryParams): void {
    const flatQueryParamsTags = queryParams.tags ? queryParams.tags.join() : '';

    this.router.navigate([RouterPaths.search.asPath], {
      queryParams: {
        query: this.isQueryExist(queryParams.query),
        tags: this.isQueryExist(flatQueryParamsTags),
        visibleConsultations: !queryParams.visibleConsultations ? undefined : true,
      },
    });

    this.queryParams = {
      query: queryParams.query,
      tags: queryParams.tags,
      visibleConsultations: !queryParams.visibleConsultations ? undefined : true,
    };

    this.currentQueryParams$.next(this.queryParams);
  }

  public updateQueryParam(queryParam: string): void {
    this.router.navigate([RouterPaths.search.asPath], {
      queryParams: { query: queryParam },
      queryParamsHandling: 'merge',
    });

    this.queryParams.query = queryParam;
    this.currentQueryParams$.next(this.queryParams);
  }

  private isQueryExist(queryParams: string): string | undefined {
    return queryParams.length === 0 ? undefined : queryParams;
  }

  private parseTagsQueryParams(tagsQuery: string): ReadonlyArray<string> {
    if (tagsQuery && tagsQuery.indexOf(',') !== -1) {
      return [...tagsQuery.split(',')];
    } else {
      return [tagsQuery];
    }
  }

  private deleteMultipleArrayValues(array: ReadonlyArray<string>): ReadonlyArray<string> {
    return array[0] ? Object.keys(Object.assign({}, ...array.map(a => ({ [a]: true })))) : [];
  }
}
