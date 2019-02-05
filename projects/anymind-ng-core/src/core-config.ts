export interface IUrls {
  files: string;
  fileDownload: string;
  fileUpload: string;
}

export class CoreConfig {
  public urls: {
    files: string;
    fileDownload: string;
    fileUpload: string;
  };

  constructor(urls: IUrls) {
    this.urls = urls;
  }
}
