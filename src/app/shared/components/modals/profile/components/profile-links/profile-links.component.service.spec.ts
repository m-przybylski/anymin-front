// tslint:disable:no-empty
import { TestBed, inject } from '@angular/core/testing';

import { ProfileLinksComponentService } from './profile-links.component.service';
import { LoggerFactory } from '@anymind-ng/core';
import createSpyObj = jasmine.createSpyObj;

describe('ProfileLinksComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileLinksComponentService,
        {provide: LoggerFactory, useValue: createSpyObj('LoggerFactory', ['createLoggerService'])},
      ],

    });
    TestBed.get(LoggerFactory).createLoggerService.and.returnValue({
      warn: (): void => {
      },
      error: (): void => {
      }
    });
  });

  it('should be created', inject([ProfileLinksComponentService],
    (service: ProfileLinksComponentService) => {
      expect(service).toBeTruthy();
    }));

  it('expect return correct url with www protocol', inject([ProfileLinksComponentService],
    (service: ProfileLinksComponentService) => {
      const value = 'www.wp.pl';
      expect(service.unifyLinkProtocol(value)).toBe('http://www.wp.pl');
    }));

  it('expect return correct url with http://www protocol', inject([ProfileLinksComponentService],
    (service: ProfileLinksComponentService) => {
      const value = 'http://www.wp.pl';
      expect(service.unifyLinkProtocol(value)).toBe('http://www.wp.pl');
    }));

  it('expect return correct url with http:// protocol', inject([ProfileLinksComponentService],
    (service: ProfileLinksComponentService) => {
      const value = 'http://wp.pl';
      expect(service.unifyLinkProtocol(value)).toBe('http://www.wp.pl');
    }));

  it('expect return correct url with https:// protocol', inject([ProfileLinksComponentService],
    (service: ProfileLinksComponentService) => {
      const value = 'https://wp.pl';
      expect(service.unifyLinkProtocol(value)).toBe('https://www.wp.pl');
    }));

  it('expect return correct url with https://www protocol', inject([ProfileLinksComponentService],
    (service: ProfileLinksComponentService) => {
      const value = 'https://www.wp.pl';
      expect(service.unifyLinkProtocol(value)).toBe('https://www.wp.pl');
    }));

  it('expect return correct social url', inject([ProfileLinksComponentService],
    (service: ProfileLinksComponentService) => {
      const value = 'https://twitter.com/j_lewandowski';
      service.unifyLinkProtocol(value);
      expect(service.unifyLinkProtocol(value)).toBe('https://www.twitter.com/j_lewandowski');
    }));

  it('expect return correct social url without ssl protocol', inject([ProfileLinksComponentService],
    (service: ProfileLinksComponentService) => {
      const value = 'http://twitter.com/j_lewandowski';
      service.unifyLinkProtocol(value);
      expect(service.unifyLinkProtocol(value)).toBe('https://www.twitter.com/j_lewandowski');
    }));

  it('expect return incorrect url', inject([ProfileLinksComponentService],
    (service: ProfileLinksComponentService) => {
      const value = 'razdwatrzy';
      service.unifyLinkProtocol(value);
      expect(service.unifyLinkProtocol(value)).toBeFalsy();
    }));
});
