/* istanbul ignore next */
declare var exports: any
declare var module: any
(function (angular) {
  'use strict'

  angular
    .module('commonConfig', [])
    .provider('CommonConfig', function () {
    var _settings = Object({"urls":{"frontend":"https://dev.profitelo.pl","backend":"https://api.dev.profitelo.pl","ws":"wss://api.dev.profitelo.pl","files":"https://files.dev.profitelo.pl","password-reset":"/login/set-new-password/token/%s/","email-confirm":"/login/confirm-email/token/%s","file-upload":"/files/%s/upload","file-download":"/files/%s/download","service-invitations":"/dashboard/invitations","payu-continue":"/dashboard/payments-thank-you-page?amount=%s&currency=%s","communicator":{"ratel":"https://profitelo.briefcase.ratel.io","chat":"https://profitelo.artichoke.ratel.io","resource":"https://profitelo.wheelhouse.ratel.io"}},"validation":{"msisdn-token":{"regex":"[0-9]{4}"},"pin":{"regex":"[0-9]{4}"},"password":{"regex":"[ -~]{8,64}"},"email":{"regex":"([a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+)@([a-zA-Z0-9-]+)\\.([a-zA-Z.]+)"}},"config":{"country-codes":["+48","+49"],"supported-languages":[{"shortcut":"pl","name":"Polish","native-name":"polski"},{"shortcut":"en","name":"English","native-name":"English"},{"shortcut":"ru","name":"Russian","native-name":"русский язык"},{"shortcut":"pt","name":"Portuguese","native-name":"Português"},{"shortcut":"ja","name":"Japanese","native-name":"日本語 (にほんご／にっぽんご)"},{"shortcut":"it","name":"Italian","native-name":"Italiano"},{"shortcut":"hu","name":"Hungarian","native-name":"Magyar"},{"shortcut":"de","name":"German","native-name":"Deutsch"},{"shortcut":"el","name":"Greek","native-name":"Ελληνικά"},{"shortcut":"fr","name":"French","native-name":"français, langue française"},{"shortcut":"hr","name":"Croatian","native-name":"hrvatski"},{"shortcut":"cs","name":"Czech","native-name":"česky, čeština"},{"shortcut":"da","name":"Danish","native-name":"dansk"},{"shortcut":"zh","name":"Chinese","native-name":"中文 (Zhōngwén), 汉语, 漢語"},{"shortcut":"bg","name":"Bulgarian","native-name":"български език"},{"shortcut":"ar","name":"Arabic","native-name":"العربية"}]}})

      var getAllData =  function () {
        return angular.copy(_settings)
      }

      var setData = function (data: any) {
        angular.extend(_settings, data)
        return _settings
      }

      return {
        'getAllData': getAllData,
        'setData': setData,
        '$get': function () {
          return {
            'getAllData': getAllData,
            'setData': setData
          }
        }
      }
    })

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = 'commonConfig'
    }
    exports = 'commonConfig'
  }
}(angular))

