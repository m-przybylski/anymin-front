import { CommonConfig } from '../../../../../generated_modules/common-config/common-config';
import { Configuration, ConfigurationParameters } from '@anymind-ng/api';

export function ApiConfigurationFactory (): Configuration {
  const params: ConfigurationParameters = {
    withCredentials: true,
    basePath: CommonConfig.settings.urls.backend
  };
  return new Configuration(params);
}
