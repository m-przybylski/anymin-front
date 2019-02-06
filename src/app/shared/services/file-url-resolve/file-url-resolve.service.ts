import { Injectable } from '@angular/core';
import { Logger } from '@platform/core/logger';
import { LoggerFactory } from '@anymind-ng/core';
import { getCoreConfig } from '@platform/core/factories/core-config/core-config.factory';

@Injectable({ providedIn: 'root' })
export class FileUrlResolveService extends Logger {
  constructor(loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('FileUrlResolveService'));
  }

  public getFileDownloadUrl(fileToken?: string): string {
    if (typeof fileToken !== 'undefined') {
      const url = getCoreConfig().urls.fileDownload.replace('%s', fileToken);

      return `${window.location.origin}${url}`;
    }
    this.loggerService.warn('expected file token but got: ', fileToken);

    return '';
  }
  public getFilePreviewDownloadUrl(fileToken?: string): string {
    if (typeof fileToken !== 'undefined') {
      const url = getCoreConfig().urls.filePreviewDownload.replace('%s', fileToken);

      return `${window.location.origin}${url}`;
    }
    this.loggerService.warn('expected file token but got: ', fileToken);

    return '';
  }
}
