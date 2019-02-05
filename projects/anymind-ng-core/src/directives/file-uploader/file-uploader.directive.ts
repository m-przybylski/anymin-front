import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { LoggerFactory } from '../../factories/logger.factory';
import { Config } from '../../config';
import { MessengerInputUploadStatus } from '../../components/communicator/messenger/maximized/messenger-input/messenger-input.component';

@Directive({
  selector: '[platFileUploader]',
})
export class FileUploaderDirective {
  @Output()
  public uploadFile = new EventEmitter<File>();
  @Output()
  public fileError = new EventEmitter<string>();

  private logger: LoggerService;

  constructor(loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('FileUploaderDirective');
  }

  @HostListener('change', ['$event'])
  public inputChanged(event: Event): void {
    const targetElement: HTMLInputElement | null = event.target as HTMLInputElement | null;
    const files = targetElement && targetElement.files;
    if (files === null) {
      return;
    }
    this.checkValidity(files);
  }

  @HostListener('click', ['$event'])
  public inputClick(event: MouseEvent): void {
    const targetElement: HTMLInputElement | null = event.target as HTMLInputElement | null;
    if (targetElement && targetElement.value) {
      targetElement.value = '';
    }
  }

  private onUploadFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (): void => {
      this.uploadFile.emit(file);
    };

    reader.onerror = (err): void => {
      this.logger.error('Can not read file', err);
      this.fileError.emit('FEATURE.COMMUNICATOR.MESSENGER.UPLOAD_ERROR.SOMETHING_WENT_WRONG');
    };

    reader.readAsDataURL(file);
  }

  private checkValidity(files: FileList): void {
    const status = this.determineUploadStatus(files);

    switch (status) {
      case MessengerInputUploadStatus.UPLOADING:
        this.logger.debug('Uploading file');
        this.onUploadFile(files[0]);
        break;

      case MessengerInputUploadStatus.TO_BIG_SIZE:
        this.fileError.emit('FEATURE.COMMUNICATOR.MESSENGER.UPLOAD_ERROR.TO_BIG_SIZE');
        break;

      case MessengerInputUploadStatus.TO_SMALL_SIZE:
        this.fileError.emit('FEATURE.COMMUNICATOR.MESSENGER.UPLOAD_ERROR.TO_SMALL_SIZE');
        break;

      case MessengerInputUploadStatus.ERROR:
        this.fileError.emit('FEATURE.COMMUNICATOR.MESSENGER.UPLOAD_ERROR.SOMETHING_WENT_WRONG');
        break;

      default:
        this.logger.error('Unhandled error');
        this.fileError.emit('FEATURE.COMMUNICATOR.MESSENGER.UPLOAD_ERROR.SOMETHING_WENT_WRONG');
    }
  }

  private determineUploadStatus(files: FileList | null): MessengerInputUploadStatus {
    if (files === null || !files[0]) {
      return MessengerInputUploadStatus.ERROR;
    }
    if (this.isAbleToUpload(files)) {
      return MessengerInputUploadStatus.UPLOADING;
    }

    if (!this.isFileMaxSizeValid(files)) {
      return MessengerInputUploadStatus.TO_BIG_SIZE;
    }
    if (!this.isFileMinSizeValid(files)) {
      return MessengerInputUploadStatus.TO_SMALL_SIZE;
    }
    this.logger.error('Cannot determine upload status, setting default to Error');

    return MessengerInputUploadStatus.ERROR;
  }

  private isAbleToUpload(files: FileList): boolean {
    return files[0] && this.isFileMaxSizeValid(files) && this.isFileMinSizeValid(files);
  }

  private isFileMaxSizeValid(files: FileList): boolean {
    return files[0].size < Config.filesUpload.maxSize;
  }

  private isFileMinSizeValid(files: FileList): boolean {
    return files[0].size >= Config.filesUpload.minSize;
  }
}
