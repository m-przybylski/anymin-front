import { LoginHelperService } from './login-helper.service';

describe('LoginHelperService', () => {
  let service: LoginHelperService;
  beforeEach(() => {
    service = new LoginHelperService();
  });
  describe('addPlusToPhoneNumber', () => {
    it('should add plus to 890898', () => {
      expect(service.addPlusToPhoneNumber('890898')).toEqual('+890898');
    });
    it('should not modify +890898', () => {
      expect(service.addPlusToPhoneNumber('+890898')).toEqual('+890898');
    });
  });
  describe('trimPhoneNumber', () => {
    it('should remove plus from +890898', () => {
      expect(service.trimPhoneNumber('+890898')).toEqual('890898');
    });

    it('should not modify 890898', () => {
      expect(service.trimPhoneNumber('890898')).toEqual('890898');
    });
  });
});
