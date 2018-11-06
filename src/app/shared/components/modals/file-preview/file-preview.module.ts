import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponentsModule } from '@platform/shared/components/modals/modal/modal.components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@platform/shared/shared.module';
import { FilePreviewComponent } from '@platform/shared/components/modals/file-preview/file-preview.component';
import { FilePreviewNavigationComponent } from './file-preview-navigation/file-preview-navigation.component';
import { FileResizerDirective } from './file-size-checker.directive';
import { WindowRef } from '@anymind-ng/core';
import { FilePreviewDirective } from '@platform/shared/components/modals/file-preview/file-preview-navigation/file-preview.directive';
import { FilePreviewService } from '@platform/shared/components/modals/file-preview/file-preview.service';
import { ButtonModule, IconModule } from '@platform/shared/components/atomic-components';
import { SmoothScrollDirective } from './smooth-scroll.directive';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ModalComponentsModule,
    ButtonModule,
    IconModule,
  ],
  declarations: [
    FilePreviewComponent,
    FilePreviewDirective,
    FileResizerDirective,
    SmoothScrollDirective,
    FilePreviewNavigationComponent,
  ],
  entryComponents: [FilePreviewComponent],
  providers: [WindowRef, FilePreviewService],
})
export class FilePreviewModule {}
