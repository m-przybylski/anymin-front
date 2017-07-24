import {IWindowService} from '../../../../../services/window/window.service'
/* @ngInject */
export function PaypalFactory($window: IWindowService): IWindowService {
  return $window.paypal
}
