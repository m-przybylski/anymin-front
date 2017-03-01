// TODO: add tests
/* istanbul ignore next */
(function() {
  function clientController($state: ng.ui.IStateService, $scope: ng.IScope) {

    const getRealStateName = (string: string) => {
      const stringsArray = string.split('.')
      return stringsArray[3]
    }

    this.stateNames = {}

    const defineStateProperties = (obj: any) => {
      return Object.defineProperties(obj, {
        _favourites: {
          enumerable: false,
          writable: true,
          value: false
        },

        favourites: {
          enumerable: true,
          get: function () {
            return this._favourites
          },
          set: function (v) {
            if (v !== this._favourites) {
              this._favourites = v
              this._activities = !this._favourites
            }
          }
        },

        _activities: {
          enumerable: false,
          writable: true,
          value: false
        },

        activities: {
          enumerable: true,
          get: function () {
            return this._activities
          },
          set: function (v) {
            if (v !== this._activities) {
              this._activities = v
              this._favourites = !this._activities
            }
          }
        }
      })
    }

    defineStateProperties(this.stateNames)
    this.stateNames[getRealStateName($state.current.name || '')] = true

    $scope.$watch(() => {
      return (<any>$state.$current).name
    },(newVal: string, _oldVal: string) => {
      if (newVal) {
        this.stateNames[getRealStateName(newVal)] = true
      }
    })

    return this
  }

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state('app.dashboard.client', {
      abstract: true,
      url: '/client',
      controllerAs: 'vm',
      controller: 'clientController',
      templateUrl: 'dashboard/client/client.tpl.html',
      data: {
        pageTitle: 'PAGE_TITLE.CLIENT_DASHBOARD',
        showMenu: false
      }
    })
  }

  angular.module('profitelo.controller.dashboard.client', [
    'ui.router',
    'ngTouch',
    'profitelo.services.session',
    'profitelo.components.dashboard.client.navigation'
  ])
    .config(config)
    .controller('clientController', clientController)

}())
