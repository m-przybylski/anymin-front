// tslint:disable:no-empty
// tslint:disable:no-any
import { ExpandablePanelComponent } from './expandable-panel.component';
import { fakeAsync, tick } from '@angular/core/testing';

describe('ExpandablePanelComponent', () => {
  // tslint:disable-next-line:no-let
  let component: ExpandablePanelComponent;
  const document = jasmine.createSpyObj('document', ['createElement']);
  beforeEach(() => {
    component = new ExpandablePanelComponent(document);
  });

  it(
    'should change state when toggled',
    fakeAsync(() => {
      (document.createElement as jasmine.Spy).and.returnValue({ style: {} });
      (component as any).content = { nativeElement: { appendChild: (): void => {} } };
      // expect(component).toBeTruthy();
      component.ngAfterViewInit();
      tick();
      const originState = component.state;
      component.toggleState();
      expect(component.state).not.toEqual(originState);
    }),
  );
});
