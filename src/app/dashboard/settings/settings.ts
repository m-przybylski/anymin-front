namespace profitelo.app.dashboard.settings {

  class SettingsController implements ng.IController {

    public stateNames: Object = {}

    constructor(private $state: ng.ui.IStateService, private $scope: ng.IScope) {
      const getRealStateName = (string) => {
        const stringsArray = string.split('.')
        return stringsArray[3]
      }

      this.stateNames = {}

      const defineStateProperties = (obj) => {
        return Object.defineProperties(obj, {
          _general: {
            enumerable: false,
            writable: true,
            value: false
          },

          general: {
            enumerable: true,
            get: function () {
              return this._general
            },
            set: function (v) {
              if (v !== this._general) {
                this._general = v
                this._security = !this._general
              }
            }
          },

          _security: {
            enumerable: false,
            writable: true,
            value: false
          },

          security: {
            enumerable: true,
            get: function () {
              return this._security
            },
            set: function (v) {
              if (v !== this._security) {
                this._security = v
                this._general = !this._security
              }
            }
          }


        })
      }

      defineStateProperties(this.stateNames)
      this.stateNames[getRealStateName($state.current.name)] = true

      // $scope.$watch(() => {
      //   return $state.$current.name
      // },(newVal, oldVal) => {
      //   if (newVal) {
      //     this.stateNames[getRealStateName(newVal)] = true
      //   }
      // })
    }
  }

  function config($stateProvider: ng.ui.IStateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.settings', {
      abstract: true,
      url: '/settings',
      controllerAs: 'vm',
      controller: 'settingsController',
      templateUrl: 'dashboard/settings/settings.tpl.html',
      data: {
        access: UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.CLIENT_DASHBOARD',
        showMenu: false
      }
    })
  }

  angular.module('profitelo.controller.dashboard.settings', [
    'ui.router',
    'ngTouch',
    'c7s.ng.userAuth',
    'profitelo.components.settings.navigation'
  ])
  .config(config)
  .controller('settingsController', SettingsController)
}



//
// // TODO: add tests
// /* istanbul ignore next */
// (function() {
//   function settingsController($state, $scope) {
//
//     const getRealStateName = (string) => {
//       const stringsArray = string.split('.')
//       return stringsArray[3]
//     }
//
//     this.stateNames = {}
//
//     const defineStateProperties = (obj) => {
//       return Object.defineProperties(obj, {
//         _general: {
//           enumerable: false,
//           writable: true,
//           value: false
//         },
//
//         general: {
//           enumerable: true,
//           get: function () {
//             return this._general
//           },
//           set: function (v) {
//             if (v !== this._general) {
//               this._general = v
//               this._security = !this._general
//             }
//           }
//         },
//
//         _security: {
//           enumerable: false,
//           writable: true,
//           value: false
//         },
//
//         security: {
//           enumerable: true,
//           get: function () {
//             return this._security
//           },
//           set: function (v) {
//             if (v !== this._security) {
//               this._security = v
//               this._general = !this._security
//             }
//           }
//         }
//
//
//       })
//     }
//
//     defineStateProperties(this.stateNames)
//     this.stateNames[getRealStateName($state.current.name)] = true
//
//     $scope.$watch(() => {
//       return $state.$current.name
//     },(newVal, oldVal) => {
//       if (newVal) {
//         this.stateNames[getRealStateName(newVal)] = true
//       }
//     })
//
//     return this
//   }
//
//   function config($stateProvider: ng.ui.IStateProvider, UserRolesProvider) {
//     $stateProvider.state('app.dashboard.settings', {
//       abstract: true,
//       url: '/settings',
//       controllerAs: 'vm',
//       controller: 'settingsController',
//       templateUrl: 'dashboard/settings/settings.tpl.html',
//       data: {
//         access: UserRolesProvider.getAccessLevel('user'),
//         pageTitle: 'PAGE_TITLE.CLIENT_DASHBOARD',
//         showMenu: false
//       }
//     })
//   }
//
//   angular.module('profitelo.controller.dashboard.settings', [
//     'ui.router',
//     'ngTouch',
//     'c7s.ng.userAuth',
//     'profitelo.components.settings.navigation'
//   ])
//   .config(config)
//   .controller('settingsController', settingsController)
//
// }())
