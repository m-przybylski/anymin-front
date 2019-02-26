import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormUtilsService } from '@anymind-ng/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { IDropdownComponent } from '@platform/shared/components/dropdown/dropdown.component';
import { InputSearchService } from '@platform/shared/components/inputs/input-search/input-search.service';
import { GetSuggestedQueries } from '@anymind-ng/api';
import { Config } from 'config';
import { URLQueryParamsService } from '@platform/core/services/search/url-query-params.service';
import { Router } from '@angular/router';
import { RouterPaths } from '@platform/shared/routes/routes';

@Component({
  selector: 'plat-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.sass'],
})
export class InputSearchComponent implements OnInit, OnDestroy {
  @Input('placeholder')
  public placeholderTrKey: string;

  @Input()
  public isDisabled = false;

  @Input()
  public isChangeOnSubmit = true;
  public isFocused = false;
  public isDropdownDisplayed = false;

  @Input()
  public inputFormControl: FormControl = new FormControl('');

  public suggestedSearchResults: ReadonlyArray<IDropdownComponent> = [];
  public searchFormGroupName: FormGroup = new FormGroup({});
  public searchControlName = 'searchControlName';
  public isSelectQueryFromList = false;
  public currentQueryTags: ReadonlyArray<string> = [];

  @ViewChild('input')
  public inputElement: ElementRef;

  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private inputSearchService: InputSearchService,
    private urlQueryParamsService: URLQueryParamsService,
    private router: Router,
    public formUtils: FormUtilsService,
  ) {}

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public ngOnInit(): void {
    this.searchFormGroupName.addControl(this.searchControlName, new FormControl('', []));

    if (this.router.url.indexOf(RouterPaths.search.asPath) !== -1) {
      this.urlQueryParamsService
        .getUrlQueryParams()
        .pipe(take(1))
        .subscribe(queryParams => {
          this.currentQueryTags = queryParams.tags;
          this.searchFormGroupName.controls[this.searchControlName].setValue(queryParams.query);
          this.onBlur();
        });

      this.urlQueryParamsService.queryParamsChange.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(queryParams => {
        this.currentQueryTags = queryParams.tags;
        this.onBlur();
      });
    }

    this.searchFormGroupName.controls[this.searchControlName].valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        debounceTime(Config.search.debounceTime),
        filter(value => value.length > 1),
        switchMap(() => this.fakeBackendRequest()),
      )
      .subscribe(suggestedSearchResult => {
        this.suggestedSearchResults = suggestedSearchResult;
        this.isDropdownListDisplayed();
      });
  }

  public onSelectItem(value: IDropdownComponent): void {
    this.searchFormGroupName.controls[this.searchControlName].setValue(value.name);
    this.urlQueryParamsService.updateQueryParam(this.searchFormGroupName.controls[this.searchControlName].value);
    this.onBlur();
  }

  public onBlur(): void {
    this.isFocused = false;
    this.isDropdownDisplayed = false;
  }

  public onFocus(): void {
    this.isFocused = true;
    this.isDropdownListDisplayed();
  }

  public toggleDropdown(isClickonElement: boolean): void {
    if (!isClickonElement) {
      this.onBlur();
    }
  }

  public isListItemSelected(isItemSelected: boolean): void {
    this.isSelectQueryFromList = isItemSelected;
  }

  public onEnter(event: any): void {
    if (!this.isSelectQueryFromList) {
      this.urlQueryParamsService.updateQueryParam(event.target.value);
      this.inputElement.nativeElement.blur();
    }
  }

  private isDropdownListDisplayed(): void {
    this.isDropdownDisplayed =
      this.suggestedSearchResults && this.suggestedSearchResults.length !== 0 && this.isFocused;
  }

  private fakeBackendRequest(): Observable<ReadonlyArray<IDropdownComponent>> {
    return this.inputSearchService
      .searchQuerySuggestions(this.searchFormGroupName.controls[this.searchControlName].value)
      .pipe(map(res => this.mapSuggestedConsultations(res)));
  }

  private mapSuggestedConsultations(consultaitonList: GetSuggestedQueries): ReadonlyArray<IDropdownComponent> {
    return consultaitonList.suggestions.map(item => ({ name: item }));
  }
}
