import { TestBed, inject } from '@angular/core/testing';

import { PhoneNumberUnifyService } from './phone-number-unify.service';

describe('PhoneNumberUnifyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhoneNumberUnifyService]
    });
  });

  it('should be created', inject([PhoneNumberUnifyService], (service: PhoneNumberUnifyService) => {
    expect(service).toBeTruthy();
  }));

  it('should unify phone number', () => {
    const service = TestBed.get(PhoneNumberUnifyService);
    expect(service.unifyPhoneNumber('600 70080 0')).toBe('+48600700800');
  });
  it('should make pretty phone number', () => {
    const service = TestBed.get(PhoneNumberUnifyService);
    expect(service.getPrettyPhoneNumber('600 490411')).toBe('+48 600 490 411');
  });
});
