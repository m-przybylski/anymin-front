import {IWindowService} from "../../../../../services/window/window.service"
/* @ngInject */
export function PaypalFactory($window: IWindowService) {
  return $window.paypal
}

