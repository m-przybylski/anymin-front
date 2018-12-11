import { ServiceService } from '@anymind-ng/api';
import { Deceiver } from 'deceiver-core';
import { TestBed } from '@angular/core/testing';
import { CreateEditConsultationService } from './create-edit-consultation.service';
import { ConfirmationService } from '@platform/shared/components/modals/confirmation/confirmation.service';
import { provideMockFactoryLogger } from '../../../../../testing/testing';
import { AlertService } from '@anymind-ng/core';

describe('CreateEditConsultationService', () => {
  let service: CreateEditConsultationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreateEditConsultationService,
        {
          provide: ServiceService,
          useValue: Deceiver(ServiceService),
        },
        {
          provide: ConfirmationService,
          useValue: Deceiver(ConfirmationService),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService),
        },
        provideMockFactoryLogger(),
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(CreateEditConsultationService);
  });

  it('should create service', () => {
    const serviceService = TestBed.get(ServiceService);
    const newService = {
      invitations: [],
      isOwnerEmployee: true,
      isFreelance: false,
      name: 'superService',
      description: 'someDesc',
      price: {
        amount: 123,
        currency: 'PLN',
      },
      tags: [{ name: 'tag' }],
      language: 'pl',
    };
    spyOn(serviceService, 'postServiceRoute');
    service.createService(newService);
    expect(serviceService.postServiceRoute).toHaveBeenCalledWith(newService);
  });

  it('should update service', () => {
    const serviceService = TestBed.get(ServiceService);
    const serviceId = 'serviceId';
    const updatedService = {
      invitations: [],
      isOwnerEmployee: true,
      name: 'superService',
      description: 'someDesc',
      price: {
        amount: 123,
        currency: 'PLN',
      },
      tags: [{ name: 'tag' }],
      language: 'pl',
    };
    spyOn(serviceService, 'putServiceRoute');
    service.updateServiceDetails(serviceId, updatedService);
    expect(serviceService.putServiceRoute).toHaveBeenCalledWith(serviceId, updatedService);
  });
});
