import { Component, Inject } from '@angular/core';
import { AvatarSize, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { INCOMING_CALL, IncomingCallData } from '@platform/shared/components/modals/call-modals/incoming-call/token';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'plat-incoming-call',
  templateUrl: './incoming-call.component.html',
  styleUrls: ['./incoming-call.component.sass'],
})
export class CreateIncomingCallComponent extends Logger {
  public readonly AvatarSizeEnum: typeof AvatarSize = AvatarSize;
  public serviceName: string;
  public isConnecting = true;

  constructor(
    private activeModal: NgbActiveModal,
    loggerFactory: LoggerFactory,
    @Inject(INCOMING_CALL) incomingCallData: IncomingCallData,
  ) {
    super(loggerFactory);
    this.serviceName = incomingCallData.serviceName;
  }

  public rejectCall = (): void => {
    this.activeModal.dismiss();
  };

  public answerCall = (): void => {
    this.activeModal.close();
  };
}
