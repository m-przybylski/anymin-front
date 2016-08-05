(function() {
  function FieldController() {
    this.expertCard = [
      {
        name: 'Pierwszy Slide',
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
        name: 'Środkowy Slide',
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
      },
      {
        name: 'Ostatni',
        status: 'available'
      }
    ]


    return this
  }

  angular.module('profitelo.controller.field', [
    'ui.router',
    'c7s.ng.userAuth',
    'profitelo.directives.field.field-search',
    'profitelo.directives.pro-footer',
    'profitelo.components.interface.mouse-slider'
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
