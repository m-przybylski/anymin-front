// tslint:disable:no-empty

import { TestBed, inject } from '@angular/core/testing';
import { LoggerFactory } from '@anymind-ng/core';
import createSpyObj = jasmine.createSpyObj;
import { ProfileService, PutOrganizationDetails, ServiceService } from '@anymind-ng/api';
import { UserSessionService } from '../../../../../core/services/user-session/user-session.service';
import { CreateOrganizationModalComponentService } from './create-organization.component.service';

describe('CreateOrganizationModalComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreateOrganizationModalComponentService,
        { provide: LoggerFactory, useValue: createSpyObj('LoggerFactory', ['createLoggerService']) },
        {
          provide: ProfileService,
          useValue: createSpyObj('ProfileService', ['putOrganizationProfileRoute', 'getProfileRoute']),
        },
        { provide: UserSessionService, useValue: createSpyObj('UserSessionService', ['getSession']) },
        { provide: ServiceService, useValue: createSpyObj('ServiceService', ['getProfileServicesRoute']) },
      ],
    });

    TestBed.get(LoggerFactory).createLoggerService.and.returnValue({
      warn: (): void => {},
      error: (): void => {},
    });
  });

  it('should be created', inject(
    [CreateOrganizationModalComponentService],
    (service: CreateOrganizationModalComponentService) => {
      expect(service).toBeTruthy();
    },
  ));

  it('should get orgnization profile', () => {
    const service = TestBed.get(CreateOrganizationModalComponentService);
    const serviceService = TestBed.get(ServiceService);
    const accountId = '1234';

    service.getProfileService(accountId);
    expect(serviceService.getProfileServicesRoute).toHaveBeenCalledWith(accountId);
  });

  it('should create organization profile', () => {
    const service = TestBed.get(CreateOrganizationModalComponentService);
    const profileService = TestBed.get(ProfileService);
    const clientDetailsObject: PutOrganizationDetails = {
      name: 'name',
      logo: 'logo',
      description: 'description',
      files: [],
      links: [],
    };

    service.createOrganizationProfile(clientDetailsObject);
    expect(profileService.putOrganizationProfileRoute).toHaveBeenCalledWith(clientDetailsObject);
  });
});
