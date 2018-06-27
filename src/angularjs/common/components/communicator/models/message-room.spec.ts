import * as angular from 'angular';
import { SoundsService } from '../../../services/sounds/sounds.service';
import { MessageRoom } from './message-room';
import { RoomType, BusinessRoom } from 'ratel-sdk-js';
import { EMPTY } from 'rxjs';

describe('Unit tests: MessageRoom', () => {

  let messageRoom: MessageRoom;

  const businessRoom: BusinessRoom = <any>{
    roomType: RoomType.BUSINESS,
    typing$: EMPTY,
    marked$: EMPTY,
    customMessage$: EMPTY,
    getCustomMessageStream: () => EMPTY,
    invited$: EMPTY,
    join: () => {},
    setMark: () => {},
    sendCustom: () => {},
    getMessages: () => {}
  };

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL');
    $provide.value('soundsService', SoundsService);
  }));

  beforeEach((inject(() => {
    messageRoom = new MessageRoom(businessRoom);
  })));

  it('should currentClientCall exist', () => {
    expect(MessageRoom).toBeTruthy();
  });

  it('should call setMark from room', () => {
    spyOn(businessRoom, 'setMark');
    messageRoom.mark(123);
    expect(businessRoom.setMark).toHaveBeenCalled();
  });

  it('should call send message ', () => {
    spyOn(businessRoom, 'sendCustom');
    messageRoom.sendMessage('msg', {});
    expect(businessRoom.sendCustom).toHaveBeenCalled();
  });

  it('should get chat history', () => {
    spyOn(businessRoom, 'getMessages');
    messageRoom.getHistory(0, 100);
    expect(businessRoom.getMessages).toHaveBeenCalled();
  });

});
