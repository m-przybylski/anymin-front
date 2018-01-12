import { NavigatorWrapper } from '../../angularjs/common/classes/navigator-wrapper';

describe('Unit tests: NavigatorWrapper', () => {

  it('should return all constraints', () => {
    expect(NavigatorWrapper.getAllConstraints()).toEqual(jasmine.objectContaining({
      audio: {
        echoCancelation: true
      }
    }));
  })
})
