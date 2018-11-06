import { ModalStack } from '@platform/core/services/modal/modal.service';
import { TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { NgbModalModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
/**
 * this is more like integration test not unit test
 * checks if class overrides value correctly
 */
describe('ModalStack', () => {
  let modalStack: ModalStack;
  let modal: NgbModal;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgbModalModule.forRoot()],
      providers: [
        ModalStack,
        {
          provide: NgbModalStack,
          useExisting: ModalStack,
        },
      ],
    });

    modalStack = TestBed.get(ModalStack);
    modal = TestBed.get(NgbModal);
  });

  /**
   * _modalStack is a private property of NgbModal, thats why any
   */
  it('should override interval value on NgbModal', () => {
    expect((modal as any)._modalStack).toBe(modalStack);
  });

  it('should close all modals when executed', () => {
    const helloModal = modal.open('hello');
    const spy = spyOn(helloModal, 'dismiss');
    modalStack.dismissAll();
    expect(spy).toHaveBeenCalled();
  });

  it('should not call dismiss once modal is closed before', fakeAsync(() => {
    const helloModal = modal.open('hello');
    const spy = spyOn(helloModal, 'dismiss');
    helloModal.close();
    flushMicrotasks();
    modalStack.dismissAll();
    expect(spy).not.toHaveBeenCalled();
  }));
});
