// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:no-null-keyword

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormUtilsService } from '@anymind-ng/core';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { IDropdownComponent } from '@platform/shared/components/dropdown/dropdown.component';

@Component({
  selector: 'plat-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.sass'],
})
export class InputSearchComponent implements OnInit {
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

  public suggestedSearchResults: ReadonlyArray<IDropdownComponent>;
  public searchFormGroupName: FormGroup = new FormGroup({});
  public searchControlName = 'searchControlName';

  constructor(public formUtils: FormUtilsService) {}

  public ngOnInit(): void {
    this.searchFormGroupName.addControl(this.searchControlName, new FormControl('', []));

    this.searchFormGroupName.controls[this.searchControlName].valueChanges
      .pipe(switchMap(inputValue => this.fakeBackendRequest(inputValue)))
      .subscribe(suggestedSearchResult => {
        this.suggestedSearchResults = suggestedSearchResult;
        this.isDropdownDisplayed = suggestedSearchResult ? suggestedSearchResult.length !== 0 : false;
      });
  }

  public onSelectItem = (value: any): void => {
    this.searchFormGroupName.controls[this.searchControlName].setValue(value.name);
    this.onBlur();
  };

  public onBlur(): void {
    this.isFocused = false;
    this.isDropdownDisplayed = false;
  }

  public onFocus = (): void => {
    this.isFocused = true;
    this.isDropdownDisplayed = this.suggestedSearchResults ? this.suggestedSearchResults.length !== 0 : false;
  };

  public toggleDropdown = (isClickonElement: boolean): void => {
    if (!isClickonElement) {
      this.onBlur();
    }
  };

  private fakeBackendRequest(searchText: string): Observable<ReadonlyArray<IDropdownComponent>> {
    // TODO tutaj arturze trzeba zrobic request do backendu

    return of([{ name: 'pies' }, { name: searchText }]).pipe(take(1));
  }
}
