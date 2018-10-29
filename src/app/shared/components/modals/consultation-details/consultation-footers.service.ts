import { Injectable, ComponentRef, Injector, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import {
  IConsultationFooterData,
  IFooterOutput,
  CONSULTATION_FOOTER_DATA,
  FooterComponentConstructor,
} from './consultation-footers/consultation-footer-helpers';

@Injectable()
export class ConsultationFootersService {
  constructor(private injector: Injector, private componentFactoryResolver: ComponentFactoryResolver) {}

  public attachFooter(
    component: FooterComponentConstructor,
    viewContainerRef: ViewContainerRef,
    footerData: IConsultationFooterData,
  ): ComponentRef<IFooterOutput> {
    const footerComponent = viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(component),
      undefined,
      Injector.create({
        providers: [
          {
            provide: CONSULTATION_FOOTER_DATA,
            useValue: footerData,
          },
        ],
        parent: this.injector,
      }),
    );

    return footerComponent;
  }
}
