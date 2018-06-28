// tslint:disable:no-empty
// tslint:disable:no-any
// tslint:disable:newline-before-return
/* tslint:disable:  no-magic-numbers */

// tslint:disable:member-ordering
export class PasswordStrengthService {

  public static $inject = [];

  constructor() {
  }

  public getStrength = (password: string): number => {
    const strength = this._getStrength(password);

    if (!password) {
      return 0;
    }

    switch (Math.ceil(strength / 25)) {
      case 0:
      case 1:
        return 1;
      default:
        return Math.ceil(strength / 25);
    }
  }

  private stringReverse = function (str: string | undefined): string | undefined {
    let out;
    if (typeof str === 'string') {
      out = '';
      for (let i = str.length - 1; i >= 0; out += str[i--]) {
      }
    }
    return out;
  };

  // tslint:disable-next-line:cyclomatic-complexity
  private _getStrength = (p: string): number => {

    const matches: any = {
      pos: {
        lower: {length: 0},
        upper: {length: 0},
        numbers: {length: 0},
        symbols: {length: 0},
        middleNumber: {length: 0},
        middleSymbol: {length: 0},
      },
      neg: {
        consecLower: [],
        consecUpper: [],
        consecNumbers: [],
        onlyNumbers: [],
        onlyLetters: []
      }
    };

    const counts = {
      pos: {
        lower: 0,
        upper: 0,
        numbers: 0,
        symbols: 0,
        numChars: 0,
        requirements: 0,
        middleNumber: 0,
        middleSymbol: 0
      },
      neg: {
        seqLetter: 0,
        seqNumber: 0,
        seqSymbol: 0,
        consecUpper: 0,
        consecLower: 0,
        consecNumbers: 0,
        repeated: 0
      }
    };

    let tmp;
    let strength = 0;
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '01234567890';
    const symbols = '\\!@#$%&/()=?¿';
    let back;
    let forth;
    let i;

    if (p) {
      // Benefits
      matches.pos.lower = p.match(/[a-z]/g);
      matches.pos.upper = p.match(/[A-Z]/g);
      matches.pos.numbers = p.match(/\d/g);
      matches.pos.symbols = p.match(/[$-/:-?{-~!^_`\[\]]/g);
      matches.pos.middleNumber = p.slice(1, -1).match(/\d/g);
      matches.pos.middleSymbol = p.slice(1, -1).match(/[$-/:-?{-~!^_`\[\]]/g);

      counts.pos.lower = matches.pos.lower ? matches.pos.lower.length : 0;
      counts.pos.upper = matches.pos.upper ? matches.pos.upper.length : 0;
      counts.pos.numbers = matches.pos.numbers ? matches.pos.numbers.length : 0;
      counts.pos.symbols = matches.pos.symbols ? matches.pos.symbols.length : 0;

      tmp = Object.keys(counts.pos).reduce(function (previous, key): number {
        return previous + Math.min(1, (<any>counts.pos)[key]);
      }, 0);

      counts.pos.numChars = p.length;
      tmp += (counts.pos.numChars >= 8) ? 1 : 0;

      counts.pos.requirements = (tmp >= 3) ? tmp : 0;
      counts.pos.middleNumber = matches.pos.middleNumber ? matches.pos.middleNumber.length : 0;
      counts.pos.middleSymbol = matches.pos.middleSymbol ? matches.pos.middleSymbol.length : 0;

      // Deductions
      matches.neg.consecLower = p.match(/(?=([a-z]{2}))/g);
      matches.neg.consecUpper = p.match(/(?=([A-Z]{2}))/g);
      matches.neg.consecNumbers = p.match(/(?=(\d{2}))/g);
      matches.neg.onlyNumbers = p.match(/^[0-9]*$/g);
      matches.neg.onlyLetters = p.match(/^([a-z]|[A-Z])*$/g);

      counts.neg.consecLower = matches.neg.consecLower ? matches.neg.consecLower.length : 0;
      counts.neg.consecUpper = matches.neg.consecUpper ? matches.neg.consecUpper.length : 0;
      counts.neg.consecNumbers = matches.neg.consecNumbers ? matches.neg.consecNumbers.length : 0;

      // sequential letters (back and forth)
      for (i = 0; i < letters.length - 2; i++) {
        const p2 = p.toLowerCase();
        forth = letters.substring(i, i + 3);
        back = this.stringReverse(forth);
        if (p2.indexOf(forth) !== -1 || back &&  p2.indexOf(back) !== -1) {
          counts.neg.seqLetter++;
        }
      }

      // sequential numbers (back and forth)
      for (i = 0; i < numbers.length - 2; i++) {
        forth = numbers.substring(i, i + 3);
        back = this.stringReverse(forth);
        if (p.indexOf(forth) !== -1 || back && p.toLowerCase().indexOf(back) !== -1) {
          counts.neg.seqNumber++;
        }
      }

      // sequential symbols (back and forth)
      for (i = 0; i < symbols.length - 2; i++) {
        forth = symbols.substring(i, i + 3);
        back = this.stringReverse(forth);
        if (p.indexOf(forth) !== -1 || back && p.toLowerCase().indexOf(back) !== -1) {
          counts.neg.seqSymbol++;
        }
      }

      // Calculations
      strength += counts.pos.numChars * 4;
      if (counts.pos.upper) {
        strength += (counts.pos.numChars - counts.pos.upper) * 2;
      }
      if (counts.pos.lower) {
        strength += (counts.pos.numChars - counts.pos.lower) * 2;
      }
      if (counts.pos.upper || counts.pos.lower) {
        strength += counts.pos.numbers * 4;
      }
      strength += counts.pos.symbols * 6;
      strength += (counts.pos.middleSymbol + counts.pos.middleNumber) * 2;
      strength += counts.pos.requirements * 2;

      strength -= counts.neg.consecLower * 2;
      strength -= counts.neg.consecUpper * 2;
      strength -= counts.neg.consecNumbers * 2;
      strength -= counts.neg.seqNumber * 3;
      strength -= counts.neg.seqLetter * 3;
      strength -= counts.neg.seqSymbol * 3;

      if (matches.neg.onlyNumbers) {
        strength -= counts.pos.numChars;
      }
      if (matches.neg.onlyLetters) {
        strength -= counts.pos.numChars;
      }
      if (counts.neg.repeated) {
        strength -= (counts.neg.repeated / counts.pos.numChars) * 10;
      }
    }

    return Math.max(0, Math.min(100, Math.round(strength)));
  }

}

/**
 * @ngdoc directive
 * @name ngPasswordStrengthApp.factory:PasswordStrengthFormulaService
 * @description
 * Service to determine strength of password
 */
