import { TestBed } from '@angular/core/testing';
import { AlertService } from './alert.service';
import { TranslateService } from '@ngx-translate/core';
import { Deceiver } from 'deceiver-core';
import { AlertType } from './alert';

describe('AlertService', () => {
  let alertService: AlertService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlertService,
        {
          provide: TranslateService,
          useValue: Deceiver(TranslateService, {
            instant: jest.fn(),
          }),
        },
      ],
    });
  });

  beforeEach(() => {
    alertService = TestBed.get(AlertService);
  });

  it('should put success alert in the stream', done => {
    alertService.alert$.subscribe(alert => {
      expect(alert.type).toEqual(AlertType.SUCCESS);
      done();
    });
    alertService.pushSuccessAlert('troll');
  });

  it('should put warn alert in the stream', done => {
    alertService.alert$.subscribe(alert => {
      expect(alert.type).toEqual(AlertType.WARNING);
      done();
    });
    alertService.pushWarningAlert('troll');
  });

  it('should put danger alert in the stream', done => {
    alertService.alert$.subscribe(alert => {
      expect(alert.type).toEqual(AlertType.DANGER);
      done();
    });
    alertService.pushDangerAlert('troll');
  });

  it('should notify others to close all alerts', () => {
    const fakeCallback = jest.fn();
    alertService.closeAll$.subscribe(fakeCallback);
    alertService.closeAllAlerts();
    expect(fakeCallback).toHaveBeenCalledTimes(1);
  });
});
