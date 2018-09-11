import { NgModule } from '@angular/core';
import { UserAvatarComponent } from './user-avatar.component';
import { CommonModule } from '@angular/common';
import { IconModule } from '../atomic-components';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, IconModule, TranslateModule],
  declarations: [UserAvatarComponent],
  exports: [UserAvatarComponent],
})
export class UserAvatarModule {}
