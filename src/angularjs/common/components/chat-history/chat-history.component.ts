import { ChatHistoryComponentController } from './chat-history.controller';

export class ChatHistoryComponent {
  template = require('./chat-history.html');
  controller: ng.Injectable<ng.IControllerConstructor> = ChatHistoryComponentController;
  bindings: { [boundProperty: string]: string } = {
    roomId: '<'
  };
}
