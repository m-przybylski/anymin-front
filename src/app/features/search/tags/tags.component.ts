import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Animations } from '@platform/shared/animations/animations';

@Component({
  selector: 'plat-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.sass'],
  animations: [Animations.addItemAnimation],
})
export class TagsComponent {
  @Output()
  public onSelectTag = new EventEmitter<string>();

  @Output()
  public onRemoveTag = new EventEmitter<string>();

  @Input()
  public isTagSelected = false;

  @Input()
  public tagList: ReadonlyArray<string> = [];

  public removeSelectedTag(tag: string): void {
    this.tagList = this.tagList.filter(item => item !== tag);
    this.onRemoveTag.emit(tag);
  }

  public onClickTag(tag: string): void {
    this.onSelectTag.emit(tag);
  }
}
