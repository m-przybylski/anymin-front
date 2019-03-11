import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef, Inject } from '@angular/core';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import {
  FilePreviewService,
  IFilePreviewDetails,
  IFilePreviewPayload,
  IFileType,
} from '@platform/shared/components/modals/file-preview/file-preview.service';
import { ProfileDocument } from '@anymind-ng/api';
import { FileResizerDirective } from '@platform/shared/components/modals/file-preview/file-size-checker.directive';
import { SmoothScrollDirective } from '@platform/shared/components/modals/file-preview/smooth-scroll.directive';
import { FILE_PREVIEW_PAYLOAD } from './file-preview';

@Component({
  selector: 'plat-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.sass'],
})
export class FilePreviewComponent implements OnInit {
  public readonly noFilePreviewTr = 'DASHBOARD.PROFILE.FILES.PREVIEW.NO_PREVIEW';
  public readonly pdfPreviewsLength = 3;
  public modalType: ModalContainerTypeEnum = ModalContainerTypeEnum.FILE_PREVIEW;
  public currentPercentZoom = 100;
  public fileList: ReadonlyArray<ProfileDocument> = [];
  public isPreviewScalable = false;
  public isDifferenteType = false;
  public isFilePDF = false;
  public currentFileDetails: IFilePreviewDetails;
  public namePreview: string;
  public currentPreviewList: ReadonlyArray<string> = [];
  public urlPreview: string;
  public currentPdfList: ReadonlyArray<string> = [];
  public maxLengthPDFPreviews = this.pdfPreviewsLength;
  public isPreviewBroken = false;
  public isPending = false;

  @ViewChild(FileResizerDirective)
  public fileResizer: FileResizerDirective;

  @ViewChild(SmoothScrollDirective)
  public smoothScrollDirective: SmoothScrollDirective;

  @ViewChild('filePreviewTemplate', { read: ViewContainerRef })
  public filePreviewTemplate: ViewContainerRef;

  @ViewChild('filePreviewTemplate_IMG', { read: TemplateRef })
  public filePreviewTemplate_IMG: TemplateRef<HTMLElement>;

  @ViewChild('filePreviewTemplate_PDF', { read: TemplateRef })
  public filePreviewTemplate_PDF: TemplateRef<HTMLElement>;

  @ViewChild('imageSize')
  public imageSize: ElementRef;

  public get filesLength(): number {
    return this.fileList.length;
  }

  private readonly basicZoomPreview = 100;

  constructor(
    private filePreviewService: FilePreviewService,
    @Inject(FILE_PREVIEW_PAYLOAD) filePreviewPayload: IFilePreviewPayload,
  ) {
    this.fileList = filePreviewPayload.files.filter(file => file.token);
  }

  public ngOnInit(): void {
    this.currentPercentZoom = this.basicZoomPreview;
    this.updatePreviewDetails(0);
  }

  public onPrintClick = (): void => {
    this.filePreviewService.printPreview(this.currentFileDetails.previews);
  };

  public onFileChange = (currentIndex: number): void => {
    this.filePreviewTemplate.clear();
    this.currentPercentZoom = this.basicZoomPreview;
    this.updatePreviewDetails(currentIndex - 1);
    this.isPreviewBroken = false;
    this.maxLengthPDFPreviews = this.pdfPreviewsLength;
  };

  public onZoomChange = (zoomPercent: number): void => {
    this.currentPercentZoom = zoomPercent;
    this.fileResizer.onPreviewZoom(zoomPercent);
  };

  public onImageError = (): void => {
    this.isPreviewBroken = true;
    this.isPending = false;
  };

  public onImageLoad = (): void => {
    this.isPreviewScalable = !this.isFilePDF;
    this.isPending = false;
  };

  public onLoadMorePreviews = (currentItem: number): void => {
    this.maxLengthPDFPreviews = currentItem;
    this.loadMorePdfViews(this.currentPreviewList, this.maxLengthPDFPreviews);
  };

  /**
   * function changes current displayed image.
   * once this one is completed view should start loading new image
   */
  private updatePreviewDetails = (currentIndex: number): void => {
    this.isPending = true;
    this.currentFileDetails = this.filePreviewService.checkTypeOfFile(this.fileList[currentIndex]);
    this.resetFileContentType();
    this.updateContentType(this.currentFileDetails.contentType);
    this.namePreview = this.currentFileDetails.name;
    this.urlPreview = this.currentFileDetails.fileUrl;

    if (this.isFilePDF) {
      this.filePreviewTemplate.createEmbeddedView(this.filePreviewTemplate_PDF);
      this.currentPreviewList = this.currentFileDetails.previews;
      this.loadMorePdfViews(this.currentFileDetails.previews, this.maxLengthPDFPreviews);
    } else {
      this.filePreviewTemplate.createEmbeddedView(this.filePreviewTemplate_IMG);

      this.currentPreviewList = [this.currentFileDetails.fileUrl];
    }
  };

  private loadMorePdfViews = (list: ReadonlyArray<string>, arrayLimit: number): void => {
    this.currentPdfList = list.slice(0, arrayLimit);
  };

  private updateContentType = (contentType: string): void => {
    switch (contentType) {
      case IFileType.OTHER:
        this.isDifferenteType = true;
        break;

      case IFileType.PDF:
        this.isFilePDF = true;
        break;

      case IFileType.IMAGE_JPG:
        this.resetFileContentType();
        break;

      case IFileType.IMAGE_PNG:
        this.resetFileContentType();
        break;

      default:
        this.isDifferenteType = true;
    }
  };

  private resetFileContentType = (): void => {
    this.isFilePDF = false;
    this.isDifferenteType = false;
  };
}
