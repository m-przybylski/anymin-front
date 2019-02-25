import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentLoaderComponent } from './content-loader.component';
import { ConsultationLoaderComponent } from '@platform/shared/components/content-loader/loaders/consultation-row-loader/consultation-row-loader.component';
import { ListItemLoaderComponent } from '@platform/shared/components/content-loader/loaders/list-item-loader/list-item-loader.component';
import { BalanceLoaderComponent } from '@platform/shared/components/content-loader/loaders/balance-loader/balance-loader.component';
import { ProfileLoaderComponent } from './loaders/profile-loader/profile.loader.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ContentLoaderComponent,
    ConsultationLoaderComponent,
    ListItemLoaderComponent,
    BalanceLoaderComponent,
    ProfileLoaderComponent,
  ],
  exports: [
    ContentLoaderComponent,
    ConsultationLoaderComponent,
    ListItemLoaderComponent,
    BalanceLoaderComponent,
    ProfileLoaderComponent,
  ],
})
export class ContentLoaderModule {}
