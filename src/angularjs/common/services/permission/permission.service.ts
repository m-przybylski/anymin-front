// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:no-any
import { UserService } from '../user/user.service';
import { Account } from '@anymind-ng/api';

// tslint:disable:member-ordering
export class PermissionService {
  public static $inject = ['PermRoleStore', 'PermPermissionStore', '$q', 'userService'];

  constructor(
    private PermRoleStore: ng.permission.RoleStore,
    private PermPermissionStore: ng.permission.PermissionStore,
    private $q: ng.IQService,
    private userService: UserService,
  ) {}

  public initializeAll = (): void => {
    this.initializeRoles();
    this.initializePermissions();
  };

  private initializeRoles = (): void => {
    this.PermRoleStore.defineRole('user', <any>((): ng.IPromise<Account> => this.userService.getUser()));

    this.PermRoleStore.defineRole('anon', <any>(
      ((): ng.IPromise<void> => this.userService.getUser().then(() => this.$q.reject(), () => this.$q.resolve()))
    ));

    this.PermRoleStore.defineRole('partially-registered', <any>(
      ((): ng.IPromise<void> =>
        this.userService
          .getUser()
          .then(user => (user.email && user.hasPassword ? this.$q.reject() : this.$q.resolve())))
    ));
  };

  private initializePermissions = (): void => {
    this.PermPermissionStore.definePermission('without-email', () =>
      this.userService.getUser().then(user => (!user.email ? this.$q.resolve() : this.$q.reject())),
    );

    this.PermPermissionStore.definePermission(
      'without-password',
      (): ng.IPromise<void> =>
        this.userService.getUser().then(user => (user.hasPassword ? this.$q.reject() : this.$q.resolve())),
    );
  };
}
