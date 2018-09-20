// tslint:disable:max-line-length
import { TimeDurationPipe } from '@platform/shared/components/modals/consultation-details/consultation-comment/consultation-comment-item/time-duration.pipe';

describe('EmptyNumberPipe', () => {
  let timeDurationPipe: TimeDurationPipe;

  beforeEach(() => {
    timeDurationPipe = new TimeDurationPipe();
  });

  it('should set time transform 0 sec ', () => {
    const result = timeDurationPipe.transform(0);
    expect(result).toEqual('0 sec');
  });

  it('should set time transform 73 sec ', () => {
    const timeInSeconds = 73;
    const result = timeDurationPipe.transform(timeInSeconds);
    expect(result).toEqual('1 min 13 sec');
  });

  it('should set time transform 3663 sec ', () => {
    const timeInSeconds = 3663;
    const result = timeDurationPipe.transform(timeInSeconds);
    expect(result).toEqual('1 h 1 min 3 sec');
  });
});
