// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:no-null-keyword

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormUtilsService } from '@anymind-ng/core';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, switchMap, take } from 'rxjs/operators';
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
  public inputFormControl: FormControl;

  public searchInputValue: Subject<string> = new Subject();
  public suggestedSearchResults: ReadonlyArray<IDropdownComponent>;

  public inviteEmployeesFormGroupName: FormGroup = new FormGroup({});
  public inviteEmployeesControlName = 'pies';

  private readonly debounceTime = 400;

  constructor(public formUtils: FormUtilsService) {}

  public ngOnInit(): void {
    this.searchInputValue$
      .pipe(switchMap(searchText => this.fakeBackendRequest(searchText)))
      .subscribe(suggestedSearchResult => {
        this.suggestedSearchResults = suggestedSearchResult;
        this.isDropdownDisplayed = suggestedSearchResult ? suggestedSearchResult.length !== 0 : false;
      });
  }

  public get searchInputValue$(): Observable<string> {
    return this.searchInputValue.asObservable().pipe(debounceTime(this.debounceTime));
  }

  public onSearchInputValueChange(val: string): void {
    this.searchInputValue.next(val);
  }

  public onBlur(): void {
    this.inputFormControl.updateValueAndValidity();
    this.isFocused = false;
    this.isDropdownDisplayed = false;
  }

  public onFocus = (): void => {
    this.inputFormControl.setErrors(null);
    this.isFocused = true;
    this.isDropdownDisplayed = this.suggestedSearchResults ? this.suggestedSearchResults.length !== 0 : false;
  };

  public onEnter(): void {
    this.onBlur();
  }

  private fakeBackendRequest(searchText: string): Observable<ReadonlyArray<IDropdownComponent>> {
    // TODO tutaj arturze trzeba zrobic request do backendu
    return of([{ name: 'pies' }, { name: 'lala' }]).pipe(take(1));
  }
}
