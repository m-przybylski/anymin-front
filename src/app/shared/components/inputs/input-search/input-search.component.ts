import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { IDropdownComponent } from '@platform/shared/components/dropdown/dropdown.component';
import { InputSearchService } from '@platform/shared/components/inputs/input-search/input-search.service';
import { GetSuggestedQueries } from '@anymind-ng/api';
import { Config } from 'config';
import { URLQueryParamsService } from '@platform/core/services/search/url-query-params.service';

@Component({
  selector: 'plat-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.sass'],
})
export class InputSearchComponent implements OnInit, OnDestroy {
  @Input()
  public placeholderTrKey: string;

  public isFocused = false;
  public isDropdownDisplayed = false;
  public inputFormControl: FormControl = new FormControl('');

  public suggestedSearchResults: ReadonlyArray<IDropdownComponent> = [];
  public searchControlName = 'searchControlName';
  public dropdownControlName = 'dropdownControlName';

  public searchFormGroupName: FormGroup = new FormGroup(
    {
      searchControlName: new FormControl(''),
      dropdownControlName: new FormControl(''),
    },
    [],
  );

  public isSelectQueryFromList = false;

  @ViewChild('input')
  public inputElement: ElementRef;

  private ngUnsubscribe$ = new Subject<void>();

  constructor(private inputSearchService: InputSearchService, private urlQueryParamsService: URLQueryParamsService) {}

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public ngOnInit(): void {
    this.getInputValue();

    this.searchFormGroupName.controls[this.searchControlName].valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        debounceTime(Config.search.debounceTime),
        tap(() => {
          this.updateDropdownListDisplay();
        }),
        filter(value => value.length > 1),
        switchMap(() =>
          this.inputSearchService
            .searchQuerySuggestions(this.searchFormGroupName.controls[this.searchControlName].value)
            .pipe(map(res => this.mapSuggestedConsultations(res))),
        ),
      )
      .subscribe(suggestedSearchResult => {
        this.suggestedSearchResults = suggestedSearchResult;
        this.updateDropdownListDisplay();
      });
  }

  public onSelectItem(value: IDropdownComponent): void {
    this.searchFormGroupName.controls[this.searchControlName].setValue(value.name);
    this.urlQueryParamsService.updateQueryParam(this.searchFormGroupName.controls[this.searchControlName].value);
    this.onBlur();
  }

  public onFocus(): void {
    this.isFocused = true;
    this.updateDropdownListDisplay();
  }

  public toggleDropdown(isClickonElement: boolean): void {
    if (!isClickonElement) {
      this.onBlur();
    }
  }

  public onListItemSelected(isItemSelected: boolean): void {
    this.isSelectQueryFromList = isItemSelected;
  }

  public onEnter(event: any): void {
    if (!this.isSelectQueryFromList && event.target.value.length > 0) {
      this.urlQueryParamsService.updateQueryParam(event.target.value);
      this.onBlur();
    }
  }

  private getInputValue(): void {
    this.urlQueryParamsService
      .getUrlQueryParams()
      .pipe(take(1))
      .subscribe(queryParams => {
        this.searchFormGroupName.controls[this.searchControlName].setValue(queryParams.query);
        this.onBlur();
      });
  }

  private onBlur(): void {
    this.isFocused = false;
    this.isDropdownDisplayed = false;
    this.inputElement.nativeElement.blur();
  }

  private updateDropdownListDisplay(): void {
    this.isDropdownDisplayed =
      this.suggestedSearchResults &&
      this.suggestedSearchResults.length !== 0 &&
      this.isFocused &&
      this.searchFormGroupName.controls[this.searchControlName].value.length > 1;
  }

  private mapSuggestedConsultations(consultaitonList: GetSuggestedQueries): ReadonlyArray<IDropdownComponent> {
    return consultaitonList.suggestions.map(item => ({ name: item }));
  }
}
