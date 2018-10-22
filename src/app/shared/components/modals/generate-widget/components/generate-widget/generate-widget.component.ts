import { Component, Inject, AfterViewInit, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Logger } from '@platform/core/logger';
import { LoggerFactory } from '@anymind-ng/core';
import { GENERATE_WIDGET_DATA, IGenerateWidgetData } from '../../tokens';
import { ModalComponent } from '@platform/shared/components/modals/modal/modal.component';
import { GenerateWidgetDataService } from '../../services/generate-widget.data.service';
import { of, BehaviorSubject, Subject } from 'rxjs';
import { AccountPresenceStatus } from '@anymind-ng/api';
import { finalize, filter, first, takeUntil, switchMap, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { WidgetButtonType } from '../generate-widget-button-type/generate-widget-button-type.component';
import { trigger, transition, style, animate, state, AnimationEvent } from '@angular/animations';

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
  public serviceId: string;
  public expertId: string;
  public widgetLink: string;
  public widgetId: string;
  public headScript: string;
  public avatarToken: string;
  public expertName: string;
  public consultationHeader: string;
  public cosulationDescription: string;
  public consultationPrice: string;
  public buttonCode = '';

  public readonly available = of(AccountPresenceStatus.StatusEnum.Available);
  public readonly undefinedSelectedButonType = -1;
  public readonly socialMediaLinks: ReadonlyArray<IShareLink> = [
    { url: '', iconName: 'linkedin' },
    { url: '', iconName: 'instagram' },
    { url: '', iconName: 'facebook' },
  ];

  public buttonType: FormControl;
  public selectedButonType: WidgetButtonType = this.undefinedSelectedButonType;

  @ViewChild(ModalComponent)
  private modal: ModalComponent;

  /**
   * used to show if component loaded data from the server
   */
  private componentLoaded = new BehaviorSubject<boolean>(false);
  /**
   * used to trigger when component is destroyed
   */
  private destroyed$ = new Subject<void>();
  /**
   * used for animations. * => void is completed emits value
   */
  private fadeOutComplete$ = new Subject<void>();

  constructor(
    loggerFactgory: LoggerFactory,
    @Inject(GENERATE_WIDGET_DATA) data: IGenerateWidgetData,
    private generateWidgetDataService: GenerateWidgetDataService,
  ) {
    super(loggerFactgory);
    this.serviceId = data.serviceId;
    this.expertId = data.expertId;
    this.widgetId = data.widgetId;
  }
  public ngOnInit(): void {
    this.widgetLink = this.generateWidgetDataService.getWidgetLink(this.widgetId);
    this.headScript = this.generateWidgetDataService.getWidgetSdkLink(this.widgetId);
    this.generateWidgetDataService
      .resolve(this.widgetId)
      .pipe(
        finalize(() => {
          this.componentLoaded.next(true);
        }),
      )
      .subscribe(generateWidgetResolveData => {
        if (generateWidgetResolveData) {
          this.avatarToken = generateWidgetResolveData.expertAvatar || '';
          this.expertName = generateWidgetResolveData.expertName || '';
          this.consultationHeader = generateWidgetResolveData.serviceName;
          this.cosulationDescription = generateWidgetResolveData.serviceDesc;
          this.consultationPrice = generateWidgetResolveData.servicePrice;
        }
      });
    this.buttonType = new FormControl('');
    /**
     * once value is changes in the form
     * wait for animation to finish
     * and than start new animation.
     * avoid jumping beetween states and softer
     * content change
     */
    this.buttonType.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        switchMap(buttonType => {
          if (this.selectedButonType === this.undefinedSelectedButonType) {
            return of(buttonType);
          }
          this.selectedButonType = this.undefinedSelectedButonType;

          return this.fadeOutComplete$.pipe(map(() => buttonType));
        }),
      )
      .subscribe(buttonType => {
        this.selectedButonType = buttonType;
        this.headScript = this.generateWidgetDataService.getWidgetSdkLink(
          buttonType === WidgetButtonType.FLOATING ? this.widgetId : undefined,
        );
        this.buttonCode = this.generateWidgetDataService.getButtonCode(this.widgetId, buttonType);
      });
  }
  public ngAfterViewInit(): void {
    /**
     * race condition between component load and
     * data load
     */
    this.componentLoaded
      .pipe(
        filter(loaded => loaded),
        first(),
      )
      .subscribe(() => {
        this.modal.stopLoadingAnimation();
      });
  }
  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  public animationDone(animationEvent: AnimationEvent): void {
    if (animationEvent.toState === 'void') {
      this.fadeOutComplete$.next();
    }
  }
  public get displayButtonCode(): boolean {
    return this.selectedButonType === WidgetButtonType.BANNER || this.selectedButonType === WidgetButtonType.STATIC;
  }
}
