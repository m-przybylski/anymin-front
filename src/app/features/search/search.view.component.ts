import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { forkJoin, Observable, Subject } from 'rxjs';
import { SearchViewService } from '@platform/features/search/search.view.service';
import { URLQueryParamsService } from '@platform/core/services/search/url-query-params.service';
import { GetSearchRequestResult } from '@anymind-ng/api';
import { Params } from '@angular/router';

interface ISearchView {
  suggestionTags: ReadonlyArray<string>;
  searchResultsConsultations: ReadonlyArray<GetSearchRequestResult>;
}

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
  public searchList: ReadonlyArray<GetSearchRequestResult> = [];

  private ngUnsubscribe$ = new Subject<void>();

  constructor(private searchViewService: SearchViewService, private urlQueryParamsService: URLQueryParamsService) {}

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public ngOnInit(): void {
    this.visibilityExpertsControl = new FormControl(false);

    this.urlQueryParamsService
      .getUrlQueryParams()
      .pipe(
        filter(urlQueryParams => urlQueryParams.tags.length !== 0 || urlQueryParams.query.length !== 0),
        takeUntil(this.ngUnsubscribe$),
        tap(queryParams => {
          this.getQueryParamsValues(queryParams);
        }),
        switchMap(queryParams => this.updateSearchResults(queryParams)),
      )
      .subscribe(searchResults => {
        this.suggestedTags = searchResults.suggestionTags;
        this.searchList = searchResults.searchResultsConsultations;
      });

    this.searchViewService
      .getLoggedInStatus()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(loggedInStatus => {
        this.isUserLoggedIn = loggedInStatus;
      });

    this.visibilityExpertsControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
      this.updateAddressUrl();
    });
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

  private getQueryParamsValues(queryParams: Params): void {
    if (queryParams.tags[0]) {
      this.selectedTagList = queryParams.tags;
    }
    this.query = queryParams.query;
    this.visibilityExpertsControl.setValue(queryParams.showOnlyAvailable);
  }

  private updateSearchResults(queryParams: Params): Observable<ISearchView> {
    return forkJoin(
      this.searchViewService.sendQueryTagSuggestion({ query: queryParams.query, tags: this.selectedTagList }),
      this.searchViewService.getSearchResult(
        queryParams.query,
        this.selectedTagList,
        this.visibilityExpertsControl.value,
      ),
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
      showOnlyAvailable: this.visibilityExpertsControl.value,
    });
  }
}
