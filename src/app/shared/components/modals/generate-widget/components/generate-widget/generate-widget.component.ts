import { Component, Inject, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Logger } from '@platform/core/logger';
import { LoggerFactory } from '@anymind-ng/core';
import { GENERATE_WIDGET_DATA, IGenerateWidgetData } from '../../tokens';
import { ModalComponent } from '@platform/shared/components/modals/modal/modal.component';
import { GenerateWidgetService } from '../../services/generate-widget.service';
import { of, BehaviorSubject, Subject } from 'rxjs';
import { AccountPresenceStatus } from '@anymind-ng/api';
import { finalize, filter, first, takeUntil, switchMap, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { WidgetButtonType } from '../generate-widget-button-type/generate-widget-button-type.component';
import { trigger, transition, style, animate, state, AnimationEvent } from '@angular/animations';

const undefinedSelectedButonType = -1;
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
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('250ms', style({ opacity: '1' }))]),
    ]),
  ],
})
export class GenerateWidgetComponent extends Logger implements AfterViewInit, OnDestroy {
  public serviceId: string;
  public expertId: string;
  public widgetLink: string;
  public widgetId: string;
  public avatarToken: string;
  public expertName: string;
  public consultationHeader: string;
  public cosulationDescription: string;
  public consultationPrice: string;
  public buttonCode = '';

  public buttonType: FormControl;
  public selectedButonType: WidgetButtonType = undefinedSelectedButonType;

  public readonly available = of(AccountPresenceStatus.StatusEnum.Available);
  public readonly headScript = this.generateWidgetService.getWidgetSdkLink();
  public readonly socialMediaLinks: ReadonlyArray<IShareLink> = [
    { url: '', iconName: 'linkedin' },
    { url: '', iconName: 'instagram' },
    { url: '', iconName: 'facebook' },
  ];

  @ViewChild(ModalComponent)
  private modal: ModalComponent;

  private componentLoaded = new BehaviorSubject<boolean>(false);
  private destroyed$ = new Subject<void>();
  private fadeOutComplete$ = new Subject<void>();

  constructor(
    loggerFactgory: LoggerFactory,
    @Inject(GENERATE_WIDGET_DATA) data: IGenerateWidgetData,
    private generateWidgetService: GenerateWidgetService,
  ) {
    super(loggerFactgory);
    this.serviceId = data.serviceId;
    this.expertId = data.expertId;
    this.widgetId = data.widgetId;

    this.widgetLink = this.generateWidgetService.getWidgetLink(this.widgetId);
    this.generateWidgetService
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
    this.buttonType.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        switchMap(buttonType => {
          if (this.selectedButonType === undefinedSelectedButonType) {
            return of(buttonType);
          }
          this.selectedButonType = undefinedSelectedButonType;

          return this.fadeOutComplete$.pipe(map(() => buttonType));
        }),
      )
      .subscribe(buttonType => {
        this.selectedButonType = buttonType;
        this.buttonCode = this.generateWidgetService.getButtonCode(this.widgetId, buttonType);
      });
  }
  public ngAfterViewInit(): void {
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
}
