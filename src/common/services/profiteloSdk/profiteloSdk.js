(function() {

  function service($log, UtilsService) {

    const socket = new WebSocket('ws://localhost:8080/ws/register')

    const events = {
    }

    socket.onopen = (event) => {
      var msg = {
        type: 'message',
        text: 'test text',
        date: Date.now()
      }
      socket.send(JSON.stringify(msg))
    }

    socket.onmessage = (event) => {
      $log.log(event)
    }

    const callbacks = UtilsService.callbacksFactory(Object.keys(events))

    const api = {
    }

    return angular.extend(api, callbacks.methods)
  }

  angular.module('profitelo.services.profitelo-sdk', [
    'profitelo.services.utils'
  ])
    .service('profiteloSdk', service)

}())