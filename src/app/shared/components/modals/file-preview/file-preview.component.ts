import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { FilePreviewService } from '@platform/shared/components/modals/file-preview/file-preview.service';
import { ProfileDocument } from '@anymind-ng/api';
import { FileResizerDirective } from '@platform/shared/components/modals/file-preview/file-size-checker.directive';
import { SmoothScrollDirective } from '@platform/shared/components/modals/file-preview/smooth-scroll.directive';

export enum IFileType {
  IMAGE_JPG = 'image/jpeg',
  IMAGE_PNG = 'image/png',
  PDF = 'application/pdf',
  OTHER = 'other',
}

export interface IFilePreviewDetails {
  name: string;
  token: string;
  previews: ReadonlyArray<string>;
  contentType: IFileType;
  fileUrl: string;
}

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
  public isPending = true;
  public isPendingOnInit = true;

  @Input()
  public profileId: string;

  @Input()
  public filesLength = 0;

  @Input()
  public isExpertProfile = false;

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

  private readonly basicZoomPreview = 100;

  constructor(private filePreviewService: FilePreviewService) {}

  public ngOnInit(): void {
    this.currentPercentZoom = this.basicZoomPreview;
    this.filePreviewService.getProfileDetails(this.profileId, this.isExpertProfile).subscribe(response => {
      this.fileList = response;
      this.prepareFirstFilePreview();
      this.isPendingOnInit = false;
    });
  }

  public onPrintClick = (): void => {
    this.filePreviewService.printPreview(this.currentFileDetails.previews);
  };

  public onFileChange = (currentIndex: number): void => {
    this.filePreviewTemplate.clear();
    this.isPending = true;
    this.currentPercentZoom = this.basicZoomPreview;
    this.updatePreviewDetails(currentIndex - 1);
    this.isPreviewBroken = false;
    this.currentPercentZoom = this.basicZoomPreview;
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

  private prepareFirstFilePreview = (): void => {
    this.updatePreviewDetails(0);
    this.isPending = false;
  };

  private updatePreviewDetails = (currentIndex: number): void => {
    this.changeCurrentFile(currentIndex);
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

      this.currentPreviewList = this.currentFileDetails.previews;
    }
  };

  private loadMorePdfViews = (list: ReadonlyArray<string>, arrayLimit: number): void => {
    this.currentPdfList = list.slice(0, arrayLimit);
  };

  private changeCurrentFile = (currentIndex: number): IFilePreviewDetails =>
    (this.currentFileDetails = this.filePreviewService.checkTypeOfFile(this.fileList[currentIndex]));

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
