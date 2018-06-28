// tslint:disable:only-arrow-functions
import { IWindowService } from '../../../../../services/window/window.service';

export function PaypalFactory($window: IWindowService): IWindowService {
  return $window.paypal;
}
