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
    it('should be !2Qwwww NOT correct password', () => {
      const result = passwordRegExp.test('!2Qwwww');
      expect(result).toBeFalsy();
    });
    it('should be !2QsflssdfkhasdfoihYUGJHGAJHSDdfsdfhjsadg@@@DDsadasjhJHGJJsdfHdga NOT correct password', () => {
      const result = passwordRegExp.test('!2QsflssdfkhasdfoihYUGJHGAJHSDdfsdfhjsadg@@@DDsadasjhJHGJJsdfHdga');
      expect(result).toBeFalsy();
    });
  });
});
