// tslint:disable:no-let
// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:no-any
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { CommonConfig } from '../../../../common-config';

export interface ISocialUrl {
  iconClass: string;
  name: string;
  pattern: RegExp;
}

// tslint:disable:member-ordering
export class UrlService {

  private commonConfig = CommonConfig.getCommonConfig();

  public static $inject = ['CommonSettingsService'];

    constructor(private CommonSettingsService: any) {
  }

  public resolveSocialUrl = (remoteUrl: string): ISocialUrl | undefined => {
    const _socialNetworks: ISocialUrl[] = this.CommonSettingsService.localSettings.socialNetworks;

    // tslint:disable-next-line:prefer-for-of
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
