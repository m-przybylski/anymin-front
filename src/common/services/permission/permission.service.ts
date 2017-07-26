import {UserService} from '../user/user.service'
import {AccountDetails} from 'profitelo-api-ng/model/models';

export class PermissionService {

  /* @ngInject */
  constructor(private PermRoleStore: ng.permission.RoleStore,
              private PermPermissionStore: ng.permission.PermissionStore,
              private $q: ng.IQService, private userService: UserService) {
  }

  public initializeAll = (): void => {
    this.initializeRoles()
    this.initializePermissions()
  }

  private initializeRoles = (): void => {

    this.PermRoleStore.defineRole('user', <any>((): ng.IPromise<AccountDetails> => {
      return this.userService.getUser()
    }))

    this.PermRoleStore.defineRole('anon', <any>((): ng.IPromise<void> => {
      return this.userService.getUser().then(() => this.$q.reject(), () => this.$q.resolve())
    }))

    this.PermRoleStore.defineRole('partially-registered', <any>((): ng.IPromise<void> => {
      return this.userService.getUser().then(user => {
        return (user.email && user.hasPassword) ? this.$q.reject() : this.$q.resolve()
      })
    }))
  }

  private initializePermissions = (): void => {
    this.PermPermissionStore.definePermission('without-email', () => {
      return this.userService.getUser().then(user => {
        return (!user.email) ? this.$q.resolve() : this.$q.reject()
      })
    })

    this.PermPermissionStore.definePermission('without-password', (): ng.IPromise<void> => {
      return this.userService.getUser().then(user => {
        return (user.hasPassword) ? this.$q.reject() : this.$q.resolve()
      })
    })
  }
}
