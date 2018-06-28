// tslint:disable:no-require-imports
import { ChatHistoryComponentController } from './chat-history.controller';

// tslint:disable:member-ordering
export class ChatHistoryComponent {
  public template = require('./chat-history.html');
  public controller: ng.Injectable<ng.IControllerConstructor> = ChatHistoryComponentController;
  public bindings: { [boundProperty: string]: string } = {
    roomId: '<'
  };
}
