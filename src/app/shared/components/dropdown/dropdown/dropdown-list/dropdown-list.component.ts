import { Component, DoCheck, Input, IterableDiffer, IterableDiffers, ViewChild } from '@angular/core';
import { ScrollToElementDirective } from './scroll-to-element.directive';
import { AvatarSizeEnum } from '../../../user-avatar/user-avatar.component';
import { IDropdownComponent } from '../dropdown.component';

@Component({
  selector: 'plat-dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.sass'],
})
export class DropdownListComponent implements DoCheck {
  public readonly avatarSize = AvatarSizeEnum.X_24;
  public selectedItemIndex = -1;
  public selectedItemElement: IDropdownComponent;

  @Input() public dropdownItems: ReadonlyArray<IDropdownComponent>;

  @Input() public onSelectItem: (item: IDropdownComponent) => void;

  @ViewChild(ScrollToElementDirective) public scrollContent: ScrollToElementDirective;

  private iterableDiffer: IterableDiffer<IDropdownComponent>;

  constructor(private differs: IterableDiffers) {
    this.iterableDiffer = this.differs.find([]).create(undefined);
  }

  public ngDoCheck(): void {
    if (this.iterableDiffer.diff(this.dropdownItems)) {
      this.selectedItemIndex = -1;
      this.markItemAsSelected(this.selectedItemIndex);
    }
  }

  public selectItem = (): void => {
    if (this.selectedItemIndex !== -1) {
      this.onSelectItem(this.selectedItemElement);
    }
    this.selectedItemIndex = -1;
  };

  public onItemClicked = (index: number): void => {
    this.findItemInList(index);
    this.selectItem();
  };

  public onMouseSelect = (index: number): void => {
    this.selectedItemIndex = index;
    this.findItemInList(index);
  };

  public onSelectEnter = (): void => {
    this.selectItem();
  };

  public onKeyUp = (): void =>
    this.selectedItemIndex > 0 && this.dropdownItems.length > 0
      ? this.markItemAsSelected(this.selectedItemIndex - 1)
      : this.markItemAsSelected(this.selectedItemIndex);

  public onKeyDown = (): void =>
    this.selectedItemIndex < this.dropdownItems.length - 1 && this.dropdownItems.length > 0
      ? this.markItemAsSelected(this.selectedItemIndex + 1)
      : this.markItemAsSelected(this.selectedItemIndex);

  private findItemInList = (index: number): void => {
    this.selectedItemElement = this.dropdownItems[index];
  };

  private markItemAsSelected = (index: number): void => {
    this.selectedItemIndex = index;

    if (this.selectedItemIndex >= 0) {
      this.findItemInList(index);
      this.scrollContent.scrollToElement(index);
    }
  };
}
