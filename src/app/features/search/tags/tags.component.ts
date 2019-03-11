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
  public selectTag = new EventEmitter<string>();

  @Output()
  public removeTag = new EventEmitter<string>();

  @Input()
  public isTagSelected = false;

  @Input()
  public tagList: ReadonlyArray<string> = [];

  public removeSelectedTag(tag: string): void {
    this.tagList = this.tagList.filter(item => item !== tag);
    this.removeTag.emit(tag);
  }

  public onClickTag(tag: string): void {
    this.selectTag.emit(tag);
  }
}
