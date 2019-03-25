import { Component, Input } from '@angular/core';

@Component({
  selector: 'plat-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.sass'],
})
export class TagListComponent {
  @Input()
  public itemList: ReadonlyArray<string> = [];
  @Input()
  public color: string;
}
