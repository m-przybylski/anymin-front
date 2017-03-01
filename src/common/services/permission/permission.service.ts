namespace profitelo.services.permission {

  import IUserService = profitelo.services.user.IUserService

  export interface IPermissionService {
    initializeAll(): void
  }

  class PermissionService implements IPermissionService {

    constructor(private PermRoleStore: ng.permission.RoleStore,
                private PermPermissionStore: ng.permission.PermissionStore,
                private $q: ng.IQService, private userService: IUserService) {
    }

    public initializeAll = () => {
      this.initializeRoles()
      this.initializePermissions()
    }

    private initializeRoles = () => {

      this.PermRoleStore.defineRole('user', <any>(() => {
        return this.userService.getUser()
      }))

      this.PermRoleStore.defineRole('anon', <any>(() => {
        return this.userService.getUser().then(() => this.$q.reject(), () => this.$q.resolve())
      }))

      this.PermRoleStore.defineRole('partially-registered', <any>(() => {
        return this.userService.getUser().then(user => {
          return (user.email && user.hasPassword) ? this.$q.reject() : this.$q.resolve()
        })
      }))
    }

    private initializePermissions = () => {
      this.PermPermissionStore.definePermission('without-email', () => {
        return this.userService.getUser().then(user => {
          return (!user.email) ? this.$q.resolve() : this.$q.reject()
        })
      })

      this.PermPermissionStore.definePermission('without-password', () => {
        return this.userService.getUser().then(user => {
          return (user.hasPassword) ? this.$q.reject() : this.$q.resolve()
        })
      })
    }
  }

  angular.module('profitelo.services.permission', [
    'permission'
  ])
    .service('permissionService', PermissionService)
}
