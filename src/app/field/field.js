(function() {

  function FieldController() {

    this.expertCard = [
      {
        name: 'Ragnar Lodbrok',
        status: 'available'
      },
      {
        name: 'Penelope Cruz',
        status: 'not-available'
      },
      {
        name: 'Ragnar Lodbrok',
        status: 'available'
      },
      {
        name: 'Ragnar Lodbrok',
        status: 'available'
      },
      {
        name: 'Ragnar Lodbrok',
        status: 'available'
      },
      {
        name: 'Ragnar Lodbrok',
        status: 'available'
      },
      {
        name: 'Ragnar Lodbrok',
        status: 'available'
      }
    ]

    return this
  }


  angular.module('profitelo.controller.field', [
    'ui.router',
    'c7s.ng.userAuth',
    'profitelo.directives.field.field-search',
    'profitelo.directives.pro-footer'
  ])
    .config( function($stateProvider, UserRolesProvider) {
      $stateProvider.state('app.field', {
        url:          '/field/{fieldId:int}',
        templateUrl:  'field/field.tpl.html',
        controller:   'FieldController',
        controllerAs: 'vm',
        data : {
          access : UserRolesProvider.getAccessLevel('public'),
          pageTitle: 'PAGE_TITLE.SEARCH_RESULT'
        }
      })
    })
    .controller('FieldController', FieldController)

}())
