import { CoreConfig } from '@anymind-ng/core';

// tslint:disable-next-line:only-arrow-functions
export function getCoreConfig(): CoreConfig {
  return new CoreConfig({
    files: window.location.origin,
    fileDownload: '/files/%s/download',
    fileUpload: '/files/%s/upload'
  });
}
