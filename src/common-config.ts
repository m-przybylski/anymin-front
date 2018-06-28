// tslint:disable:strict-boolean-expressions
// tslint:disable:no-any
import { CommonConfigDEFAULT, ConfigDEFAULT } from '../generated_modules/common-config/common-config.default';
import { CommonConfigBUILDDEV } from '../generated_modules/common-config/common-config.build-dev';
import { CommonConfigBUILDSTAGE } from '../generated_modules/common-config/common-config.build-stage';
import { CommonConfigBUILDDEMO } from '../generated_modules/common-config/common-config.build-demo';
import { CommonConfigBUILDPROD } from '../generated_modules/common-config/common-config.build-prod';
import { CommonConfigINTEGRATIONTEST } from '../generated_modules/common-config/common-config.integration-test';
import localEnvironment  from '../generated_modules/common-config-env/common-config.env';

export class CommonConfig {

  private static config?: ConfigDEFAULT;

  public static getCommonConfig(): ConfigDEFAULT {

    if (CommonConfig.config) {
      return CommonConfig.config;
    }

    CommonConfig.config = CommonConfig.getEnvConfig(CommonConfig.getCurrentHost());

    return CommonConfig.config;
  }

  private static getEnvConfig = (host: string): ConfigDEFAULT => {
    switch (host) {
      case CommonConfig.getURLhost(CommonConfigBUILDDEV.settings.urls.widget):
        return CommonConfig.deepObjectExtend(CommonConfigDEFAULT.settings, CommonConfigBUILDDEV.settings);
      case CommonConfig.getURLhost(CommonConfigINTEGRATIONTEST.settings.urls.widget):
        return CommonConfig.deepObjectExtend(CommonConfigDEFAULT.settings, CommonConfigINTEGRATIONTEST.settings);
      case CommonConfig.getURLhost(CommonConfigBUILDSTAGE.settings.urls.widget):
        return CommonConfig.deepObjectExtend(CommonConfigDEFAULT.settings, CommonConfigBUILDSTAGE.settings);
      case CommonConfig.getURLhost(CommonConfigBUILDDEMO.settings.urls.widget):
        return CommonConfig.deepObjectExtend(CommonConfigDEFAULT.settings, CommonConfigBUILDDEMO.settings);
      case CommonConfig.getURLhost(CommonConfigBUILDPROD.settings.urls.widget):
        return CommonConfig.deepObjectExtend(CommonConfigDEFAULT.settings, CommonConfigBUILDPROD.settings);
      default:
        return CommonConfig.loadLocalEnvironment(localEnvironment);
    }
  }

  private static getCurrentHost = (): string =>
    window.location.host

  private static getURLhost = (url: string): string =>
    new URL(url).host

  private static deepObjectExtend = (target: any, source: any): any => {
    for (const prop in source) {
      if (source.hasOwnProperty(prop)) {
        if (target[prop] && typeof source[prop] === 'object') {
          CommonConfig.deepObjectExtend(target[prop], source[prop]);
        }
        else {
          target[prop] = source[prop];
        }
      }
    }

    return target;
  }

  private static loadLocalEnvironment = (environmentName: string): ConfigDEFAULT => {
    switch (environmentName) {
      case('BUILDDEV'):
        return CommonConfig.deepObjectExtend(CommonConfigDEFAULT.settings, CommonConfigBUILDDEV.settings);
      case('INTEGRATIONTEST'):
        return CommonConfig.deepObjectExtend(CommonConfigDEFAULT.settings, CommonConfigINTEGRATIONTEST.settings);
      case('BUILDSTAGE'):
        return CommonConfig.deepObjectExtend(CommonConfigDEFAULT.settings, CommonConfigBUILDSTAGE.settings);
      case('BUILDDEMO'):
        return CommonConfig.deepObjectExtend(CommonConfigDEFAULT.settings, CommonConfigBUILDDEMO.settings);
      case('BUILDPROD'):
        return CommonConfig.deepObjectExtend(CommonConfigDEFAULT.settings, CommonConfigBUILDPROD.settings);
      default:
        return CommonConfigDEFAULT.settings;
    }

  }

}
