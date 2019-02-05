export class FileUploader {
  public static upload(
    file: File,
    url: string,
    cb?: (abort: () => void) => void,
    onProgress?: (progress: ProgressEvent) => void,
  ): Promise<ProgressEvent> {
    const ajax = new XMLHttpRequest();
    const abort = (): void => {
      ajax.abort();
    };

    if (typeof cb === 'function') {
      cb(abort);
    }
    const formData = new FormData();
    formData.append('file', file);

    return new Promise(
      (resolve, reject): void => {
        if (onProgress) {
          ajax.upload.addEventListener('progress', onProgress, false);
        }
        ajax.addEventListener('load', resolve as EventListenerOrEventListenerObject, false);
        ajax.addEventListener('error', reject, false);
        ajax.addEventListener('abort', reject, false);
        ajax.open('POST', url);
        ajax.send(formData);
      },
    );
  }
}
