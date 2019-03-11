import { WebSocketSubject, webSocket, WebSocketSubjectConfig } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';
import { LoggerService } from '@anymind-ng/core';

export class WebSocketService<T> {
  private webSocket: WebSocketSubject<string>;
  private _messages: Subject<T> = new Subject<T>();

  private readonly config: WebSocketSubjectConfig<T> = {
    url: '',
    // this is default serializer. There might be a need to add new one
    // tslint:disable-next-line:no-any
    serializer: (value: any): string => JSON.stringify(value),
    // this is default deserializer. There might be a need to add new one
    deserializer: (e: MessageEvent): T => JSON.parse(e.data),
    // observers on specific events
    openObserver: {
      next: (): void => {
        this.onOpen();
      },
    },
    closeObserver: {
      next: (): void => {
        this.onClosed();
      },
    },
    closingObserver: {
      next: (): void => {
        this.onClosing();
      },
    },
  };

  constructor(private logger: LoggerService, private endpointUrl: string) {
    this.webSocket = this.connect({ ...this.config, url: this.endpointUrl });
  }

  // tslint:disable-next-line:no-any
  public sendMessage = (message: any): void => {
    try {
      this.webSocket.next(JSON.stringify(message));
    } catch (error) {
      this.logger.error('Con not stringify message', error);
    }
  };

  public get messages(): Observable<T> {
    return this._messages.asObservable();
  }

  public disconnectWithoutSideEffects = (): void => {
    if (this.webSocket) {
      this.webSocket.unsubscribe();
      // tslint:disable-next-line
      delete this.webSocket;
    }
  };

  // tslint:disable-next-line:no-any
  private connect = (config: WebSocketSubjectConfig<T>): WebSocketSubject<any> => {
    // create webSocket object not subscribed yet
    const ws = webSocket(config);
    ws.subscribe({
      next: (data: T): void => {
        this._messages.next(data);
      },
      // tslint:disable-next-line:no-any
      error: (error: any): void => {
        this.logger.error(error);
      },
      complete: (): void => {
        this.logger.info('Closed by remote host');
      },
    });

    return ws;
  };

  private onOpen = (): void => {
    this.logger.info('Socked opened');
  };
  private onClosed = (): void => {
    this.logger.info('Socket closed');
  };

  private onClosing = (): void => {
    this.logger.info('Socket closed');
  };
}
