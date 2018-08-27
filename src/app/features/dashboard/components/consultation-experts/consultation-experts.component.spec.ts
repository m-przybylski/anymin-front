import { TestBed, async, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { ConsultationExpertsComponent } from './consultation-experts.component';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { expertsLimitToken } from './consultation-experts';

@Pipe({ name: 'translate' })
class MockPipe implements PipeTransform {
  public transform = jasmine.createSpy('').and.stub();
}

describe('ConsultationExpertsComponent', () => {
  let component: ConsultationExpertsComponent;
  let fixture: ComponentFixture<ConsultationExpertsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultationExpertsComponent, MockPipe],
      providers: [{ provide: expertsLimitToken, useValue: 4 }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationExpertsComponent);
    component = fixture.componentInstance;
  });

  it('should be crated', () => {
    expect(component).toBeTruthy();
  });

  describe('component inputs', () => {
    it('should display empty list when nothing provided', fakeAsync(() => {
      component.expertAvatarTokenList = [];
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.expertAvatarTokenList.length).toBe(0);
        expect(component.expertsExists).toBeFalsy();
      });
    }));

    it('should trim array over the limit', fakeAsync(() => {
      const expertLimit: number = TestBed.get(expertsLimitToken);
      component.expertAvatarTokenList = ['asd', 'asd', 'asd', 'asd', 'asd'];
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.expertsExists).toBeTruthy();
        expect(component.expertAvatarTokenList.length).toBe(expertLimit);
        expect(component.overLimit).toBe(1);
      });
    }));

    it('should not trim array if under the limit', fakeAsync(() => {
      const expertLimit = 3;
      component.expertAvatarTokenList = ['asd', 'asd', 'asd'];
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.expertsExists).toBeTruthy();
        expect(component.expertAvatarTokenList.length).toBe(expertLimit);
        expect(component.overLimit).toBeLessThanOrEqual(0);
      });
    }));
  });
});
