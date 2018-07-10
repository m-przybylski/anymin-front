import { CoreConfig } from '@anymind-ng/core';
import { CommonConfig } from '../../../../common-config';

// tslint:disable-next-line:only-arrow-functions
export function getCoreConfig(): CoreConfig {
  return new CoreConfig({
    files: CommonConfig.getCommonConfig().urls.files,
    fileDownload: CommonConfig.getCommonConfig().urls['file-download'],
    fileUpload: CommonConfig.getCommonConfig().urls['file-upload']
  });
}
