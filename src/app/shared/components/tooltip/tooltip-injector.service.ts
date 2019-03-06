// tslint:disable:no-any
import {
  Injector,
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  ElementRef,
  InjectionToken,
} from '@angular/core';
import { ITooltipModalOffsets } from '@platform/shared/components/tooltip/tooltip.directive';
import { LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';

export enum TooltipComponentDestinationEnum {
  COMPONENT,
  MODAL,
  BODY,
}

export const DESCRIPTION: InjectionToken<string> = new InjectionToken('Tooltip content description');
export const DOM_DESTINATION: InjectionToken<TooltipComponentDestinationEnum> = new InjectionToken(
  'Tooltip DOM destination',
);
export const OFFSETS: InjectionToken<ITooltipModalOffsets> = new InjectionToken('Tooltip header offsets');

@Injectable()
export class TooltipInjectorService extends Logger {
  private componentRef: any;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private element: ElementRef,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('TooltipContentService'));
  }

  public createComponentRef(component: any, injector: Injector): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.componentRef = componentFactory.create(injector);

    this.appendComponentToDOMDestination(injector.get(DOM_DESTINATION));
    this.appRef.attachView(this.componentRef.hostView);
  }

  public removeComponent(): void {
    if (this.componentRef !== undefined) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
    }
  }

  private appendComponentToDOMDestination(type: TooltipComponentDestinationEnum): void {
    const domElem = this.componentRef.hostView.rootNodes[0];

    switch (type) {
      case TooltipComponentDestinationEnum.MODAL:
        this.element.nativeElement.closest('.modal-component__container').appendChild(domElem);
        break;

      case TooltipComponentDestinationEnum.COMPONENT:
        this.element.nativeElement.appendChild(domElem);
        this.element.nativeElement.style.position = 'relative';
        break;

      case TooltipComponentDestinationEnum.BODY:
      default:
        document.body.appendChild(domElem);
    }
  }
}
