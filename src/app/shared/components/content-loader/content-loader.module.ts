import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentLoaderComponent } from './content-loader.component';
import { ConsultationLoaderComponent } from 'app/shared/components/content-loader/loaders/consultation-row-loader/consultation-row-loader.component';
import { ListItemLoaderComponent } from '@platform/shared/components/content-loader/loaders/list-item-loader/list-item-loader.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ContentLoaderComponent, ConsultationLoaderComponent, ListItemLoaderComponent],
  exports: [ContentLoaderComponent, ConsultationLoaderComponent, ListItemLoaderComponent],
})
export class ContentLoaderModule {}
