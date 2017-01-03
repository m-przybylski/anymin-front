(function() {
  function ConsultationsFieldController() {

    this.tags = [{
      name: 'tag1'
    }, {
      name: 'tag2'
    }]

    this.controlls = {}

    this.nextSlide = () => {
      this.controlls.nextSlide()
    }

    this.prevSlide = () => {
      this.controlls.prevSlide()
    }


    this.expertCard = [
      {
        id: '0',
        value: {
          name: '1 Slide',
          status: 'not-available',
          avatar: 'https://placekitten.com/50/50',
          description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
        }
      },
      {
        id: '1',
        value: {
          name: '2 Slide',
          status: 'not-available',
          avatar: 'https://placekitten.com/50/50',
          description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
        }
      },
      {
        id: '2',
        value: {
          name: '3 Slide',
          status: 'not-available',
          avatar: 'https://placekitten.com/50/50',
          description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
        }
      },
      {
        id: '3',
        value: {
          name: '4 Slide',
          status: 'not-available',
          avatar: 'https://placekitten.com/50/50',
          description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
        }
      },
      {
        id: '4',
        value: {
          name: '5 Slide',
          status: 'available',
          avatar: 'https://placekitten.com/50/50',
          description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
        }
      },
      {
        id: '5',
        value: {
          name: '6 Slide',
          status: 'not-available',
          avatar: 'https://placekitten.com/50/50',
          description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
        }
      },
      {
        id: '6',
        value: {
          name: '7 Slide',
          status: 'not-available',
          avatar: 'https://placekitten.com/50/50',
          description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
        }
      },
      {
        id: '7',
        value: {
          name: '8 Slide',
          status: 'not-available',
          avatar: 'https://placekitten.com/50/50',
          description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
        }
      },
      {
        id: '8',
        value: {
          name: '9 Slide',
          status: 'available',
          avatar: 'https://placekitten.com/50/50',
          description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
        }
      },
      {
        id: '9',
        value: {
          name: '10 Slide',
          status: 'available',
          avatar: 'https://placekitten.com/50/50',
          description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
        }
      }
    ]
    return this
  }

  angular.module('profitelo.controller.consultations-field', [
    'ui.router',
    'c7s.ng.userAuth',
    'profitelo.directives.pro-footer',
    'profitelo.components.pro-search-dropdown',
    'profitelo.directives.pro-tags-slider',
    'profitelo.components.interface.card-slider'
  ])
  .config(function($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.consultations-field', {
      url: '/consultations-field/{fieldId:int}',
      templateUrl: 'consultations-field/consultations-field.tpl.html',
      controller: 'ConsultationsFieldController',
      controllerAs: 'vm',
      data: {
        access: UserRolesProvider.getAccessLevel('public'),
        pageTitle: 'HOME.FIELD.PAGE_TITLE'
      }
    })
  })
  .controller('ConsultationsFieldController', ConsultationsFieldController)
}())
