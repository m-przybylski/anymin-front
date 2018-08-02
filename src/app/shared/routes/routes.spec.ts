import { RouterHelpers } from './routes';

describe('RouterPaths', () => {
  it('should replace path with given one params', () => {
    const oldPath = '/route1/route2/:param1';
    const params = { param1: 'weq-eff-5fj' };
    const newPath = RouterHelpers.replaceParams(oldPath, params);
    expect(newPath).toEqual('/route1/route2/weq-eff-5fj');
  });
  it('should replace path with given multiple params', () => {
    const oldPath = '/route1/:param2/route2/:param1';
    const params = { param1: 'weq-eff-5fj', param2: 'hhh-222-678' };
    const newPath = RouterHelpers.replaceParams(oldPath, params);
    expect(newPath).toEqual('/route1/hhh-222-678/route2/weq-eff-5fj');
  });
});
