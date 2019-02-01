// tslint:disable:no-any
import { Injector, Injectable, ComponentFactoryResolver, ApplicationRef, ElementRef } from '@angular/core';
import { TooltipComponentDestinationEnum } from '@platform/shared/components/tooltip/tooltip.component';

@Injectable()
export class TooltipInjectorService {
  private componentRef: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private element: ElementRef,
    private injector: Injector,
  ) {}

  public appendComponentToBody(
    component: any,
    descriptionInput: string,
    DOMdestination: TooltipComponentDestinationEnum,
  ): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.componentRef = componentFactory.create(this.injector);
    this.componentRef.instance.DOMDestination = DOMdestination;
    this.componentRef.instance.description = descriptionInput;

    this.setAppendDetection(DOMdestination);
    this.appRef.attachView(this.componentRef.hostView);
  }

  public removeComponentFromBody(): void {
    if (this.componentRef !== undefined) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
    }
  }

  private setAppendDetection = (type: TooltipComponentDestinationEnum): void => {
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
  };
}
