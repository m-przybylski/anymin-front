import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownListComponent } from './dropdown-list/dropdown-list.component';
import { ScrollToElementDirective } from './dropdown-list/scroll-to-element.directive';
import { DropdownComponent } from './dropdown.component';
import { ToggleElementDirective } from './on-element-click.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UserAvatarModule } from '../user-avatar/user-avatar.module';
import { MenuListComponent } from '@platform/shared/components/dropdown/menu-list/menu-list.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, UserAvatarModule],
  declarations: [
    DropdownComponent,
    DropdownListComponent,
    ScrollToElementDirective,
    ToggleElementDirective,
    MenuListComponent,
  ],
  entryComponents: [DropdownComponent],
  exports: [DropdownComponent, DropdownListComponent, ToggleElementDirective, MenuListComponent],
})
export class DropdownModule {}
