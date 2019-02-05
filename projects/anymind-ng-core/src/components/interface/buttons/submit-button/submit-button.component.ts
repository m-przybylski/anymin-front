import { Component, Inject, Input, OnDestroy } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { Config } from '../../../../config';
import { COMPONENTS_CONFIG } from '../../../../shared/injection-tokens/injection-tokens';

@Component({
  selector: 'am-core-submit-button',
  templateUrl: 'submit-button.component.html',
  styleUrls: ['submit-button.component.sass'],
})
export class SubmitButtonComponent implements OnDestroy {
  @Input()
  public id?: string;

  @Input()
  public titleText: string;

  @Input()
  public formName?: string;

  @Input()
  public isButtonSmall = false;

  @Input()
  public isDisabled?: boolean;

  @Input()
  public isSubmitType = true;

  private isLoadingObserver$ = new Subject<boolean>();

  @Input()
  public set isLoading(value: boolean) {
    this.isLoadingObserver$.next(value);
  }

  public get isLoading(): boolean {
    return this._isLoading;
  }

  private _isLoading = false;

  constructor(@Inject(COMPONENTS_CONFIG) private config: Config) {
    this.isLoadingObserver$.pipe(debounce(() => timer(this.config.timeouts.buttonPending))).subscribe(value => {
      this._isLoading = value;
    });
  }

  public ngOnDestroy(): void {
    this.isLoadingObserver$.unsubscribe();
  }
}
