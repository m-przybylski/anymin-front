import {
  Component,
  DoCheck,
  Input,
  IterableDiffer,
  IterableDiffers,
  ViewChild,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { ScrollToElementDirective } from './scroll-to-element.directive';
import { AvatarSizeEnum } from '../../user-avatar/user-avatar.component';
import { IDropdownComponent } from '../dropdown.component';

@Component({
  selector: 'plat-dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.sass'],
})
export class DropdownListComponent implements DoCheck, OnDestroy {
  public readonly avatarSize = AvatarSizeEnum.X_24;
  public selectedItemIndex = -1;
  public selectedItemElement: IDropdownComponent;

  @Input()
  public dropdownItems: ReadonlyArray<IDropdownComponent>;

  @Output()
  public selectItem = new EventEmitter<IDropdownComponent>();

  @Output()
  public isItemFocused = new EventEmitter<boolean>();

  @Input()
  public isAvatarVisible = true;

  @ViewChild(ScrollToElementDirective)
  public scrollContent: ScrollToElementDirective;

  private iterableDiffer: IterableDiffer<IDropdownComponent>;

  constructor(private differs: IterableDiffers) {
    this.iterableDiffer = this.differs.find([]).create(undefined);
  }

  public ngOnDestroy(): void {
    this.isItemFocused.emit(false);
  }

  public ngDoCheck(): void {
    if (this.iterableDiffer.diff(this.dropdownItems)) {
      this.selectedItemIndex = -1;
      this.markItemAsSelected(this.selectedItemIndex);
    }
  }

  public onSelectItem(): void {
    if (this.selectedItemIndex !== -1) {
      this.selectItem.emit(this.selectedItemElement);
    }
    this.selectedItemIndex = -1;
  }

  public onItemClicked(index: number): void {
    this.findItemInList(index);
    this.onSelectItem();
  }

  public onMouseSelect(index: number): void {
    this.selectedItemIndex = index;
    this.findItemInList(index);
  }

  public onSelectEnter(): void {
    this.onSelectItem();
  }

  public onKeyUp(): void {
    return this.selectedItemIndex > 0 && this.dropdownItems.length > 0
      ? this.markItemAsSelected(this.selectedItemIndex - 1)
      : this.markItemAsSelected(this.selectedItemIndex);
  }

  public onKeyDown(): void {
    return this.selectedItemIndex < this.dropdownItems.length - 1 && this.dropdownItems.length > 0
      ? this.markItemAsSelected(this.selectedItemIndex + 1)
      : this.markItemAsSelected(this.selectedItemIndex);
  }

  private findItemInList(index: number): void {
    this.selectedItemElement = this.dropdownItems[index];
    this.isItemFocused.emit(index !== -1);
  }

  private markItemAsSelected(index: number): void {
    this.selectedItemIndex = index;

    if (this.selectedItemIndex >= 0) {
      this.findItemInList(index);
      this.scrollContent.scrollToElement(index);
    }
  }
}
