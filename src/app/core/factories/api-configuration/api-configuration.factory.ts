// tslint:disable:only-arrow-functions
// tslint:disable:newline-before-return
import { Configuration, ConfigurationParameters } from '@anymind-ng/api';

export function ApiConfigurationFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: window.location.origin
  };
  return new Configuration(params);
}
