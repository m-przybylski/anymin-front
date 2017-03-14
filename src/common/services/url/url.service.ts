import {CommonConfig} from "../../../../generated_modules/common-config/common-config"

export class UrlService {

  private commonConfig: any

  /* @ngInject */
  constructor(private CommonSettingsService: any, private lodash: _.LoDashStatic, CommonConfig: CommonConfig) {
    this.commonConfig = CommonConfig.getAllData()
  }

  public resolveSocialUrl = (remoteUrl: string) => {
    const _socialNetworks = this.CommonSettingsService.localSettings.socialNetworks

    for (let i = 0; i < _socialNetworks.length; i++) {
      let social = _socialNetworks[i]
      if (remoteUrl.match(social.pattern)) {
        return social
      }
    }

    return this.lodash.find(_socialNetworks, {
      name: 'Website'
    })
  }

  public resolveFileUrl = (fileId: string) => {
    return this.commonConfig.urls.files + this.commonConfig.urls['file-download'].replace('%s', fileId)
  }
}
