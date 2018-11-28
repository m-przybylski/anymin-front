import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContentLoaderComponent } from './content-loader.component';
import { ActivityLoaderComponent } from './activity-loader.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ContentLoaderComponent, ActivityLoaderComponent],
  exports: [ContentLoaderComponent, ActivityLoaderComponent],
})
export class ContentLoaderModule {}
