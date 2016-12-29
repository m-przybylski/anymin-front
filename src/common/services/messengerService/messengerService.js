(function() {

  function service($q, $log, UtilsService, communicatorService, callService, soundsService) {

    let room = null

    const events = {
      onClientTyping: 'onClientTyping',
      onClientMark: 'onClientMark',
      onClientMessage: 'onClientMessage',
      onClientNewChat: 'onClientNewChat',
      onExpertTyping: 'onExpertTyping',
      onExpertMark: 'onExpertMark',
      onExpertMessage: 'onExpertMessage',
      onExpertNewChat: 'onExpertNewChat',
      onChatLeft: 'onChatLeft',
      onClientCreatingRoom: 'onClientCreatingRoom',
      onExpertCreatedRoom: 'onExpertCreatedRoom'
    }

    const callbacks = UtilsService.callbacksFactory(Object.keys(events))

    const _leaveRoom = () => {
      room = null
      callbacks.notify(events.onChatLeft, null)
    }

    const getHistory = () => {
      if (room) {
        return room.getHistory()
      } else {
        return $q.reject('No room')
      }
    }

    const getUsers = () => {
      if (room) {
        return room.getUsers()
      } else {
        return $q.reject('No room')
      }
    }

    const getMark = () => {
      if (room) {
        return room.getMark()
      } else {
        return $q.reject('No room')
      }
    }

    const indicateTyping = () => {
      if (room) {
        return room.indicateTyping()
      } else {
        return $q.reject('No room')
      }
    }

    const sendMessage = (_msg) => {
      if (room) {
        return room.send(_msg)
      } else {
        return $q.reject('No room')
      }
    }

    const mark = (_timestamp) => {
      if (room) {
        return room.mark(_timestamp)
      } else {
        return $q.reject('No room')
      }
    }

    const _onExpertTyping = () =>
      callbacks.notify(events.onExpertTyping, null)

    const _onExpertMark = () =>
      callbacks.notify(events.onExpertMark, null)

    const _onExpertMessage = (message) => {
      soundsService.playMessageNew()
      callbacks.notify(events.onExpertMessage, message)
    }

    const _onExpertCreateDirectRoom = (_room) => {
      if (_room) {
        room = _room
        room.onMessage(_onExpertMessage)
        room.onTyping(_onExpertTyping)
        room.onMark(_onExpertMark)
        callbacks.notify(events.onExpertCreatedRoom)
      }
    }

    const _onExpertCreateDirectRoomError = (err) =>
      $log.error(err)

    const _createExpertDirectRoom = (serviceInvitationTuple) => {
      if (room) {
        $log.error('Message room already exists')
        return void(0)
      }

      const session = communicatorService.findExpertSession(serviceInvitationTuple.service.id)

      if (typeof session !== 'object' || !session) {
        $log.error('There is no expert session')
      }

      return session.chat.createDirectRoom(serviceInvitationTuple.invitation.inviter)
        .then(_onExpertCreateDirectRoom, _onExpertCreateDirectRoomError)
    }

    const _onClientTyping = () =>
      callbacks.notify(events.onClientTyping, null)

    const _onClientMark = () =>
      callbacks.notify(events.onClientMark, null)

    const _onClientMessage = (message) => {
      soundsService.playMessageNew()
      callbacks.notify(events.onClientMessage, message)
    }

    const _onClientCreateDirectRoom = (_room) => {
      if (_room) {
        room = _room
        room.onTyping(_onClientTyping)
        room.onMark(_onClientMark)
        room.onMessage(_onClientMessage)
      }
    }

    const _onClientCreateDirectRoomError = (err) =>
      $log.error(err)

    const _createClientDirectRoom = (_ratelId) => {
      if (room) {
        $log.error('Message room already exists')
        return void(0)
      }

      const session = communicatorService.getClientSession()

      if (session) {
        session.chat.createDirectRoom(_ratelId)
          .then(_onClientCreateDirectRoom, _onClientCreateDirectRoomError)
      } else {
        $log.error('Session is empty')
      }
    }

    const _onClientCreatingRoom = serviceUsageRequest =>
      callbacks.notify(events.onClientCreatingRoom, serviceUsageRequest.expert)

    callService.onClientCallStarted(_createClientDirectRoom)

    callService.onExpertCallAnswered(_createExpertDirectRoom)

    callService.onClientCallPending(_onClientCreatingRoom)

    callService.onCallEnd(_leaveRoom)

    const api = {
      getHistory: getHistory,
      getUsers: getUsers,
      getMark: getMark,
      sendMessage: sendMessage,
      indicateTyping: indicateTyping,
      mark: mark
    }

    return angular.extend(api, callbacks.methods)
  }

  angular.module('profitelo.services.messenger', [
    'profitelo.services.communicator',
    'profitelo.services.utils',
    'profitelo.services.call',
    'profitelo.services.sounds'
  ])
    .service('messengerService', service)

}())
