import { TestBed } from '@angular/core/testing';
import { CORE_CONFIG } from './shared/injection-tokens/injection-tokens';
import { Config } from './config';

describe('config', () => {
  let config: Config;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CORE_CONFIG,
          useFactory: (): Config => new Config(),
        },
      ],
    });
  });

  describe('password regexp', () => {
    let passwordRegExp: RegExp;
    beforeEach(() => {
      config = TestBed.get(CORE_CONFIG);
      passwordRegExp = new RegExp(config.validation.password.regex);
    });
    it('should be 123123qQ correct password', () => {
      const result = passwordRegExp.test('123123qQ');
      expect(result).toBeTruthy();
    });
    it('should be wsad NOT correct password', () => {
      const result = passwordRegExp.test('wsad');
      expect(result).toBeFalsy();
    });
    it('should be !@#QWEqweQEW correct password', () => {
      const result = passwordRegExp.test('!@#QWEqweQEW');
      expect(result).toBeTruthy();
    });
    it('should be !2Qwwwwwww correct password', () => {
      const result = passwordRegExp.test('!2Qwwwwwww');
      expect(result).toBeTruthy();
    });
    it('should be return twice the same result', () => {
      const result = passwordRegExp.test('Stokrotka3134');
      const result2 = passwordRegExp.test('Stokrotka3134');
      expect(result).toEqual(result2);
    });
    it('should be !2Qwwww NOT correct password', () => {
      const result = passwordRegExp.test('!2Qwwww');
      expect(result).toBeFalsy();
    });
    it('should be !2QsflssdfkhasdfoihYUGJHGAJHSDdfsdfhjsadg@@@DDsadasjhJHGJJsdfHdga NOT correct password', () => {
      const result = passwordRegExp.test('!2QsflssdfkhasdfoihYUGJHGAJHSDdfsdfhjsadg@@@DDsadasjhJHGJJsdfHdga');
      expect(result).toBeFalsy();
    });
    describe('email regexp', () => {
      expect.extend({
        toBeValidEmail(received, regexp): { pass: boolean; message(): string } {
          const pass = regexp.test(received);
          if (pass) {
            return {
              message: (): string => `Valid email`,
              pass: true,
            };
          } else {
            return {
              message: (): string => `Email ${received} didn't pass regexp while it should`,
              pass: false,
            };
          }
        },
        toBeInvalidEmail(received, regexp): { pass: boolean; message(): string } {
          const pass = !regexp.test(received);
          if (pass) {
            return {
              message: (): string => `Valid email`,
              pass: true,
            };
          } else {
            return {
              message: (): string => `Email ${received} passed regexp while it shouldn't`,
              pass: false,
            };
          }
        },
      });
      let emailRegExp: RegExp;
      const validEmails: ReadonlyArray<string> = [
        'email@domain.com',
        'firstname.lastname@domain.com',
        'email@subdomain.domain.com',
        'firstname+lastname@domain.com',
        'email@[123.123.123.123]',
        '"email"@domain.com',
        '1234567890@domain.com',
        'email@domain-one.com',
        '_______@domain.com',
        'email@domain.name',
        'email@domain.co.jp',
        'firstname-lastname@domain.com',
      ];

      const invalidEmails: ReadonlyArray<string> = [
        'plainAddress',
        '#@%^%#$@#$@#.com',
        '@anymind.com',
        'email.anymind.com',
        'email@anymind@anymind.com',
        '.email@anymind.com',
        'email.@anymind.com',
        'email..email@anymind.com',
        'email@anymind',
        'email@anymind..com',
        'email@-nymind.com',
        'email@123.123.123.123',
      ];

      beforeEach(() => {
        config = TestBed.get(CORE_CONFIG);
        emailRegExp = new RegExp(config.validation.email.regex);
      });

      it('should pass all correct email validation', () => {
        validEmails.forEach(email => {
          expect(email).toBeValidEmail(emailRegExp);
        });
      });

      it('should pass all incorrect email validation', () => {
        invalidEmails.forEach(email => {
          expect(email).toBeInvalidEmail(emailRegExp);
        });
      });
    });
  });
});
