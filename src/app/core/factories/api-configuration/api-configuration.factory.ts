import { Configuration, ConfigurationParameters } from '@anymind-ng/api';
import { CommonConfig } from '../../../../common-config';

export function ApiConfigurationFactory(): Configuration {
  const params: ConfigurationParameters = {
    withCredentials: true,
    basePath: CommonConfig.getCommonConfig().urls.backend
  };
  return new Configuration(params);
}
