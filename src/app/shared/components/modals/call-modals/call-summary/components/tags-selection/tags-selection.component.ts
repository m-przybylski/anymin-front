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
  public savedTagsEmitter$: EventEmitter<ReadonlyArray<GetTag>> = new EventEmitter();

  public selectedTags: ReadonlyArray<GetTag> = [];
  public isSendTagsButtonDisabled = false;

  constructor(loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('TagsSelectionComponent'));
  }

  public ngOnInit(): void {
    this.isSendTagsButtonDisabled = this.selectedTags.length === 0;
  }

  public clickTag = (tag: GetTag): void => {
    this.selectedTags = this.isTagSelected(tag)
      ? this.selectedTags.filter(t => t.id !== tag.id)
      : [...this.selectedTags, tag];
    this.isSendTagsButtonDisabled = this.selectedTags.length === 0;
  };

  public isTagSelected = (tag: GetTag): boolean => this.selectedTags.includes(tag);

  public saveTags(): void {
    if (!this.isSendTagsButtonDisabled) {
      this.savedTagsEmitter$.emit(this.selectedTags);
    }
  }

  public omitStep(): void {
    this.savedTagsEmitter$.emit([]);
  }
}
