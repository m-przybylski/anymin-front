(function() {

  function service($log, $rootScope, $timeout, UtilsService, CommonConfig) {

    const reconnectTimeout = 1000

    const events = {
      onCallSummary: 'onCallSummary',
      onInit: 'onInit'
    }

    const services = {
      callSummary: 'callSummary'
    }

    const callbacks = UtilsService.callbacksFactory(Object.keys(events))

    const _commonConfig = CommonConfig.getAllData()

    const wsEndpoint = _commonConfig.urls.ws + '/ws/register'

    let websocket = null

    const onSocketOpen = () => {
      callbacks.notify(events.onInit, null)
    }

    const handleMessageType = (data) => {
      const type = data.messageType
      const value = data.value

      switch (type) {
        case 'CallSummaryEvent':
          callbacks.notify(events.onCallSummary, value)
          break

        default:
          $log.info('Unknown messageType ' + type)
          break
      }
    }

    const sendMessage = (msg, type) => {
      if (!services.hasOwnProperty(type)) {
        $log.error('Unrecognized service, got: ' + type)
        return false
      }

      if (websocket.readyState === WebSocket.OPEN) {
        const serialized = {
          messageType: type,
          value: msg
        }
        websocket.send(JSON.stringify(serialized))
        return true
      } else {
        $log.error('Can not send message, websocket is closed. State: ' + websocket.readyState)
        return false
      }
    }

    const onSocketMessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        handleMessageType(data)
      } catch(err) {
        $log.error(err)
      }
      $log.debug(event)
    }

    const onSocketError = (err) =>
      $log.error(err)


    const cleanEvents = () => {
      websocket.onopen = null
      websocket.onmessage = null
      websocket.onerror = null
      websocket.onclose = null
    }

    const onSocketClose = (event) => {
      $log.info('Profitelo websocket closed', event)
      cleanEvents()
      $timeout(connectWebsocket, reconnectTimeout)
    }

    const connectWebsocket = () => {
      if (!$rootScope.loggedIn) {
        $timeout(connectWebsocket, reconnectTimeout)
        return
      }

      websocket = new WebSocket(wsEndpoint)
      websocket.onopen = onSocketOpen
      websocket.onmessage = onSocketMessage
      websocket.onerror = onSocketError
      websocket.onclose = onSocketClose
    }

    connectWebsocket()

    const api = {
      sendMessage: sendMessage
    }

    return angular.extend(api, callbacks.methods)
  }

  angular.module('profitelo.services.profitelo-websocket', [
    'profitelo.services.utils',
    'commonConfig'
  ])
    .service('profiteloWebsocket', service)

}())