import { InjectionToken } from '@angular/core';
import { IFilePreviewPayload } from '@platform/shared/components/modals/file-preview/file-preview.service';

export const FILE_PREVIEW_PAYLOAD = new InjectionToken<IFilePreviewPayload>('FILE_PREVIEW_PAYLOAD');
