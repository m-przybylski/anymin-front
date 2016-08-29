(function() {

  /* @ngInject */
  function controllerFunction() {

    this.activeOption = -1

    this.bankList = [
      {
        name: 'Nazwa Banku',
        img: 'https://www.payu.pl/sites/payupoland/files/styles/article_list_medium/public/payu_logo_solid_lime_rgb.jpg?itok=hAlLaoh0'
      },
      {
        name: 'Nazwa Banku',
        img: 'https://www.payu.pl/sites/payupoland/files/styles/article_list_medium/public/payu_logo_solid_lime_rgb.jpg?itok=hAlLaoh0'
      },
      {
        name: 'Nazwa Banku',
        img: 'https://www.payu.pl/sites/payupoland/files/styles/article_list_medium/public/payu_logo_solid_lime_rgb.jpg?itok=hAlLaoh0'
      },
      {
        name: 'Nazwa Banku',
        img: 'https://www.payu.pl/sites/payupoland/files/styles/article_list_medium/public/payu_logo_solid_lime_rgb.jpg?itok=hAlLaoh0'
      },
      {
        name: 'Nazwa Banku',
        img: 'https://www.payu.pl/sites/payupoland/files/styles/article_list_medium/public/payu_logo_solid_lime_rgb.jpg?itok=hAlLaoh0'
      },
      {
        name: 'Nazwa Banku',
        img: 'https://www.payu.pl/sites/payupoland/files/styles/article_list_medium/public/payu_logo_solid_lime_rgb.jpg?itok=hAlLaoh0'
      },
      {
        name: 'Nazwa Banku',
        img: 'https://www.payu.pl/sites/payupoland/files/styles/article_list_medium/public/payu_logo_solid_lime_rgb.jpg?itok=hAlLaoh0'
      },
      {
        name: 'Nazwa Banku',
        img: 'https://www.payu.pl/sites/payupoland/files/styles/article_list_medium/public/payu_logo_solid_lime_rgb.jpg?itok=hAlLaoh0'
      },
      {
        name: 'Nazwa Banku',
        img: 'https://www.payu.pl/sites/payupoland/files/styles/article_list_medium/public/payu_logo_solid_lime_rgb.jpg?itok=hAlLaoh0'
      },
      {
        name: 'Nazwa Banku',
        img: 'https://www.payu.pl/sites/payupoland/files/styles/article_list_medium/public/payu_logo_solid_lime_rgb.jpg?itok=hAlLaoh0'
      },
      {
        name: 'Nazwa Banku',
        img: 'https://www.payu.pl/sites/payupoland/files/styles/article_list_medium/public/payu_logo_solid_lime_rgb.jpg?itok=hAlLaoh0'
      },
      {
        name: 'Nazwa Banku',
        img: 'https://www.payu.pl/sites/payupoland/files/styles/article_list_medium/public/payu_logo_solid_lime_rgb.jpg?itok=hAlLaoh0'
      }
    ]

    return this
  }

  let chooseBank = {
    templateUrl: 'components/dashboard/charge-account/choose-bank/choose-bank.tpl.html',
    restrict: 'E',
    replace: true,
    bindings: {
      title: '@'
    },
    controller: controllerFunction,
    controllerAs: 'vm'
  }


  angular.module('profitelo.components.dashboard.charge-account.choose-bank', [])
    .component('chooseBank', chooseBank)

}())
