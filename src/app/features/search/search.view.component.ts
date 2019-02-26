import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { map, switchMap, take, takeUntil } from 'rxjs/operators';
import { forkJoin, merge, Observable, Subject } from 'rxjs';
import * as fromRoot from '@platform/reducers';
import * as fromCore from '@platform/core/reducers';
import { SearchViewService } from '@platform/features/search/search.view.service';
import { URLQueryParamsService } from '@platform/core/services/search/url-query-params.service';

@Component({
  selector: 'plat-search.view',
  templateUrl: './search.view.component.html',
  styleUrls: ['./search.view.component.sass'],
})
export class SearchViewComponent implements OnInit, OnDestroy {
  public selectedTagList: ReadonlyArray<string> = [];
  public suggestedTags: ReadonlyArray<string> = [];
  public query = '';
  public isUserLoggedIn = false;
  public visibilityExpertsControl: FormControl;
  public searchList: ReadonlyArray<any> = [];

  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private searchViewService: SearchViewService,
    private store: Store<fromRoot.IState>,
    private urlQueryParamsService: URLQueryParamsService,
  ) {}

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public ngOnInit(): void {
    this.visibilityExpertsControl = new FormControl();

    merge(
      this.urlQueryParamsService.getUrlQueryParams().pipe(take(1)),
      this.urlQueryParamsService.queryParamsChange.pipe(takeUntil(this.ngUnsubscribe$)),
    )
      .pipe(
        map(queryParams => {
          if (queryParams.visibleConsultations) {
            this.visibilityExpertsControl.setValue(queryParams.visibleConsultations);
          }
          this.selectedTagList = queryParams.tags;
          this.query = queryParams.query;

          return queryParams;
        }),
        switchMap(queryParams => this.updateSearchResults(queryParams.tags)),
      )
      .subscribe(res => {
        this.suggestedTags = res.suggestionTags;
        this.searchList = res.searchResultsConsultations;
      });

    this.getLoggedInStatus().subscribe();
  }

  public onClickRecentTag(tag: string): void {
    this.selectedTagList = [...this.selectedTagList, tag];
    this.suggestedTags = this.suggestedTags.filter(item => item !== tag);
    this.updateAddressUrl();
  }

  public onDeleteTag(tag: string): void {
    this.selectedTagList = this.selectedTagList.filter(item => item !== tag);
    this.updateAddressUrl();
  }

  private updateSearchResults(tagQuery: ReadonlyArray<string>): Observable<any> {
    return forkJoin(
      this.searchViewService.sendQueryTagSuggestion({ query: this.query, tags: tagQuery }),
      this.searchViewService.getSearchResult(this.query, tagQuery),
    ).pipe(
      map(([suggestionTags, searchResultsConsultations]) => ({
        suggestionTags: suggestionTags.tags,
        searchResultsConsultations,
      })),
    );
  }

  private updateAddressUrl(): void {
    this.urlQueryParamsService.updateAddressUrl({
      query: this.query,
      tags: this.selectedTagList,
      visibleConsultations: this.visibilityExpertsControl.value,
    });
  }

  private getLoggedInStatus(): Observable<any> {
    return this.store.pipe(
      select(fromCore.getLoggedIn),
      map(res => {
        this.isUserLoggedIn = res.isLoggedIn;
      }),
    );
  }
}
