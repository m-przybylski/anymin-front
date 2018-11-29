import { MoneyDividerPipe } from './money-divider.pipe';

describe('MoneyDividerPipe', () => {
  let moneyDividerPipe: MoneyDividerPipe;

  beforeEach(() => {
    moneyDividerPipe = new MoneyDividerPipe();
  });

  it('should return divided amount', () => {
    const entryValue = 123;
    const result = 1.23;
    expect(moneyDividerPipe.transform(entryValue)).toEqual(result);
  });
});
