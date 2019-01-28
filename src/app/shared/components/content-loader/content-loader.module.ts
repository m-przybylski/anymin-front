import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentLoaderComponent } from './content-loader.component';
import { ConsultationLoaderComponent } from '@platform/shared/components/content-loader/loaders/consultation-row-loader/consultation-row-loader.component';
import { ListItemLoaderComponent } from '@platform/shared/components/content-loader/loaders/list-item-loader/list-item-loader.component';
import { BalanceLoaderComponent } from '@platform/shared/components/content-loader/loaders/balance-loader/balance-loader.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ContentLoaderComponent, ConsultationLoaderComponent, ListItemLoaderComponent, BalanceLoaderComponent],
  exports: [ContentLoaderComponent, ConsultationLoaderComponent, ListItemLoaderComponent, BalanceLoaderComponent],
})
export class ContentLoaderModule {}
