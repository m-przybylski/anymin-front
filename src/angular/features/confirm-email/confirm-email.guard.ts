import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {
  LoginConfirmEmailResolver
} from '../../../angularjs/common/resolvers/login-confirm-email/login-confirm-email.service';

@Injectable()
export class ConfirmEmailGuard implements CanActivate {

  canActivate = (route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> =>
    new Promise((resolve, _b): void => {
      this.LoginConfirmEmailResolver.resolve(route.params.token).finally(() => resolve(true))
    });

  constructor(private LoginConfirmEmailResolver: LoginConfirmEmailResolver) {
  }

}
