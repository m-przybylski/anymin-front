import { CommonConfig, Settings } from '../../../../../generated_modules/common-config/common-config';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';

export interface ISocialUrl {
  iconClass: string;
  name: string;
  pattern: RegExp;
}

// tslint:disable:member-ordering
export class UrlService {

  private commonConfig: Settings;

  public static $inject = ['CommonSettingsService', 'CommonConfig'];

    constructor(private CommonSettingsService: any, CommonConfig: CommonConfig) {
    this.commonConfig = CommonConfig.getAllData();
  }

  public resolveSocialUrl = (remoteUrl: string): ISocialUrl | undefined => {
    const _socialNetworks: ISocialUrl[] = this.CommonSettingsService.localSettings.socialNetworks;

    for (let i = 0; i < _socialNetworks.length; i++) {
      const social = _socialNetworks[i];
      if (remoteUrl.match(social.pattern)) {
        return social;
      }
    }

    return _.find(_socialNetworks, {
      name: 'Website'
    });
  }

  public resolveFileUrl = (fileId: string): string =>
    this.commonConfig.urls.files + this.commonConfig.urls['file-download'].replace('%s', fileId)
}
