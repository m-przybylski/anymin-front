// tslint:disable:strict-boolean-expressions
// tslint:disable-next-line
const environment = require('../../../../../generated_modules/environment/environment.json').environment;

export enum Environment {
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export class EnvironmentService {
  public static get = (): Environment => {
    const fileEnv = EnvironmentService.getEnvFromLocalFile();

    return fileEnv ? fileEnv : EnvironmentService.getEnvFromHostname();
  };

  private static getEnvFromHostname(): Environment {
    const urlEnvPrefix = window.location.hostname.split('.')[0];
    switch (urlEnvPrefix) {
      case 'localhost':
        return Environment.STAGING;
      case 'stage':
        return Environment.STAGING;
      case 'app':
        return Environment.PRODUCTION;
      default:
        return Environment.PRODUCTION;
    }
  }

  private static getEnvFromLocalFile(): Environment | undefined {
    return Environment[environment.toUpperCase()] as Environment | undefined;
  }
}
