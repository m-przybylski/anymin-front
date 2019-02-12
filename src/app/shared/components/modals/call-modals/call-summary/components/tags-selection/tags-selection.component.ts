import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { GetTag } from '@anymind-ng/api';

@Component({
  selector: 'plat-tags-selection',
  templateUrl: './tags-selection.component.html',
  styleUrls: ['./tags-selection.component.sass'],
})
export class TagsSelectionComponent extends Logger implements OnInit {
  @Input()
  public tagList: ReadonlyArray<GetTag>;

  @Output()
  public savedTagsEmitter$: EventEmitter<ReadonlyArray<string>> = new EventEmitter();

  public selectedTags: ReadonlyArray<string> = [];
  public isSendTagsButtonDisabled = false;

  constructor(loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('TagsSelectionComponent'));
  }

  public ngOnInit(): void {
    this.isSendTagsButtonDisabled = this.selectedTags.length === 0;
  }

  public clickTag = (tag: GetTag): void => {
    this.selectedTags = this.selectedTags.includes(tag.id)
      ? this.selectedTags.filter(t => t !== tag.id)
      : [...this.selectedTags, tag.id];
    this.isSendTagsButtonDisabled = this.selectedTags.length === 0;
  };

  public isTagSelected = (tag: GetTag): boolean => this.selectedTags.includes(tag.id);

  public saveTags(): void {
    if (!this.isSendTagsButtonDisabled) {
      this.savedTagsEmitter$.emit(this.selectedTags);
    }
  }

  public omitStep(): void {
    this.savedTagsEmitter$.emit([]);
  }
}
