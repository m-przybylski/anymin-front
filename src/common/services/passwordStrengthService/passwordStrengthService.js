(function() {

  function passwordStrengthService() {


    let _passwordStrength = (password) => {
      var back, counts, forth, i, letters, matches, numbers, p2, strength, symbols, tmp;
      matches = {
        pos: {},
        neg: {}
      };
      counts = {
        pos: {},
        neg: {
          seqLetter: 0,
          seqNumber: 0,
          seqSymbol: 0
        }
      };
      tmp = void 0;
      strength = 0;
      letters = "abcdefghijklmnopqrstuvwxyz";
      numbers = "1234567890";
      symbols = "\\!@#$%&/()=?¿";
      back = void 0;
      forth = void 0;
      i = void 0;
      if (password) {
        matches.pos.lower = password.match(/[a-z]/g);
        matches.pos.upper = password.match(/[A-Z]/g);
        matches.pos.numbers = password.match(/\d/g);
        matches.pos.symbols = password.match(/[$-\/:-?{-~!^_`\[\]]/g);
        matches.pos.middleNumber = password.slice(1, -1).match(/\d/g);
        matches.pos.middleSymbol = password.slice(1, -1).match(/[$-\/:-?{-~!^_`\[\]]/g);
        counts.pos.lower = (matches.pos.lower ? matches.pos.lower.length : 0);
        counts.pos.upper = (matches.pos.upper ? matches.pos.upper.length : 0);
        counts.pos.numbers = (matches.pos.numbers ? matches.pos.numbers.length : 0);
        counts.pos.symbols = (matches.pos.symbols ? matches.pos.symbols.length : 0);
        tmp = _.reduce(counts.pos, function (memo, val) {
          return memo + Math.min(1, val);
        }, 0);
        counts.pos.numChars = password.length;
        tmp += (counts.pos.numChars >= 8 ? 1 : 0);
        counts.pos.requirements = (tmp >= 3 ? tmp : 0);
        counts.pos.middleNumber = (matches.pos.middleNumber ? matches.pos.middleNumber.length : 0);
        counts.pos.middleSymbol = (matches.pos.middleSymbol ? matches.pos.middleSymbol.length : 0);
        matches.neg.consecLower = password.match(/(?=([a-z]{2}))/g);
        matches.neg.consecUpper = password.match(/(?=([A-Z]{2}))/g);
        matches.neg.consecNumbers = password.match(/(?=(\d{2}))/g);
        matches.neg.onlyNumbers = password.match(/^[0-9]*$/g);
        matches.neg.onlyLetters = password.match(/^([a-z]|[A-Z])*$/g);
        counts.neg.consecLower = (matches.neg.consecLower ? matches.neg.consecLower.length : 0);
        counts.neg.consecUpper = (matches.neg.consecUpper ? matches.neg.consecUpper.length : 0);
        counts.neg.consecNumbers = (matches.neg.consecNumbers ? matches.neg.consecNumbers.length : 0);
        i = 0;
        while (i < letters.length - 2) {
          p2 = password.toLowerCase();
          forth = letters.substring(i, parseInt(i + 3));
          back = _.str.reverse(forth);
          if (p2.indexOf(forth) !== -1 || p2.indexOf(back) !== -1) {
            counts.neg.seqLetter++;
          }
          i++;
        }
        i = 0;
        while (i < numbers.length - 2) {
          forth = numbers.substring(i, parseInt(i + 3));
          back = _.str.reverse(forth);
          if (password.indexOf(forth) !== -1 || password.toLowerCase().indexOf(back) !== -1) {
            counts.neg.seqNumber++;
          }
          i++;
        }
        i = 0;
        while (i < symbols.length - 2) {
          forth = symbols.substring(i, parseInt(i + 3));
          back = _.str.reverse(forth);
          if (password.indexOf(forth) !== -1 || password.toLowerCase().indexOf(back) !== -1) {
            counts.neg.seqSymbol++;
          }
          i++;
        }
        counts.neg.repeated = _.chain(password.toLowerCase().split("")).countBy(function (val) {
          return val;
        }).reject(function (val) {
          return val === 1;
        }).reduce(function (memo, val) {
          return memo + val;
        }, 0).value();
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
    };

    return _passwordStrength
  }

  angular.module('profitelo.directives.password-strength-service', [])
    .service('passwordStrengthService', passwordStrengthService)
}())