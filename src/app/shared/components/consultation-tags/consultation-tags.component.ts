import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConsultationTagsComponentService, TagValidationStatus } from './consultation-tags.component.service';
import { InputTagsComponent } from './input-tags/input-tags.component';
import { debounceTime, map, takeUntil, catchError } from 'rxjs/operators';
import { Subject, merge, EMPTY, Observable } from 'rxjs';
import { Animations, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { HttpErrorResponse } from '@angular/common/http';
import { GetSuggestedTags } from '@anymind-ng/api';

interface ISuggestedTagsQuery {
  name: string;
  description: string;
}

@Component({
  selector: 'plat-consultation-tags',
  templateUrl: './consultation-tags.component.html',
  styleUrls: ['./consultation-tags.component.sass'],
  animations: Animations.addItemAnimation,
  providers: [ConsultationTagsComponentService],
})
export class ConsultationTagsComponent implements OnInit, OnDestroy {
  @Input('label')
  public labelTrKey: string;

  @Input('placeholder')
  public placeholderTrKey: string;

  @Input()
  public controlName: string;

  @Input()
  public descriptionControlName: string;

  @Input()
  public nameControlName: string;

  @Input()
  public form: FormGroup;

  @Input()
  public isRequired = false;

  @Input()
  public isDisabled = false;

  @Input()
  public tagNames: ReadonlyArray<string> = [];

  @Output()
  public selectedTagsEmitter$: EventEmitter<ReadonlyArray<string>> = new EventEmitter<ReadonlyArray<string>>();

  public suggestedTags: ReadonlyArray<string> = [];
  public selectedTags: ReadonlyArray<string> = [];
  public validationErrorTrKey: string;
  public hasSuggestedTags = false;
  public hasSelectedTags = false;

  private readonly validationErrorTranslations = {
    invalidLength: 'INTERFACE.INPUT_CONSULTATION_TAG.VALIDATION_TEXT.INVALID_CHARACTERS_COUNT',
    invalidWordsCount: 'INTERFACE.INPUT_CONSULTATION_TAG.VALIDATION_TEXT.INVALID_WORDS_COUNT',
    invalidMaxTagsCount: 'INTERFACE.INPUT_CONSULTATION_TAG.VALIDATION_TEXT.INVALID_TAGS_COUNT',
    invalidMinTagsCount: 'INTERFACE.INPUT_CONSULTATION_TAG.VALIDATION_TEXT.INVALID_MIN_TAGS_COUNT',
    invalidValue: 'INTERFACE.INPUT_CONSULTATION_TAG.VALIDATION_TEXT.INVALID_TAG_NAME',
    duplicated: 'INTERFACE.INPUT_CONSULTATION_TAG.VALIDATION_TEXT.INVALID_TAG_DUPLICATED',
  };
  private readonly updateSuggestedTagsQueryDelay = 1000;
  private readonly suggestedTagsCount = 7;
  private ngUnsubscribe$ = new Subject<void>();
  private suggestedTagsQuery: ISuggestedTagsQuery = {
    name: '',
    description: '',
  };
  private suggestedTagsQuery$: Observable<ISuggestedTagsQuery>;
  private loggerService: LoggerService;

  constructor(
    private consultationTagsComponentService: ConsultationTagsComponentService,
    loggerFactory: LoggerFactory,
  ) {
    this.loggerService = loggerFactory.createLoggerService('ConsultationTagsComponent');
  }

  public ngOnInit(): void {
    this.selectedTags = [...this.tagNames];
    this.hasSelectedTags = this.selectedTags.length > 0;

    const titleValueChanges$ = this.form.controls[this.nameControlName].valueChanges.pipe(
      map(value => (this.suggestedTagsQuery.name = value)),
    );
    const descriptionValueChanges$ = this.form.controls[this.descriptionControlName].valueChanges.pipe(
      map(value => (this.suggestedTagsQuery.description = value)),
    );
    this.suggestedTagsQuery$ = merge(titleValueChanges$, descriptionValueChanges$);
    this.suggestedTagsQuery$
      .pipe(debounceTime(this.updateSuggestedTagsQueryDelay))
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.updateSuggestedTags();
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public handleNewTag = (tag: string): void => {
    const tagLowerCase = tag.toLowerCase();
    const tagStatus = this.consultationTagsComponentService.getTagValidationStatus(tagLowerCase, this.selectedTags);
    switch (tagStatus) {
      case TagValidationStatus.INVALID_LENGTH:
        this.displayInvalidTagError(
          InputTagsComponent.inputTagErrors.invalidLength,
          this.validationErrorTranslations.invalidLength,
        );
        break;

      case TagValidationStatus.INVALID_PATTERN:
        this.displayInvalidTagError(
          InputTagsComponent.inputTagErrors.invalidPattern,
          this.validationErrorTranslations.invalidValue,
        );
        break;

      case TagValidationStatus.DUPLICATED:
        this.displayInvalidTagError(
          InputTagsComponent.inputTagErrors.duplicated,
          this.validationErrorTranslations.duplicated,
        );
        break;

      case TagValidationStatus.INVALID_WORDS_COUNT:
        this.displayInvalidTagError(
          InputTagsComponent.inputTagErrors.invalidWordsCount,
          this.validationErrorTranslations.invalidWordsCount,
        );
        break;

      case TagValidationStatus.INVALID_MAX_COUNT:
        this.displayInvalidTagError(
          InputTagsComponent.inputTagErrors.invalidMaxCount,
          this.validationErrorTranslations.invalidMaxTagsCount,
        );
        break;

      default:
        this.addTag(tagLowerCase);
    }
  };

  public removeSelectedTag = (tag: string): void => {
    if (!this.isDisabled) {
      this.selectedTags = this.selectedTags.filter(item => item !== tag);
      this.selectedTagsEmitter$.emit(this.selectedTags);
      this.hasSelectedTags = this.selectedTags.length > 0;
      this.updateSuggestedTags();
      this.checkTagsCount();
    }
  };

  public handleSuggestedTag = (tag: string): void => {
    if (!this.isDisabled) {
      this.suggestedTags = this.suggestedTags.filter(item => item !== tag);
      this.hasSuggestedTags = this.suggestedTags.length > 0;
      this.addTag(tag);
    }
  };

  private addTag = (tag: string): void => {
    this.selectedTags = [...this.selectedTags, tag];
    this.selectedTagsEmitter$.emit(this.selectedTags);
    this.hasSelectedTags = this.selectedTags.length > 0;
    this.updateSuggestedTags();
    this.checkTagsCount();
  };

  private checkTagsCount = (): void => {
    // tslint:disable-next-line:no-null-keyword
    this.form.controls[this.controlName].setErrors(null);
    if (this.consultationTagsComponentService.isTagsMinCountInvalid(this.selectedTags)) {
      this.displayInvalidTagError(
        InputTagsComponent.inputTagErrors.invalidMinCount,
        this.validationErrorTranslations.invalidMinTagsCount,
      );
    }
  };

  private displayInvalidTagError = (errorType: string, errorTrKey: string): void => {
    this.validationErrorTrKey = errorTrKey;
    this.form.controls[this.controlName].setErrors({ [errorType]: true });
    this.form.controls[this.controlName].markAsTouched();
  };

  private updateSuggestedTags = (): void => {
    this.consultationTagsComponentService
      .getSuggestedTags({
        description: this.suggestedTagsQuery.description,
        query: this.suggestedTagsQuery.name,
        tags: [...this.selectedTags],
        count: this.suggestedTagsCount,
      })
      .pipe(catchError(this.handleGetSuggestedTagsError))
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(response => {
        this.suggestedTags = response.tags;
        this.hasSuggestedTags = this.suggestedTags.length > 0;
      });
  };

  private handleGetSuggestedTagsError = (error: HttpErrorResponse): Observable<GetSuggestedTags> => {
    this.loggerService.warn('Error when try to get suggested tags', error);

    return EMPTY;
  };
}
