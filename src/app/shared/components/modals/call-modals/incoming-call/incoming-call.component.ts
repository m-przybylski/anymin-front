import { Component, Inject } from '@angular/core';
import { AvatarSize, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { INCOMING_CALL, IncomingCallData } from '@platform/shared/components/modals/call-modals/incoming-call/token';

@Component({
  selector: 'plat-incoming-call',
  templateUrl: './incoming-call.component.html',
  styleUrls: ['./incoming-call.component.sass'],
})
export class CreateIncomingCallComponent extends Logger {
  public readonly AvatarSizeEnum: typeof AvatarSize = AvatarSize;
  public serviceName: string;
  public isConnecting = true;
  public clientAvatar?: string;
  public clientName?: string;

  public answerCall: () => void;
  public rejectCall: () => void;

  constructor(loggerFactory: LoggerFactory, @Inject(INCOMING_CALL) incomingCallData: IncomingCallData) {
    super(loggerFactory.createLoggerService('CreateIncomingCallComponent'));
    this.serviceName = incomingCallData.serviceName;
    this.clientAvatar = incomingCallData.clientAvatar;
    this.clientName = incomingCallData.clientName;
  }
}
