import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ISearchResults, SearchViewService } from '@platform/features/search/search.view.service';
import { URLQueryParamsService } from '@platform/core/services/search/url-query-params.service';
import { GetSearchRequestResult } from '@anymind-ng/api';
import { Params } from '@angular/router';
import { Animations } from '@platform/shared/animations/animations';

@Component({
  selector: 'plat-search.view',
  templateUrl: './search.view.component.html',
  styleUrls: ['./search.view.component.sass'],
  animations: [Animations.collapse, Animations.fadeInOutSearchItems],
})
export class SearchViewComponent implements OnInit, OnDestroy {
  public selectedTagList: ReadonlyArray<string> = [];
  public suggestedTags: ReadonlyArray<string> = [];
  public query = '';
  public isUserLoggedIn = false;
  public visibilityExpertsControl: FormControl;
  public searchList: ReadonlyArray<GetSearchRequestResult> = [];
  public isPending = true;
  public isSearchResultsPending = false;
  public isNoMoreResults = false;

  private ngUnsubscribe$ = new Subject<void>();
  private currentSearchResultOffset = 0;
  private readonly offsetSearchResult = 10;

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
        switchMap(queryParams =>
          this.searchViewService.updateSearchResults(
            queryParams,
            this.visibilityExpertsControl.value,
            this.currentSearchResultOffset,
          ),
        ),
      )
      .subscribe(searchResults => {
        this.updateSearchResults(searchResults);
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

  public loadMoreSearchResults(): void {
    this.currentSearchResultOffset += this.offsetSearchResult;
    this.isSearchResultsPending = true;

    this.searchViewService
      .getSearchResult(
        this.query,
        this.selectedTagList,
        this.visibilityExpertsControl.value,
        this.currentSearchResultOffset,
      )
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(searchResultsConsultations => {
        this.searchList = [...this.searchList, ...searchResultsConsultations];
        this.isSearchResultsPending = false;
        this.checkSearchResultLength();
      });
  }

  public get hasSearchResults(): boolean {
    return this.searchList.length === 0 && (this.query.length !== 0 || this.selectedTagList.length !== 0);
  }

  public get isSuggestedTagsSectionVisible(): boolean {
    return this.suggestedTags.length > 0 && !this.hasSearchResults;
  }

  public isHeaderSearchSectionVisible(): boolean {
    return this.isSuggestedTagsSectionVisible || (this.hasSearchResults && !this.isPending);
  }

  private updateSearchResults(searchResults: ISearchResults): void {
    this.adjustQueryParamsValues(searchResults.currentQueryParams);
    this.suggestedTags = searchResults.suggestionTags;
    this.searchList = searchResults.searchResultsConsultations;
    this.isPending = false;
    this.checkSearchResultLength();
  }

  private checkSearchResultLength(): void {
    this.isNoMoreResults = this.searchList.length < this.offsetSearchResult;
  }

  private adjustQueryParamsValues(queryParams: Params): void {
    if (queryParams.tags[0]) {
      this.selectedTagList = queryParams.tags;
    }
    this.query = queryParams.query;
    this.visibilityExpertsControl.setValue(queryParams.showOnlyAvailable);
  }

  private updateAddressUrl(): void {
    this.isPending = true;
    this.isNoMoreResults = false;
    this.currentSearchResultOffset = 0;

    this.urlQueryParamsService.updateAddressUrl({
      query: this.query,
      tags: this.selectedTagList,
      showOnlyAvailable: this.visibilityExpertsControl.value,
    });
  }
}
