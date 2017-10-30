import * as angular from 'angular'
import {SoundsService} from '../../../services/sounds/sounds.service'
import {CallbacksFactory} from '../../../services/callbacks/callbacks.factory'
import callbacksModule from '../../../services/callbacks/callbacks'
import {MessageRoom} from './message-room'
import {roomType} from 'ratel-sdk-js'
import * as RatelSdk from 'ratel-sdk-js';

describe('Unit tests: MessageRoom', () => {

  let messageRoom: MessageRoom
  let q: ng.IQService
  const callbacksFactory: CallbacksFactory = <CallbacksFactory>{
    getInstance:(_keys: string[]) => {
      return  <any>{
        methods: {
          onTyping: (cb: () => void) => {cb()},
          onMark: (cb: () => void) => {cb()},
          onMessage: (cb: () => void) => {cb()}
        }
      }
    }
  }

  const businessRoom: RatelSdk.BusinessRoom = <any>{
    roomType: roomType.RoomType.BUSINESS,
    onTyping: () => {},
    onMark: () => {},
    onCustom: () => {},
    onInvited: () => {},
    join: () => {},
    setMark: () => {},
    sendCustom: () => {},
    getMessages: () => {}
  }


  beforeEach(() => {
    angular.mock.module(callbacksModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
    $provide.value('soundsService', SoundsService)
  }))

  beforeEach((inject((soundsService: SoundsService,
                      $q: ng.IQService) => {
    q = $q
    messageRoom = new MessageRoom(callbacksFactory, soundsService)
    messageRoom.setRoom(businessRoom)
  })))

  it('should currentClientCall exist', () => {
    expect(MessageRoom).toBeTruthy()
  })

  it('should call callback onTyping function called', () => {
    const callBack = jasmine.createSpy('callBack', () => {})
    messageRoom.onTyping(callBack)
    expect(callBack).toHaveBeenCalled()
  })

  it('should call callback onMark function called', () => {
    const callBack = jasmine.createSpy('callBack', () => {})
    messageRoom.onMark(callBack)
    expect(callBack).toHaveBeenCalled()
  })

  it('should call callback onMessage function called', () => {
    const callBack = jasmine.createSpy('callBack', () => {})
    messageRoom.onMessage(callBack)
    expect(callBack).toHaveBeenCalled()
  })

  it('should call setMark from room', () => {
    spyOn(businessRoom, 'setMark')
    messageRoom.mark(123)
    expect(businessRoom.setMark).toHaveBeenCalled()
  })

  it('should call send message ', () => {
    spyOn(businessRoom, 'sendCustom')
    messageRoom.sendMessage('msg', {})
    expect(businessRoom.sendCustom).toHaveBeenCalled()
  })

  it('should get chat history', () => {
    spyOn(businessRoom, 'getMessages')
    messageRoom.getHistory()
    expect(businessRoom.getMessages).toHaveBeenCalled()
  })

})
