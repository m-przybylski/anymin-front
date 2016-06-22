(function() {

  function proMasonry() {
    return {
      restrict: 'A',
      link: function (scope, el, attr){
        angular.element(document).ready(function (){
          var elem = document.querySelector('.grid')
          var msnry = new Masonry( elem, {
            itemSelector: '.grid-item'
          })
        })
      }
    }
  }

  angular.module('profitelo.directives.pro-masonry', [])
  .directive('proMasonry', proMasonry)
}())
