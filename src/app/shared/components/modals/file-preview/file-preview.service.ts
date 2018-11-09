import { Injectable } from '@angular/core';
import { ProfileDocument } from '@anymind-ng/api';
import { LoggerFactory, WindowRef } from '@anymind-ng/core';
import { IFilePreviewDetails, IFileType } from '@platform/shared/components/modals/file-preview/file-preview.component';
import { Logger } from '@platform/core/logger';

@Injectable()
export class FilePreviewService extends Logger {
  private readonly noFileNameTr = 'DASHBOARD.PROFILE.FILES.PREVIEW.NAME';

  constructor(private windowRef: WindowRef, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('FilePreviewService'));
  }

  public printPreview = (imageUrl: ReadonlyArray<string>): void => {
    const nativeWindow = this.windowRef.nativeWindow.open(
      '_blank, top=0, left=0, height=100%, width=100%, fullscreen=yes',
    );
    nativeWindow.document.open();
    nativeWindow.document.write(this.prepareHtmlPageToPrint(imageUrl));
    nativeWindow.document.close();
  };

  public checkTypeOfFile = (file: ProfileDocument): IFilePreviewDetails => {
    switch (file.contentType) {
      case IFileType.IMAGE_JPG:
        return this.prepareImagePreviews(file);

      case IFileType.IMAGE_PNG:
        return this.prepareImagePreviews(file);

      case IFileType.PDF:
        return this.preparePdfPreviews(file);

      default:
        return this.preparePreviews(file, IFileType.OTHER);
    }
  };

  private preparePreviews = (file: ProfileDocument, contentType: IFileType): IFilePreviewDetails => ({
    name: typeof file.name !== 'undefined' ? file.name : this.noFileNameTr,
    token: file.token,
    previews: file.previews,
    contentType,
    fileUrl: this.resolveFileUrl(file.token),
  });

  private preparePdfPreviews = (file: ProfileDocument): IFilePreviewDetails => ({
    name: typeof file.name !== 'undefined' ? file.name : this.noFileNameTr,
    token: file.token,
    previews: this.resolvePdfFileUrl(file.previews),
    contentType: IFileType.PDF,
    fileUrl: this.resolveFileUrl(file.token),
  });

  private prepareImagePreviews = (file: ProfileDocument): IFilePreviewDetails => ({
    name: typeof file.name !== 'undefined' ? file.name : this.noFileNameTr,
    token: file.token,
    previews: [this.resolveFileUrl(file.token)],
    contentType: IFileType.IMAGE_JPG,
    fileUrl: this.resolveFileUrl(file.token),
  });

  private resolveFileUrl = (avatarToken: string): string => `${window.location.origin}/files/${avatarToken}/download`;

  private resolvePdfFileUrl = (avatarTokens: ReadonlyArray<string>): ReadonlyArray<string> =>
    avatarTokens.map(preview => preview.replace('files//', 'files/'));

  private prepareHtmlPageToPrint = (imageUrl: ReadonlyArray<string>): string => {
    // tslint:disable-next-line:no-let
    let imgHTMLElementList: ReadonlyArray<string> = [];
    imgHTMLElementList = [...imgHTMLElementList, ...imageUrl.map(image => `<img src=${image}>`)];

    return ` <html><head><title>app.anymind.com</title>
      <style>body{width:100%;height:100%;margin:0}img{max-width:100%;max-height:100%}</style>
      </head><body onload=window.print(),window.close()>${imgHTMLElementList}</body></html>`;
  };
}
