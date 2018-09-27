import { NgModule } from '@angular/core';
import { UserAvatarComponent } from './user-avatar.component';
import { CommonModule } from '@angular/common';
import { IconModule } from '../atomic-components';
import { TranslateModule } from '@ngx-translate/core';
import { UserAvatarDirective } from '@platform/shared/components/user-avatar/user-avatar.directive';

@NgModule({
  imports: [CommonModule, IconModule, TranslateModule],
  declarations: [UserAvatarComponent, UserAvatarDirective],
  exports: [UserAvatarComponent],
})
export class UserAvatarModule {}
