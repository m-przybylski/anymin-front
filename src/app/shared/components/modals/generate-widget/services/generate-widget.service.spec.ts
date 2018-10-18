import { TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { provideMockFactoryLogger } from 'testing/testing';
import { GenerateWidgetService } from './generate-widget.service';
import { NgbModalModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardService } from '@platform/core/services/clipboard/clipboard.service';
import { AlertService } from '@anymind-ng/core';
import { Deceiver } from 'deceiver-core';

describe('GenerateWidgetService', () => {
  let service: GenerateWidgetService;
  let modalService: NgbModal;
  const clipboardService: ClipboardService = Deceiver(ClipboardService, { writeText: jasmine.createSpy('writeText') });
  const alertService: AlertService = Deceiver(AlertService, {
    pushSuccessAlert: jasmine.createSpy('pushSuccessAlert'),
    pushWarningAlert: jasmine.createSpy('pushWarningAlert'),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgbModalModule.forRoot()],
      providers: [
        GenerateWidgetService,
        provideMockFactoryLogger(),
        {
          provide: ClipboardService,
          useValue: clipboardService,
        },
        { provide: AlertService, useValue: alertService },
      ],
    });

    service = TestBed.get(GenerateWidgetService);
    modalService = TestBed.get(NgbModal);
  });

  beforeEach(() => {
    (alertService.pushSuccessAlert as jasmine.Spy).calls.reset();
    (alertService.pushWarningAlert as jasmine.Spy).calls.reset();
  });

  describe('openModal', () => {
    it('should call open modal', () => {
      const spy = spyOn(modalService, 'open').and.stub();
      service.openModal({ serviceId: 'asd', expertId: 'aaa', widgetId: 'qqq' });
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('saveToClipboard', () => {
    it('should copy value to clipboard and display confirmation', fakeAsync(() => {
      // operation success
      (clipboardService.writeText as jasmine.Spy).and.returnValue(Promise.resolve());
      service.saveToClipboard('MackoXXXX');
      flushMicrotasks();
      expect(alertService.pushSuccessAlert).toHaveBeenCalled();
    }));
    it('should fail value to clipboard and display warning', fakeAsync(() => {
      // operation success
      (clipboardService.writeText as jasmine.Spy).and.returnValue(Promise.reject('u stupid'));
      service.saveToClipboard('MackoXXXX');
      flushMicrotasks();
      expect(alertService.pushWarningAlert).toHaveBeenCalled();
    }));
  });
});
