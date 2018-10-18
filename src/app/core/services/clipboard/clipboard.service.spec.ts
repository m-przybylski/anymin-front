import { ClipboardService } from './clipboard.service';
import { TestBed } from '@angular/core/testing';
import { provideMockFactoryLogger } from 'testing/testing';

describe('ClipboardService', () => {
  let clipboardService: ClipboardService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ClipboardService, provideMockFactoryLogger()] });
    clipboardService = TestBed.get(ClipboardService);
  });

  it('should be created', () => {
    expect(clipboardService).toBeTruthy();
  });
});
