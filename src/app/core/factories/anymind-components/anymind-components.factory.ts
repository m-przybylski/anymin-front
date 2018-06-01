import { CommonConfig } from '../../../../common-config';
import { ConfigDEFAULT } from '../../../../../generated_modules/common-config/common-config.default';

export function AnymindComponentsFactory(): ConfigDEFAULT {

  return CommonConfig.getCommonConfig();
}
