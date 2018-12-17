import { Component, Inject, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Logger } from '@platform/core/logger';
import { LoggerFactory } from '@anymind-ng/core';
import { GENERATE_WIDGET_DATA, IGenerateWidgetData } from '../../tokens';
import { GenerateWidgetDataService } from '../../services/generate-widget.data.service';
import { of, Subject } from 'rxjs';
import { takeUntil, switchMap, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { WidgetButtonType } from '../generate-widget-button-type/generate-widget-button-type.component';
import { trigger, transition, style, animate, state, AnimationEvent } from '@angular/animations';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { SafeResourceUrl } from '@angular/platform-browser';

interface IShareLink {
  url: string;
  iconName: string;
}
@Component({
  selector: 'plat-generate-widget',
  templateUrl: 'generate-widget.component.html',
  styleUrls: ['generate-widget.component.sass'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('250ms', style({ opacity: '1' }))]),
      transition(':leave', [animate('250ms')]),
    ]),
  ],
})
export class GenerateWidgetComponent extends Logger implements OnInit, AfterViewInit, OnDestroy {
  public widgetLink: string;
  public widgetId: string;
  public headScript: string;
  public buttonCode = '';
  public iframeSrc: SafeResourceUrl;
  public isIframeLoading = true;

  public readonly undefinedSelectedButtonType = -1;
  public readonly socialMediaLinks: ReadonlyArray<IShareLink> = [
    { url: '', iconName: 'linkedin' },
    { url: '', iconName: 'instagram' },
    { url: '', iconName: 'facebook' },
  ];

  public buttonType: FormControl;
  public selectedButtonType: WidgetButtonType = this.undefinedSelectedButtonType;

  private readonly initialModalHeight = '100px';
  /**
   * used to trigger when component is destroyed
   */
  private destroyed$ = new Subject<void>();
  /**
   * used for animations. * => void is completed emits value
   */
  private fadeOutComplete$ = new Subject<void>();

  constructor(
    private generateWidgetDataService: GenerateWidgetDataService,
    private modalAnimationComponentService: ModalAnimationComponentService,
    @Inject(GENERATE_WIDGET_DATA) data: IGenerateWidgetData,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('GenerateWidgetComponent'));
    this.widgetId = data.widgetId;
  }
  public ngOnInit(): void {
    this.widgetLink = this.generateWidgetDataService.getWidgetLink(this.widgetId);
    this.headScript = this.generateWidgetDataService.getWidgetSdkLink(this.widgetId);
    this.iframeSrc = this.generateWidgetDataService.getRendertronLink(this.widgetLink);
    this.buttonType = new FormControl('');
    /**
     * once value is changes in the form
     * wait for animation to finish
     * and than start new animation.
     * avoid jumping between states and softer
     * content change
     */
    this.buttonType.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        switchMap(buttonType => {
          if (this.selectedButtonType === this.undefinedSelectedButtonType) {
            return of(buttonType);
          }
          this.selectedButtonType = this.undefinedSelectedButtonType;

          return this.fadeOutComplete$.pipe(map(() => buttonType));
        }),
      )
      .subscribe(buttonType => {
        this.selectedButtonType = buttonType;
        this.headScript = this.generateWidgetDataService.getWidgetSdkLink(
          buttonType === WidgetButtonType.FLOATING ? this.widgetId : undefined,
        );
        this.buttonCode = this.generateWidgetDataService.getButtonCode(this.widgetId, buttonType);
      });
  }
  public ngAfterViewInit(): void {
    /**
     * before stopping loader need to wait for data to be loaded
     */
    this.modalAnimationComponentService.stopLoadingAnimation(this.initialModalHeight);
  }
  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  public iframeLoaded(): void {
    this.isIframeLoading = false;
  }
  public animationDone(animationEvent: AnimationEvent): void {
    if (animationEvent.toState === 'void') {
      this.fadeOutComplete$.next();
    }
  }
  public get displayButtonCode(): boolean {
    return this.selectedButtonType === WidgetButtonType.BANNER || this.selectedButtonType === WidgetButtonType.STATIC;
  }
}
