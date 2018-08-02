import { EmptyNumberPipe } from './empty-number.pipe';

describe('EmptyNumberPipe', () => {
  // tslint:disable-next-line:no-let
  let emptyNumberPipe: EmptyNumberPipe;
  beforeEach(() => {
    emptyNumberPipe = new EmptyNumberPipe();
  });

  it('should transform 0 to hyphen "-"', () => {
    const result = emptyNumberPipe.transform(0);
    expect(result).toEqual('-', `BAD: 0 was trasformed into: ${result}`);
  });

  it('should transform 0 to provided parameter ("x")', () => {
    const result = emptyNumberPipe.transform(0, 'x');
    expect(result).toEqual('x', `BAD: 0 was trasformed into: ${result}`);
  });

  it('should transform undefined to hyphen "-"', () => {
    const result = emptyNumberPipe.transform(undefined);
    expect(result).toEqual('-', `BAD: 0 was trasformed into: ${result}`);
  });

  it('should not transform 15 and return "15"', () => {
    const inputNumber = 15;
    const result = emptyNumberPipe.transform(inputNumber, 'x');
    expect(result).toEqual('15', `BAD: 15 was trasformed into: ${result}`);
  });
});
