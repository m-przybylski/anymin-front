import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchConsultationItemComponent } from './search-consultation-item/search-consultation-item.component';
import { UserAvatarModule } from '@platform/shared/components/user-avatar/user-avatar.module';
import { ButtonModule, IconModule } from '@platform/shared/components/atomic-components';
import { TranslateModule } from '@ngx-translate/core';
import { MoneyDisplayModule } from '@platform/shared/components/money-display/money-display.module';

@NgModule({
  declarations: [SearchConsultationItemComponent],
  imports: [CommonModule, UserAvatarModule, ButtonModule, IconModule, TranslateModule, MoneyDisplayModule],
  exports: [SearchConsultationItemComponent, MoneyDisplayModule],
})
export class SearchListModule {}
