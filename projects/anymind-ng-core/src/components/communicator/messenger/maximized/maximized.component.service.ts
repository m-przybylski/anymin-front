import { Injectable } from '@angular/core';
import { IUploadFileInfo, UploaderService } from '../../../../services/uploader/uploader.service';
import { PostFileDetails } from '@anymind-ng/api';
import { MessengerService } from '../messeger.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Session } from 'machoke-sdk';
import { CommunicatorService } from '../../../../services/communicator.service';

@Injectable()
export class MaximizedComponentService {
  constructor(
    private uploaderService: UploaderService,
    private communicatorService: CommunicatorService,
    private messengerService: MessengerService,
  ) {}

  public session$ = (): Observable<Session> =>
    this.communicatorService.connectionEstablishedEvent$.pipe(map(connected => connected.session));

  public uploadFile = (
    file: File,
    postProcessOptions: PostFileDetails,
    onProgress: (data: IUploadFileInfo) => void,
  ): Promise<IUploadFileInfo> => this.uploaderService.uploadFile(file, postProcessOptions, onProgress);

  public resetMessages = (): void => this.messengerService.resetMessages();

  public addUnseenMessage = (): void => this.messengerService.addUnseenMessage();
}
