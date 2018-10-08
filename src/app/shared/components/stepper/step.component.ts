import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'plat-step',
  template: `<ng-template><ng-content></ng-content></ng-template>`,
})
export class StepComponent {
  @ViewChild(TemplateRef)
  // tslint:disable-next-line:no-any
  public content: TemplateRef<any>;
}
